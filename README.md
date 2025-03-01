# 🚀 Decentralized Voting System

A secure and transparent **blockchain-based voting system** built using Solidity and Hardhat. This project ensures fairness, transparency, and security in the voting process using decentralized technology.

---

## 🎯 Features
- ✅ **Decentralized and Tamper-Proof**: No single entity controls the votes.
- 🔒 **Anonymous and Secure**: Voter identities remain protected.
- 🤖 **Smart Contract-Based**: Automates the voting process with Solidity.
- ⚡ **Real-Time Vote Counting**: Instant and immutable vote records.
- 🌐 **Web3 Integration**: Users can vote seamlessly via MetaMask.

---

## 🛠️ Tech Stack
- **Blockchain**: Ethereum
- **Smart Contracts**: Solidity
- **Development Framework**: Hardhat
- **Frontend**: React.js with Web3.js/Ethers.js
- **Backend**: Node.js
- **Database**: IPFS (for storing metadata, if used)

---

## 🚀 Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/)
- [Ganache](https://trufflesuite.com/ganache/) (optional for local blockchain testing)

### Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/samarthvats04/decentralized-voting-system.git
   cd decentralized-voting-system
   ```
   Or download the repository and extract all files from the compressed folder.

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Compile the smart contract:**
   ```
   npx hardhat compile
   ```

4. **Deploy the contract locally:**
   ```
   npx hardhat node
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Run the frontend (if applicable):**
   ```
   cd frontend
   npm start
   ```

---

## 🔍 Smart Contract Overview

The main contract `Voting.sol` includes:
- 🏆 **Candidate Registration**: Admin registers candidates.
- 👥 **Voter Registration**: Ensures only verified users can vote.
- 🗳️ **Vote Casting**: Each voter can cast one secure vote.
- 📊 **Result Declaration**: Votes are counted, and the winner is determined automatically.

---

## 🎮 Usage
1. 🔗 **Connect your MetaMask wallet** to the application.
2. 📝 **Register as a voter.**
3. 🗳️ **Cast your vote securely.**
4. 📈 **View real-time results.**

---

## 🌍 Deployment
To deploy on a testnet (e.g., Sepolia):
```
npx hardhat run scripts/deploy.js --network sepolia
```
Make sure to configure your `.env` file with the required API keys and wallet private key.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Author
🚀[Samarth Vats](https://github.com/samarthvats04)

