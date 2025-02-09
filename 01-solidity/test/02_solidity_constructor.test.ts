import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("SolidityConstructor", function () {
  async function deploy() {
    const [account1] = await hre.ethers.getSigners();

    const SolidityConstructor = await hre.ethers.getContractFactory(
      "SolidityConstructor"
    );
    const INITIAL_BALANCE = 10;

    const ctcSolidityConstructor = await SolidityConstructor.deploy(
      INITIAL_BALANCE);

    return { ctcSolidityConstructor, account1 };
  }

  describe("Deployment", function () {
    it("should call constructor", async function () {
      const { ctcSolidityConstructor } = await loadFixture(deploy);

      expect(ctcSolidityConstructor).not.to.be.undefined;
    });
  });
});