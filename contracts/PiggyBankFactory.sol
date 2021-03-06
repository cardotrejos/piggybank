//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PiggyBank.sol";

contract PiggyBankFactory{
    uint256 private _piggyAccountsCounter;
    
    constructor(){
        _piggyAccountsCounter = 0;
    }
    
    struct PiggyAccounts{
        PiggyBank singlePiggyBank;
        uint amount;
    }
    
    mapping (uint256 => PiggyBank) private  accounts;
    
    function createPiggyBank() public {
        PiggyBank newPiggyBank = new PiggyBank(msg.sender);
        require(address(newPiggyBank) != address(0), "The contract should be deployed");
        _piggyAccountsCounter++; 
        accounts[_piggyAccountsCounter] = newPiggyBank;        
    }

    function getPiggyBankAddress(uint _piggyId) public view returns(PiggyBank){
        return accounts[_piggyId];
    }
    
    function getPiggyQtyAccounts() public view returns(uint256){
        return _piggyAccountsCounter;
    }
    
}