import React from "react"
import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {
    return (
        <Box minH="100vh" position="relative">
            <Navbar />
            <Box as="main">
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}

export default Layout
