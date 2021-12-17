const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PiggyBank', function () {
  let deployer, account1, account2;

  beforeEach(async function () {
    [deployer, account1, account2] = await ethers.getSigners();

    const PiggyBank = await ethers.getContractFactory('PiggyBank', deployer);
    this.contratoPiggy = await PiggyBank.deploy(deployer.address);
  });

  describe('Initialization', function () {
    it('Should accept ether', async function () {
      const tx = await deployer.sendTransaction({
        to: this.contratoPiggy.address,
        value: ethers.utils.parseEther('1')
      });
      let balance = await ethers.provider.getBalance(
        this.contratoPiggy.address
      );

      expect(balance).to.eq(ethers.utils.parseEther('1'));
      console.log(
        `El contrato tiene: ${ethers.utils.formatEther(balance.toString())}`
      );
    });
  });

  describe('Transfer action', function () {
    it('Checks the owner', async function () {
      const owner = await this.contratoPiggy.owner();

      expect(deployer.address).to.eq(owner);
      console.log(`Deployer address: ${deployer.address}`);
      console.log(`Owner address: ${owner}`);
    });

    describe('Withdraw ethers', function () {
      it('Should be the owner to withdraw ether', async function () {
        await deployer.sendTransaction({
          to: this.contratoPiggy.address,
          value: ethers.utils.parseEther('5')
        });

        const contractFunds = await ethers.provider.getBalance(
          this.contratoPiggy.address
        );
        expect(contractFunds).to.be.gt(0);
        console.log(
          `Contract balance : ${ethers.utils.formatEther(
            contractFunds.toString()
          )}`
        );

        const ownerFunds = ethers.utils.formatEther(
          (await ethers.provider.getBalance(deployer.address)).toString()
        );

        console.log(`Owner balance : ${ownerFunds}`);

        await this.contratoPiggy.withDraw({ from: deployer.address });

        console.log(
          `Owner current balance: ${ethers.utils.formatEther(
            (await ethers.provider.getBalance(deployer.address)).toString()
          )}`
        );
        console.log(
          `Contract balance : ${await ethers.provider.getBalance(
            this.contratoPiggy.address
          )}`
        );
      });
    });
  });
});
