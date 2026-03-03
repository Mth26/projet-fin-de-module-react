import React, { useEffect, useState } from "react"
import { Box, Text, Flex, Input, Button, Grid } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Profile() {
    const { user, logout, isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login")
        }
    }, [isAuthenticated, isLoading, navigate])

    useEffect(() => {
        if (user) {
            setFirstname(user.firstName || "")
            setLastname(user.lastName || "")
            setEmail(user.emailAddress || "")
        }
    }, [user])

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (isLoading) {
        return (
            <Box pt="120px" textAlign="center">
                <Text>Chargement...</Text>
            </Box>
        )
    }

    if (!user) return null

    return (
        <Box pt="100px" pb={16}>
            <Box maxW="800px" mx="auto" px={4}>
                <Text fontFamily="heading" fontSize="4xl" mb={2}>
                    MON PROFIL
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={8}>
                    Gérez vos informations personnelles
                </Text>

                <Box bg="brand.offWhite" p={8} mb={8}>
                    <Text fontFamily="heading" fontSize="xl" mb={6}>
                        INFORMATIONS PERSONNELLES
                    </Text>

                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                        <Box>
                            <Text fontFamily="body" fontSize="sm" mb={2}>Prénom</Text>
                            <Input
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                borderColor="brand.beige"
                                borderRadius="none"
                                bg="white"
                            />
                        </Box>
                        <Box>
                            <Text fontFamily="body" fontSize="sm" mb={2}>Nom</Text>
                            <Input
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                borderColor="brand.beige"
                                borderRadius="none"
                                bg="white"
                            />
                        </Box>
                        <Box gridColumn={{ md: "span 2" }}>
                            <Text fontFamily="body" fontSize="sm" mb={2}>Email</Text>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                borderColor="brand.beige"
                                borderRadius="none"
                                bg="white"
                                type="email"
                            />
                        </Box>
                    </Grid>

                    <Button
                        bg="brand.black"
                        color="brand.white"
                        borderRadius="none"
                        mt={6}
                        px={8}
                        _hover={{ bg: "brand.gray" }}
                    >
                        Enregistrer les modifications
                    </Button>
                </Box>

                <Flex justify="space-between" align="center" pt={4} borderTop="1px solid" borderColor="brand.beige">
                    <Text fontFamily="body" fontSize="sm" color="brand.gray">
                        Connecté en tant que {user.emailAddress}
                    </Text>
                    <Button
                        variant="outline"
                        borderColor="red.500"
                        color="red.500"
                        borderRadius="none"
                        onClick={handleLogout}
                        _hover={{ bg: "red.50" }}
                    >
                        Se déconnecter
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default Profile
