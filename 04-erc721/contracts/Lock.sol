// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lock is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {
    }
    uint256 public unlockTime;
    uint256 public funds;

    event FundsLocked(uint256 amount, uint256 unlockTime);
    event Withdrawn(uint256 amount);

    function lock(uint256 _unlockTime) external payable onlyOwner {
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");
        unlockTime = _unlockTime;
        funds += msg.value;
        emit FundsLocked(msg.value, _unlockTime);
    }

    function withdraw() external onlyOwner {
        require(block.timestamp >= unlockTime, "Cannot withdraw before unlock time");
        uint256 amount = funds;
        funds = 0;
        payable(owner()).transfer(amount);
        emit Withdrawn(amount);
    }
    }
