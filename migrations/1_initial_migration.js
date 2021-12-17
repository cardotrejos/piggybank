const hre = require('hardhat');

var Migrations = hre.artifacts.readArtifact('Migrations');

module.exports = async () => {
  const migrations = await Migrations.new();
  Migrations.setAsDeployed(migrations);
};
