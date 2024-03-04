import votingAppABI from "./votingAppABI";

const address = process.env.REACT_APP_VOTING_CONTRACT_ADDRESS;

export function getVotingAppContract(web3) {
    console.log("in func", address);
    return new web3.eth.Contract(votingAppABI, address);
}
