const VotingSystem = artifacts.require("./VotingSystem.sol");

module.exports = async function (deployer) {
    await deployer.deploy(VotingSystem);
    const voting = await VotingSystem.deployed();

    await voting.addCandidate(1, "LP");
    await voting.addCandidate(2, "PDP");
    await voting.addCandidate(3, "APC");
};
