const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('PiggyBankFactory', function () {
  let deployer;
  // eslint-disable-next-line no-unused-vars
  let account1;
  // eslint-disable-next-line no-unused-vars
  let account2;

  beforeEach(async function () {
    [deployer, account1, account2] = await ethers.getSigners();

    const PiggyBankFactory = await ethers.getContractFactory(
      'PiggyBankFactory',
      deployer
    );
    this.contractPiggyFactory = await PiggyBankFactory.deploy();
  });

  describe('Initialization', function () {
    it('Creates piggy bank account', async function () {
      // eslint-disable-next-line no-unused-vars
      const newPiggyAcc = await this.contractPiggyFactory.createPiggyBank();
      const counter = await this.contractPiggyFactory.getPiggyQtyAccounts();
      const addressAccount =
        await this.contractPiggyFactory.getPiggyBankAddress(counter);
      console.log(ethers.constants.AddressZero);
      assert(
        addressAccount !== ethers.constants.AddressZero,
        'The account deployment was successfully'
      );
      console.log(`Created account address is: ${addressAccount}`);
      console.log(`Created account number is : ${counter}`);
    });
  });
});
