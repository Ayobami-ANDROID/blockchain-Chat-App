// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.

const hre = require("hardhat");

async function main() {


  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  const chatApp = await ChatApp.deploy();

  await chatApp.deployed();

  console.log(
    `contract Address:  ${chatApp.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
