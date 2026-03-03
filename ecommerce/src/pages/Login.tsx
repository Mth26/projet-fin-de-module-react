import React, { useState } from "react"
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await login({ emailAddress: email, password })
            navigate("/")
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur de connexion")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Flex minH="100vh">
            <Box
                w="50%"
                display={{ base: "none", md: "block" }}
                style={{
                    backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFFzp0Z6etJg2I5SbafiqlwDr_khZYiZIiQ&s')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <Flex w={{ base: "100%", md: "50%" }} align="center" justify="center" p={8}>
                <Box w="100%" maxW="400px" as="form" onSubmit={handleSubmit}>
                    <Flex direction="column" align="center" mb={8}>
                        <Box
                            w="80px"
                            h="80px"
                            borderRadius="full"
                            border="2px solid"
                            borderColor="brand.beige"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mb={4}
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#404040" strokeWidth="1.5">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                            </svg>
                        </Box>
                        <Text fontFamily="heading" fontSize="3xl">CONNEXION</Text>
                        <Text fontFamily="body" fontSize="sm" color="brand.gray" textAlign="center">
                            Connectez-vous à votre compte pour accéder à nos stylos
                        </Text>
                    </Flex>

                    {error && (
                        <Box bg="red.100" color="red.600" p={3} mb={4} fontSize="sm">
                            {error}
                        </Box>
                    )}

                    <Box mb={4}>
                        <Text fontFamily="body" fontSize="sm" mb={1}>Email</Text>
                        <Input
                            type="email"
                            placeholder="admin@example.com"
                            borderColor="brand.beige"
                            borderRadius="none"
                            _focus={{ borderColor: "brand.black" }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Box>

                    <Box mb={4}>
                        <Text fontFamily="body" fontSize="sm" mb={1}>Mot de passe</Text>
                        <Input
                            type="password"
                            placeholder="••••••••••••"
                            borderColor="brand.beige"
                            borderRadius="none"
                            _focus={{ borderColor: "brand.black" }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Flex justify="space-between" align="center" mb={6}>
                        <Flex align="center" gap={2}>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" style={{ fontSize: "14px" }}>Se souvenir de moi</label>
                        </Flex>
                        <Link to="/forgot-password">
                            <Text fontSize="sm" color="brand.gray" textDecoration="underline">
                                Mot de passe oublié ?
                            </Text>
                        </Link>
                    </Flex>

                    <Button
                        w="100%"
                        bg="brand.black"
                        color="brand.white"
                        borderRadius="none"
                        py={6}
                        fontFamily="body"
                        _hover={{ bg: "brand.gray" }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </Button>

                    <Text textAlign="center" mt={6} fontSize="sm">
                        Pas encore de compte ?{" "}
                        <Link to="/register">
                            <Text as="span" textDecoration="underline" fontWeight="medium">
                                créer un compte
                            </Text>
                        </Link>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Login
