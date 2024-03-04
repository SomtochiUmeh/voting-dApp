import { useEffect } from "react";
import { Typography, Container, Grid } from "@mui/material";

const Home = () => {
    // Add event listener to disable scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <Container>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}
            >
                <Grid item xs={12}>
                    <Typography variant="h1" align="center" gutterBottom>
                        Welcome to Voting Platform
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                        Dey play my fans
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
