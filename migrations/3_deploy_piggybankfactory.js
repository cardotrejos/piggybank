const hre = require('hardhat');

var PiggyBankFactory = hre.artifacts.readArtifact('PiggyBankFactory');

module.exports = async () => {
  const piggyBankFactory = await PiggyBankFactory.new();
  PiggyBankFactory.setAsDeployed(piggyBankFactory);
};
