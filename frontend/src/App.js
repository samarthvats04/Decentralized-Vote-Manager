import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.color = "#fff";
  }, []);

  useEffect(() => {
    async function connectContract() {
      if (!window.ethereum) {
        console.error("MetaMask not detected");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setContract(contractInstance);

      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0].address);
        checkIfVoted(contractInstance, accounts[0].address);
      }

      fetchProposals(contractInstance);
    }

    connectContract();
  }, []);

  async function fetchProposals(contractInstance) {
    try {
      const proposalsList = await contractInstance.getProposals();
      setProposals(proposalsList);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  }

  async function checkIfVoted(contractInstance, userAddress) {
    try {
      const voted = await contractInstance.hasVoted(userAddress);
      setHasVoted(voted);
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  }

  async function handleVote() {
    if (!contract || selectedProposal === null) {
      console.error("Contract not connected or proposal not selected");
      return;
    }

    try {
      const tx = await contract.vote(selectedProposal);
      await tx.wait();
      setHasVoted(true);
      console.log("Voted successfully!");
      fetchProposals(contract);
    } catch (error) {
      console.error("Voting failed:", error);
    }
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>🗳 BlockChain-based Vote Manager</h1>
        {account ? (
          <p style={styles.account}>Connected as: <strong>{account}</strong></p>
        ) : (
          <p style={styles.warning}>Please connect MetaMask.</p>
        )}

        {hasVoted ? (
          <h2 style={styles.votedText}>✅ You have already voted!</h2>
        ) : (
          <>
            <h2 style={styles.subTitle}>Vote for a Proposal</h2>
            <div style={styles.proposalList}>
              {proposals.map((proposal, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.proposalCard,
                    border: selectedProposal === index ? "2px solid #6a32ed" : "1px solid #555",
                  }}
                  onClick={() => setSelectedProposal(index)}
                >
                  <p style={styles.proposalName}>{proposal.name}</p>
                  <p style={styles.voteCount}>Votes: {proposal.voteCount.toString()}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={handleVote} 
              style={styles.voteButton} 
              disabled={selectedProposal === null}
            >
              Vote
            </button>
          </>
        )}
      </div>
    </div>
  );
}


const styles = {
  outerContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181821",
  },
  container: {
    textAlign: "center",
    padding: "30px",
    maxWidth: "600px",
    width: "90%",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#282736",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(170, 0, 255, 0.32)",
  },
  title: {
    color: "#fcee49",
    marginBottom: "20px",
    fontSize:"34px",
    fontWeight:"bold"
  },
  account: {
    fontSize: "14px",
    color: "#484e73",
  },
  warning: {
    color: "#e825e2",
    fontWeight: "bold",
  },
  votedText: {
    color: "lightgreen",
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
  },
  proposalList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  proposalCard: {
    padding: "12px",
    borderRadius: "25px",
    backgroundColor: "#181821",
    cursor: "pointer",
    transition: "0.2s",
    textAlign: "left",
    boxShadow: "0px 2px 2px rgba(255, 0, 255, 0.43)",
  },
  proposalName: {
    fontWeight: "bold",
    color: "#fff",
  },
  voteCount: {
    fontSize: "14px",
    color: "#bbb",
  },
  voteButton: {
    marginTop: "20px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#32d14f",
    color: "black",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0px 4px 10px rgba(0, 255, 255, 0.3)",
  },
  
};

export default App;
