require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-truffle5');

module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
