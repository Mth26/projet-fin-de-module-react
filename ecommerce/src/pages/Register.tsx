import React, { useState } from "react"
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas")
            return
        }

        setIsLoading(true)

        try {
            await register({ emailAddress: email, password, firstName: firstname, lastName: lastname })
            navigate("/")
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Flex minH="100vh">
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
                        <Text fontFamily="heading" fontSize="3xl">INSCRIPTION</Text>
                        <Text fontFamily="body" fontSize="sm" color="brand.gray" textAlign="center">
                            Créez un compte pour accéder à nos stylos
                        </Text>
                    </Flex>

                    {error && (
                        <Box bg="red.100" color="red.600" p={3} mb={4} fontSize="sm">
                            {error}
                        </Box>
                    )}

                    <Flex gap={4} mb={4}>
                        <Box flex={1}>
                            <Text fontFamily="body" fontSize="sm" mb={1}>Prénom</Text>
                            <Input
                                type="text"
                                placeholder="John"
                                borderColor="brand.beige"
                                borderRadius="none"
                                _focus={{ borderColor: "brand.black" }}
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                        </Box>
                        <Box flex={1}>
                            <Text fontFamily="body" fontSize="sm" mb={1}>Nom</Text>
                            <Input
                                type="text"
                                placeholder="Doe"
                                borderColor="brand.beige"
                                borderRadius="none"
                                _focus={{ borderColor: "brand.black" }}
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </Box>
                    </Flex>

                    <Box mb={4}>
                        <Text fontFamily="body" fontSize="sm" mb={1}>Email</Text>
                        <Input
                            type="email"
                            placeholder="test@test.test"
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

                    <Box mb={6}>
                        <Text fontFamily="body" fontSize="sm" mb={1}>Confirmer votre mot de passe</Text>
                        <Input
                            type="password"
                            placeholder="••••••••••••"
                            borderColor="brand.beige"
                            borderRadius="none"
                            _focus={{ borderColor: "brand.black" }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Box>

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
                        {isLoading ? "Inscription..." : "Créer un compte"}
                    </Button>

                    <Text textAlign="center" mt={6} fontSize="sm">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login">
                            <Text as="span" textDecoration="underline" fontWeight="medium">
                                se connecter
                            </Text>
                        </Link>
                    </Text>
                </Box>
            </Flex>

            <Box
                w="50%"
                display={{ base: "none", md: "block" }}
                style={{
                    backgroundImage: "url('https://cdn.prod.website-files.com/62ee0bbe0c783a903ecc0ddb/69696ea9c7db64c52437b170_FLAUNT%20Montblanc%20Valentine%27s%20Day%202026%20-%20Meisterstu%CC%88ck%20Romeo%20%26%20Juliet%20(2).jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
        </Flex>
    )
}

export default Register
