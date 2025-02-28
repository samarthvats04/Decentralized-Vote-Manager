const hre = require("hardhat");

async function main() {
  const proposals = ["Proposal 1", "Proposal 2", "Proposal 3"];
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(proposals);

  await voting.waitForDeployment();
  console.log(`Contract deployed to: ${await voting.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
