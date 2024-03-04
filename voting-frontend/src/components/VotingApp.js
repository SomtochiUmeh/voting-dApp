import React, { useState, useEffect, useMemo } from "react";
import Web3 from "web3";
import { Button, Card, Container, Grid, Typography, Box } from "@mui/material";
import { Alert } from "@mui/material";
import { getVotingAppContract } from "../web3/utils";

const VotingApp = () => {
    // State variables
    const [currentAccount, setCurrentAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [winner, setWinner] = useState("");
    const [voters, setVoters] = useState([]);

    // Create Web3 instance
    const web3 = useMemo(() => new Web3(window.ethereum), []);

    // Connect wallet function
    const connectWallet = async () => {
        try {
            const accounts = await web3.eth.requestAccounts();
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    // Fetch current account
    const getCurrentAccount = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            setCurrentAccount(accounts[0] || null);
        } catch (error) {
            console.error("Error fetching current account:", error);
        }
    };

    useEffect(() => {
        getCurrentAccount();
    });

    // Fetch voting system data
    useEffect(() => {
        const getVotingSystem = async () => {
            if (!currentAccount) return;

            const contract = getVotingAppContract(web3);
            setContract(contract);

            const count = await contract.methods.candidatesCount().call();
            const candidates = [];
            for (let i = 1; i <= count; i++) {
                const candidate = await contract.methods.candidates(i).call();
                candidates.push(candidate);
            }
            setCandidates(candidates);

            // Fetch list of voters
            const voters = await contract.methods.getVoters().call();
            console.log("voteders", voters);
        };

        getVotingSystem();
    }, [web3, currentAccount]);

    // Render connect wallet button if not connected
    if (!currentAccount) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                    You need to first connect your Ethereum wallet to use the
                    voting system.
                </Alert>
                <Button variant="contained" onClick={connectWallet}>
                    Connect Wallet
                </Button>
            </Container>
        );
    }

    // Vote for a candidate
    const voteForCandidate = async (candidateId) => {
        try {
            if (contract) {
                await contract.methods
                    .vote(candidateId)
                    .send({ from: currentAccount, gasPrice: 100, gas: 100000 });
            }
        } catch (error) {
            console.error("Error voting for candidate:", error);
        }
    };

    // Get the winner
    const getWinner = async () => {
        try {
            if (contract) {
                const winnerId = await contract.methods.getWinner().call();
                const winner = await contract.methods
                    .candidates(winnerId)
                    .call();
                setWinner(winner.name);
            }
        } catch (error) {
            console.error("Error getting winner:", error);
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h1" align="center" gutterBottom>
                Voting System
            </Typography>
            <Box sx={{ textAlign: "center", mb: 3 }}>
                <Button variant="contained" color="primary" onClick={getWinner}>
                    Get Winner
                </Button>
            </Box>
            {winner && (
                <Typography variant="h2" align="center" gutterBottom>
                    Winner: {winner}
                </Typography>
            )}
            <Grid container spacing={3} justifyContent="center">
                {candidates.map((candidate) => (
                    <Grid item key={candidate.id} xs={12} md={4}>
                        <Card sx={{ textAlign: "center", p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                {candidate.name}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Votes: {candidate.voteCount.toString()}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => voteForCandidate(candidate.id)}
                            >
                                Vote
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default VotingApp;
