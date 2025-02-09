import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("SolidityModifiers", function () {
  async function deploy() {
    const [account1, account2] = await hre.ethers.getSigners();

    const SolidityModifiers = await hre.ethers.getContractFactory("SolidityModifiers");
    console.log("Admin address is:", account1.address);
    console.log("Account 2 address is:", account2.address);
    
    const INITIAL_BALANCE = 1_000_000;

    const ctcSolidityModifiers = await SolidityModifiers.deploy(
      INITIAL_BALANCE,
      account1.address
    );

    return { ctcSolidityModifiers, account1, account2 };
  }

  describe("Deployment", function () {
    it("should call constructor", async function () {
      const { ctcSolidityModifiers } = await loadFixture(deploy);

      expect(ctcSolidityModifiers).not.to.be.undefined;
    });

    it("should add balance if admin", async function () {
        console.log("Attempting to add balance as admin...");
      const { ctcSolidityModifiers, account1 } = await loadFixture(deploy);
      await ctcSolidityModifiers.connect(account1).addBalance(1_000_000);

        const balance = await ctcSolidityModifiers.getBalance();
        console.log("Balance after addition is now ", balance);
      console.log("balance is now ", balance);
    });

    it("should fail if not owner", async function () {
      const { ctcSolidityModifiers, account2 } = await loadFixture(deploy);
      try {
        await ctcSolidityModifiers.connect(account2).addBalance(1_000_000);
      } catch (error) {
        // Error: VM Exception while processing transaction: reverted with reason string 'You are not allowed!'
        console.log(error);
      }
      const balance = await ctcSolidityModifiers.getBalance();
      console.log("balance is now ", balance);
    });
  });
});
