const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT Minting", function () {
    let myNFT;
    let erc20Token;
    let owner;
    let addr1;

    beforeEach(async function () {
        const ERC20 = await ethers.getContractFactory("NameYourToken");
        erc20Token = await ERC20.deploy();
        await erc20Token.deployed();

        const MyNFT = await ethers.getContractFactory("MyNFT");
        myNFT = await MyNFT.deploy();
        await myNFT.deployed();

        await myNFT.setERC20Token(erc20Token.address);

        [owner, addr1] = await ethers.getSigners();
        await erc20Token.mint(addr1.address, ethers.utils.parseUnits("100000", 18)); // Mint tokens to addr1
        await erc20Token.connect(addr1).approve(myNFT.address, ethers.utils.parseUnits("2000", 18)); // Approve tokens for minting
    });

    it("Should mint an NFT when payment is made", async function () {
        await myNFT.connect(addr1).mint();
        expect(await myNFT.totalSupply()).to.equal(1);
    });

    it("Should not mint more than MAX_SUPPLY", async function () {
        for (let i = 0; i < 200; i++) {
            await myNFT.connect(addr1).mint();
        }
        await expect(myNFT.connect(addr1).mint()).to.be.revertedWith("Max supply reached");
    });
});
