// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    IERC20 public erc20Token;
    uint256 public constant MAX_SUPPLY = 200; // Maximum supply of NFTs
    uint256 public mintPrice = 2000 * 10 ** 18; // Set mint price to 2000 tokens
    uint256 public totalSupply; // Track total supply of minted NFTs
    uint256 public tokenId; // Declare tokenId

    constructor() ERC721("DragonDragneel", "DRD") Ownable(msg.sender) {
        tokenId = 0; // Initialize tokenId
    }

    function mint() external {
        require(erc20Token.transferFrom(msg.sender, address(this), mintPrice), "ERC20 transfer failed: Payment failed");
        require(totalSupply < MAX_SUPPLY, "Max supply reached"); // Check max supply
        _safeMint(msg.sender, tokenId); 
        totalSupply++; // Increment total supply
        _setTokenURI(
            tokenId,
            "https://gist.github.com/Hurotamo/dd5361486b3e62a6b8eedfe6e0782adc"
        );
        tokenId++;
    }

    function setERC20Token(address _erc20Token) external onlyOwner {
        require(_erc20Token != address(0), "Invalid ERC20 token address");
        erc20Token = IERC20(_erc20Token);
    }
}
