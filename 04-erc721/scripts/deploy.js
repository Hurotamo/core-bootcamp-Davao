const { ethers } = require("hardhat");

async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.deployed();

    const erc20TokenAddress = "0x6B381Fa6bb7843FF2dC8b472Ec555B5DfBb13D35"; // ERC-20 token address
    await myNFT.setERC20Token(erc20TokenAddress); // Set the ERC-20 token address

    console.log("MyNFT deployed to:", myNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
