// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    // Struct to represent a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Mapping to store candidates
    mapping(uint => Candidate) public candidates;

    // Keep track of the candidates count
    uint public candidatesCount = 0;
    
    // Mapping to store whether an address has voted
    mapping(address => bool) public hasVoted;

    // Events to track voting actions
    event Voted(address indexed voter, uint candidateId);
    address[] public voters;

    // Modifier to ensure only eligible voters can cast their votes
    modifier onlyEligibleVoter() {
        // Implement logic to check eligibility, for example, by verifying if the voter is registered
        _;
    }

    constructor() {
        
    }

    // Function to add a candidate
    function addCandidate(uint _id, string memory _name) public {
        // Check if candidate ID already exists
        require(candidates[_id].id == 0, "Candidate ID already exists");
        
        // Add candidate
        candidates[_id] = Candidate(_id, _name, 0);
        candidatesCount++;
    }

    // Function to cast a vote
    function vote(uint _candidateId) public onlyEligibleVoter {
        // Check if the voter has not voted before
        require(!hasVoted[msg.sender], "You have already voted");

        // Check if the candidate exists
        require(candidates[_candidateId].id != 0, "Candidate does not exist");
        
        // Record that the voter has voted
        hasVoted[msg.sender] = true;
        voters.push(msg.sender);

        // Increment the vote count for the candidate
        candidates[_candidateId].voteCount++;

        // Emit event
        emit Voted(msg.sender, _candidateId);
    }

    // Function to get the winner candidate
    function getWinner() public view returns (uint) {
        uint maxVotes = 0;
        uint winnerId = 0;
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].id != 0 && candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerId = i;
            }
        }
        return winnerId;
    }

    // Function to get the list of voters
    function getVoters() public view returns (address[] memory) {
        return voters;
    }
}