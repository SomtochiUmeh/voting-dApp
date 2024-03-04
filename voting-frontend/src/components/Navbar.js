import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const MyNavbar = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        Voting
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/voting">
                        Voting
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MyNavbar;
