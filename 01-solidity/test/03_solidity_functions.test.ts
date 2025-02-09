import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("SolidityFunctions", function () {
  async function deploy() {
    const [account1] = await hre.ethers.getSigners();

    const SolidityFunctions = await hre.ethers.getContractFactory(
      "SolidityFunctions"
    );
    const INITIAL_BALANCE = 10;

    const ctcSolidityFunctions = await SolidityFunctions.deploy(
      INITIAL_BALANCE
    );

    return { ctcSolidityFunctions, account1 };
  }

  describe("Deployment", function () {
    it("should call constructor", async function () {
      const { ctcSolidityFunctions } = await loadFixture(deploy);

      expect(ctcSolidityFunctions).not.to.be.undefined;
    });

    it("should add balance", async function () {
      const { ctcSolidityFunctions } = await loadFixture(deploy);

      await ctcSolidityFunctions.addBalance(1_000_000);

      const balance = await ctcSolidityFunctions.getBalance();
      console.log("balance is now ", balance);
    });
  });
});