import React from "react"
import { Box, Flex, Text, Grid } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <Box bg="brand.black" color="brand.white" py={12} px={8}>
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                gap={8}
                maxW="1200px"
                mx="auto"
                mb={8}
            >
                <Box>
                    <Text fontFamily="heading" fontSize="xl" mb={4}>
                        STYLOS DE LUXE
                    </Text>
                    <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700">
                        L'excellence de l'écriture depuis 2026
                    </Text>
                </Box>

                <Box>
                    <Text fontFamily="body" fontWeight="bold" fontSize="sm" mb={4}>
                        Navigation
                    </Text>
                    <Flex direction="column" gap={2}>
                        <Link to="/">
                            <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700" _hover={{ color: "white" }}>
                                Accueil
                            </Text>
                        </Link>
                        <Link to="/products">
                            <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700" _hover={{ color: "white" }}>
                                Nos stylos
                            </Text>
                        </Link>
                        <Link to="/categories">
                            <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700" _hover={{ color: "white" }}>
                                Nos gammes
                            </Text>
                        </Link>
                    </Flex>
                </Box>

                <Box>
                    <Text fontFamily="body" fontWeight="bold" fontSize="sm" mb={4}>
                        Informations
                    </Text>
                    <Flex direction="column" gap={2}>
                        <Link to="/contact">
                            <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700" _hover={{ color: "white" }}>
                                Contact
                            </Text>
                        </Link>
                        <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700">
                            Livraison
                        </Text>
                        <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700">
                            Mentions légales
                        </Text>
                    </Flex>
                </Box>

                <Box>
                    <Text fontFamily="body" fontWeight="bold" fontSize="sm" mb={4}>
                        Mon compte
                    </Text>
                    <Flex direction="column" gap={2}>
                        <Link to="/login">
                            <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700" _hover={{ color: "white" }}>
                                Connexion
                            </Text>
                        </Link>
                        <Link to="/register">
                            <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700" _hover={{ color: "white" }}>
                                Inscription
                            </Text>
                        </Link>
                        <Link to="/cart">
                            <Text fontFamily="body" fontSize="sm" color="whiteAlpha.700" _hover={{ color: "white" }}>
                                Panier
                            </Text>
                        </Link>
                    </Flex>
                </Box>
            </Grid>

            <Box borderTop="1px solid" borderColor="whiteAlpha.200" pt={6}>
                <Text fontFamily="body" fontSize="xs" color="whiteAlpha.500" textAlign="center">
                    © 2026 Stylos de Luxe. Tous droits réservés.
                </Text>
            </Box>
        </Box>
    )
}

export default Footer
