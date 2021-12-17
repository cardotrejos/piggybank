const hre = require('hardhat');

var PiggyBank = hre.artifacts.readArtifact('PiggyBank');

module.exports = async () => {
  const piggyBank = await PiggyBank.new();
  PiggyBank.setAsDeployed(
    piggyBank,
    '0x47BA25C0173E6F08173a41da433f7AeEE18DA517'
  );
};
