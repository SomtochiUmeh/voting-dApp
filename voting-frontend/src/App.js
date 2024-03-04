import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import VotingApp from "./components/VotingApp";
import MyNavbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Configure CSS
const cache = createCache({
    key: "css",
    prepend: true,
});

const theme = createTheme({
    palette: {
        background: {
            default: "#FAFAFA",
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CacheProvider value={cache}>
                <div className="App">
                    <CssBaseline />
                    <MyNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/voting" element={<VotingApp />} />
                    </Routes>
                </div>
            </CacheProvider>
        </ThemeProvider>
    );
}
