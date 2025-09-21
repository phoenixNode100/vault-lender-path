// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultLender is SepoliaConfig {
    using FHE for *;
    
    struct LoanApplication {
        euint32 applicationId;
        euint32 requestedAmount;
        euint32 collateralValue;
        euint32 creditScore;
        euint32 loanTerm;
        bool isApproved;
        bool isActive;
        string purpose;
        string collateralType;
        address borrower;
        uint256 applicationTime;
        uint256 expiryTime;
    }
    
    struct Loan {
        euint32 loanId;
        euint32 principalAmount;
        euint32 interestRate;
        euint32 remainingBalance;
        euint32 monthlyPayment;
        bool isActive;
        bool isDefaulted;
        address borrower;
        address lender;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Vault {
        euint32 vaultId;
        euint32 totalValue;
        euint32 availableLiquidity;
        euint32 utilizationRate;
        bool isActive;
        string vaultName;
        address owner;
        uint256 createdAt;
    }
    
    struct Repayment {
        euint32 repaymentId;
        euint32 amount;
        euint32 principalAmount;
        euint32 interestAmount;
        address borrower;
        uint256 timestamp;
    }
    
    mapping(uint256 => LoanApplication) public applications;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => Vault) public vaults;
    mapping(uint256 => Repayment) public repayments;
    mapping(address => euint32) public borrowerCreditScore;
    mapping(address => euint32) public lenderReputation;
    mapping(address => euint32) public totalBorrowed;
    mapping(address => euint32) public totalLent;
    
    uint256 public applicationCounter;
    uint256 public loanCounter;
    uint256 public vaultCounter;
    uint256 public repaymentCounter;
    
    address public owner;
    address public verifier;
    euint32 public platformFeeRate;
    
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed borrower, string purpose);
    event LoanApproved(uint256 indexed applicationId, uint256 indexed loanId, address indexed borrower);
    event LoanCreated(uint256 indexed loanId, address indexed borrower, address indexed lender);
    event RepaymentMade(uint256 indexed repaymentId, uint256 indexed loanId, address indexed borrower);
    event VaultCreated(uint256 indexed vaultId, address indexed owner, string vaultName);
    event CreditScoreUpdated(address indexed borrower, uint32 newScore);
    event LenderReputationUpdated(address indexed lender, uint32 newReputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFeeRate = FHE.asEuint32(250); // 2.5% platform fee
    }
    
    function submitLoanApplication(
        string memory _purpose,
        string memory _collateralType,
        externalEuint32 _requestedAmount,
        externalEuint32 _collateralValue,
        externalEuint32 _creditScore,
        externalEuint32 _loanTerm,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_purpose).length > 0, "Purpose cannot be empty");
        require(bytes(_collateralType).length > 0, "Collateral type cannot be empty");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalRequestedAmount = FHE.fromExternal(_requestedAmount, inputProof);
        euint32 internalCollateralValue = FHE.fromExternal(_collateralValue, inputProof);
        euint32 internalCreditScore = FHE.fromExternal(_creditScore, inputProof);
        euint32 internalLoanTerm = FHE.fromExternal(_loanTerm, inputProof);
        
        applications[applicationId] = LoanApplication({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            requestedAmount: internalRequestedAmount,
            collateralValue: internalCollateralValue,
            creditScore: internalCreditScore,
            loanTerm: internalLoanTerm,
            isApproved: false,
            isActive: true,
            purpose: _purpose,
            collateralType: _collateralType,
            borrower: msg.sender,
            applicationTime: block.timestamp,
            expiryTime: block.timestamp + 30 days
        });
        
        emit ApplicationSubmitted(applicationId, msg.sender, _purpose);
        return applicationId;
    }
    
    function approveLoan(
        uint256 applicationId,
        uint256 vaultId,
        externalEuint32 _interestRate,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(applications[applicationId].borrower != address(0), "Application does not exist");
        require(applications[applicationId].isActive, "Application is not active");
        require(vaults[vaultId].owner == msg.sender, "Only vault owner can approve");
        require(vaults[vaultId].isActive, "Vault is not active");
        require(block.timestamp <= applications[applicationId].expiryTime, "Application has expired");
        
        // Convert external interest rate to internal FHE value
        euint32 interestRate = FHE.fromExternal(_interestRate, inputProof);
        
        uint256 loanId = loanCounter++;
        
        // Create loan
        loans[loanId] = Loan({
            loanId: FHE.asEuint32(0), // Will be set properly later
            principalAmount: applications[applicationId].requestedAmount,
            interestRate: interestRate,
            remainingBalance: applications[applicationId].requestedAmount,
            monthlyPayment: FHE.asEuint32(0), // Will be calculated off-chain
            isActive: true,
            isDefaulted: false,
            borrower: applications[applicationId].borrower,
            lender: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + (FHE.decrypt(applications[applicationId].loanTerm) * 30 days)
        });
        
        // Update vault liquidity
        vaults[vaultId].availableLiquidity = FHE.sub(vaults[vaultId].availableLiquidity, applications[applicationId].requestedAmount);
        
        // Update borrower's total borrowed amount
        totalBorrowed[applications[applicationId].borrower] = FHE.add(
            totalBorrowed[applications[applicationId].borrower], 
            applications[applicationId].requestedAmount
        );
        
        // Update lender's total lent amount
        totalLent[msg.sender] = FHE.add(totalLent[msg.sender], applications[applicationId].requestedAmount);
        
        // Mark application as approved
        applications[applicationId].isApproved = true;
        applications[applicationId].isActive = false;
        
        emit LoanApproved(applicationId, loanId, applications[applicationId].borrower);
        emit LoanCreated(loanId, applications[applicationId].borrower, msg.sender);
        
        return loanId;
    }
    
    function makeRepayment(
        uint256 loanId,
        externalEuint32 _amount,
        externalEuint32 _principalAmount,
        externalEuint32 _interestAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(loans[loanId].borrower == msg.sender, "Only borrower can make repayment");
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isDefaulted, "Loan is defaulted");
        
        uint256 repaymentId = repaymentCounter++;
        
        // Convert external values to internal FHE values
        euint32 amount = FHE.fromExternal(_amount, inputProof);
        euint32 principalAmount = FHE.fromExternal(_principalAmount, inputProof);
        euint32 interestAmount = FHE.fromExternal(_interestAmount, inputProof);
        
        repayments[repaymentId] = Repayment({
            repaymentId: FHE.asEuint32(0), // Will be set properly later
            amount: amount,
            principalAmount: principalAmount,
            interestAmount: interestAmount,
            borrower: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update loan remaining balance
        loans[loanId].remainingBalance = FHE.sub(loans[loanId].remainingBalance, principalAmount);
        
        // Check if loan is fully paid
        if (FHE.decrypt(loans[loanId].remainingBalance) == 0) {
            loans[loanId].isActive = false;
        }
        
        emit RepaymentMade(repaymentId, loanId, msg.sender);
        return repaymentId;
    }
    
    function createVault(
        string memory _vaultName,
        externalEuint32 _initialLiquidity,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_vaultName).length > 0, "Vault name cannot be empty");
        
        uint256 vaultId = vaultCounter++;
        
        // Convert external liquidity to internal FHE value
        euint32 initialLiquidity = FHE.fromExternal(_initialLiquidity, inputProof);
        
        vaults[vaultId] = Vault({
            vaultId: FHE.asEuint32(0), // Will be set properly later
            totalValue: initialLiquidity,
            availableLiquidity: initialLiquidity,
            utilizationRate: FHE.asEuint32(0),
            isActive: true,
            vaultName: _vaultName,
            owner: msg.sender,
            createdAt: block.timestamp
        });
        
        emit VaultCreated(vaultId, msg.sender, _vaultName);
        return vaultId;
    }
    
    function updateCreditScore(
        address borrower,
        externalEuint32 _newScore,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update credit score");
        require(borrower != address(0), "Invalid borrower address");
        
        euint32 newScore = FHE.fromExternal(_newScore, inputProof);
        borrowerCreditScore[borrower] = newScore;
        
        emit CreditScoreUpdated(borrower, 0); // FHE.decrypt(newScore) - will be decrypted off-chain
    }
    
    function updateLenderReputation(
        address lender,
        externalEuint32 _newReputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(lender != address(0), "Invalid lender address");
        
        euint32 newReputation = FHE.fromExternal(_newReputation, inputProof);
        lenderReputation[lender] = newReputation;
        
        emit LenderReputationUpdated(lender, 0); // FHE.decrypt(newReputation) - will be decrypted off-chain
    }
    
    function getApplicationInfo(uint256 applicationId) public view returns (
        string memory purpose,
        string memory collateralType,
        uint8 requestedAmount,
        uint8 collateralValue,
        uint8 creditScore,
        uint8 loanTerm,
        bool isApproved,
        bool isActive,
        address borrower,
        uint256 applicationTime,
        uint256 expiryTime
    ) {
        LoanApplication storage application = applications[applicationId];
        return (
            application.purpose,
            application.collateralType,
            0, // FHE.decrypt(application.requestedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(application.collateralValue) - will be decrypted off-chain
            0, // FHE.decrypt(application.creditScore) - will be decrypted off-chain
            0, // FHE.decrypt(application.loanTerm) - will be decrypted off-chain
            application.isApproved,
            application.isActive,
            application.borrower,
            application.applicationTime,
            application.expiryTime
        );
    }
    
    function getLoanInfo(uint256 loanId) public view returns (
        uint8 principalAmount,
        uint8 interestRate,
        uint8 remainingBalance,
        uint8 monthlyPayment,
        bool isActive,
        bool isDefaulted,
        address borrower,
        address lender,
        uint256 startTime,
        uint256 endTime
    ) {
        Loan storage loan = loans[loanId];
        return (
            0, // FHE.decrypt(loan.principalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(loan.interestRate) - will be decrypted off-chain
            0, // FHE.decrypt(loan.remainingBalance) - will be decrypted off-chain
            0, // FHE.decrypt(loan.monthlyPayment) - will be decrypted off-chain
            loan.isActive,
            loan.isDefaulted,
            loan.borrower,
            loan.lender,
            loan.startTime,
            loan.endTime
        );
    }
    
    function getVaultInfo(uint256 vaultId) public view returns (
        string memory vaultName,
        uint8 totalValue,
        uint8 availableLiquidity,
        uint8 utilizationRate,
        bool isActive,
        address owner,
        uint256 createdAt
    ) {
        Vault storage vault = vaults[vaultId];
        return (
            vault.vaultName,
            0, // FHE.decrypt(vault.totalValue) - will be decrypted off-chain
            0, // FHE.decrypt(vault.availableLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(vault.utilizationRate) - will be decrypted off-chain
            vault.isActive,
            vault.owner,
            vault.createdAt
        );
    }
    
    function getBorrowerCreditScore(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(borrowerCreditScore[borrower]) - will be decrypted off-chain
    }
    
    function getLenderReputation(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(lenderReputation[lender]) - will be decrypted off-chain
    }
    
    function getTotalBorrowed(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(totalBorrowed[borrower]) - will be decrypted off-chain
    }
    
    function getTotalLent(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(totalLent[lender]) - will be decrypted off-chain
    }
    
    function calculateMonthlyPayment(
        externalEuint32 _principal,
        externalEuint32 _interestRate,
        externalEuint32 _termMonths,
        bytes calldata inputProof
    ) public pure returns (euint32) {
        // This is a simplified calculation
        // In a real implementation, you would use proper compound interest formulas
        euint32 principal = FHE.fromExternal(_principal, inputProof);
        euint32 interestRate = FHE.fromExternal(_interestRate, inputProof);
        euint32 termMonths = FHE.fromExternal(_termMonths, inputProof);
        
        // Monthly payment = (principal * interestRate / 1200) + (principal / termMonths)
        euint32 monthlyInterest = FHE.div(FHE.mul(principal, interestRate), FHE.asEuint32(1200));
        euint32 monthlyPrincipal = FHE.div(principal, termMonths);
        
        return FHE.add(monthlyInterest, monthlyPrincipal);
    }
}
