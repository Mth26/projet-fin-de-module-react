import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { Link, NavLink, useLocation } from "react-router-dom"

function Navbar() {
    const location = useLocation()

    const isActive = (path: string) => {
        if (path === "/") return location.pathname === "/"
        return location.pathname.startsWith(path)
    }

    return (
        <Box position="absolute" top={4} left={0} right={0} zIndex={100} display="flex" justifyContent="center">
            <Flex
                bg="brand.black"
                borderRadius="full"
                px={4}
                py={2}
                align="center"
                gap={2}
            >
                <Link to="/">
                    <Box
                        bg="brand.black"
                        borderRadius="full"
                        w="40px"
                        h="40px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M12 19l7-7 3 3-7 7-3-3z" />
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                            <path d="M2 2l7.586 7.586" />
                        </svg>
                    </Box>
                </Link>

                <NavLink to="/">
                    <Box
                        bg={isActive("/") ? "brand.white" : "transparent"}
                        color={isActive("/") ? "brand.black" : "brand.white"}
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontFamily="body"
                        fontSize="sm"
                        fontWeight="medium"
                        transition="all 0.2s"
                        _hover={{ bg: isActive("/") ? "brand.white" : "brand.gray" }}
                    >
                        Accueil
                    </Box>
                </NavLink>

                <NavLink to="/products">
                    <Box
                        bg={isActive("/products") ? "brand.white" : "transparent"}
                        color={isActive("/products") ? "brand.black" : "brand.white"}
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontFamily="body"
                        fontSize="sm"
                        fontWeight="medium"
                        transition="all 0.2s"
                        _hover={{ bg: isActive("/products") ? "brand.white" : "brand.gray" }}
                    >
                        Nos stylos
                    </Box>
                </NavLink>

                <NavLink to="/categories">
                    <Box
                        bg={isActive("/categories") ? "brand.white" : "transparent"}
                        color={isActive("/categories") ? "brand.black" : "brand.white"}
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontFamily="body"
                        fontSize="sm"
                        fontWeight="medium"
                        transition="all 0.2s"
                        _hover={{ bg: isActive("/categories") ? "brand.white" : "brand.gray" }}
                    >
                        Nos gammes
                    </Box>
                </NavLink>

                <NavLink to="/contact">
                    <Box
                        bg={isActive("/contact") ? "brand.white" : "transparent"}
                        color={isActive("/contact") ? "brand.black" : "brand.white"}
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontFamily="body"
                        fontSize="sm"
                        fontWeight="medium"
                        transition="all 0.2s"
                        _hover={{ bg: isActive("/contact") ? "brand.white" : "brand.gray" }}
                    >
                        Contact
                    </Box>
                </NavLink>

                <Link to="/profile">
                    <Box
                        bg="brand.white"
                        borderRadius="full"
                        w="36px"
                        h="36px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        ml={2}
                        transition="all 0.2s"
                        _hover={{ bg: "brand.beige" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </Box>
                </Link>

                <Link to="/cart">
                    <Box
                        bg="brand.white"
                        borderRadius="full"
                        w="36px"
                        h="36px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="all 0.2s"
                        _hover={{ bg: "brand.beige" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </Box>
                </Link>
            </Flex>
        </Box>
    )
}

export default Navbar
