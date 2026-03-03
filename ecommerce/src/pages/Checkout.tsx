import React, { useState } from "react"
import { Box, Text, Flex, Button, Input, Grid } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

function Checkout() {
    const { items, total, itemCount } = useCart()
    const { user, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [isConfirmed, setIsConfirmed] = useState(false)

    if (!isAuthenticated) {
        return (
            <Box pt="120px" textAlign="center" px={4}>
                <Text fontFamily="heading" fontSize="3xl" mb={4}>
                    FINALISER LA COMMANDE
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={6}>
                    Connectez-vous pour passer commande
                </Text>
                <Link to="/login">
                    <Button
                        bg="brand.black"
                        color="brand.white"
                        borderRadius="none"
                        px={8}
                        _hover={{ bg: "brand.gray" }}
                    >
                        Se connecter
                    </Button>
                </Link>
            </Box>
        )
    }

    // panier vide
    if (items.length === 0 && !isConfirmed) {
        return (
            <Box pt="120px" textAlign="center" px={4}>
                <Text fontFamily="heading" fontSize="3xl" mb={4}>
                    PANIER VIDE
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={6}>
                    Ajoutez des produits avant de passer commande
                </Text>
                <Link to="/products">
                    <Button
                        bg="brand.black"
                        color="brand.white"
                        borderRadius="none"
                        px={8}
                        _hover={{ bg: "brand.gray" }}
                    >
                        Voir les produits
                    </Button>
                </Link>
            </Box>
        )
    }

    // confirmation
    if (isConfirmed) {
        return (
            <Box pt="120px" textAlign="center" px={4} pb={16}>
                <Box
                    w="80px"
                    h="80px"
                    borderRadius="full"
                    bg="green.100"
                    mx="auto"
                    mb={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text fontSize="3xl">✓</Text>
                </Box>
                <Text fontFamily="heading" fontSize="3xl" mb={4}>
                    COMMANDE CONFIRMÉE !
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={2}>
                    Merci pour votre commande, {user?.firstName} !
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={8}>
                    Un email de confirmation a été envoyé à {user?.emailAddress}
                </Text>
                <Text fontFamily="body" fontSize="sm" color="brand.gray" mb={8}>
                    Numéro de commande : <strong>CMD-{Date.now()}</strong>
                </Text>
                <Flex gap={4} justify="center">
                    <Link to="/products">
                        <Button
                            bg="brand.black"
                            color="brand.white"
                            borderRadius="none"
                            px={8}
                            _hover={{ bg: "brand.gray" }}
                        >
                            Continuer mes achats
                        </Button>
                    </Link>
                    <Link to="/profile">
                        <Button
                            variant="outline"
                            borderColor="brand.black"
                            borderRadius="none"
                            px={8}
                        >
                            Mon profil
                        </Button>
                    </Link>
                </Flex>
            </Box>
        )
    }

    // Page de formulaire de commande
    return (
        <Box pt="100px" pb={16}>
            <Box maxW="1000px" mx="auto" px={4}>
                <Text fontFamily="heading" fontSize="3xl" mb={8}>
                    FINALISER LA COMMANDE
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "1.5fr 1fr" }} gap={8}>
                    {/* Formulaire */}
                    <Box>
                        {/* Informations de livraison */}
                        <Box bg="brand.offWhite" p={6} mb={6}>
                            <Text fontFamily="heading" fontSize="lg" mb={4}>
                                ADRESSE DE LIVRAISON
                            </Text>
                            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                                <Box>
                                    <Text fontFamily="body" fontSize="sm" mb={1}>Prénom</Text>
                                    <Input
                                        defaultValue={user?.firstName || ""}
                                        borderColor="brand.beige"
                                        borderRadius="none"
                                        bg="white"
                                    />
                                </Box>
                                <Box>
                                    <Text fontFamily="body" fontSize="sm" mb={1}>Nom</Text>
                                    <Input
                                        defaultValue={user?.lastName || ""}
                                        borderColor="brand.beige"
                                        borderRadius="none"
                                        bg="white"
                                    />
                                </Box>
                                <Box gridColumn={{ sm: "span 2" }}>
                                    <Text fontFamily="body" fontSize="sm" mb={1}>Adresse</Text>
                                    <Input
                                        placeholder="123 Rue Example"
                                        borderColor="brand.beige"
                                        borderRadius="none"
                                        bg="white"
                                    />
                                </Box>
                                <Box>
                                    <Text fontFamily="body" fontSize="sm" mb={1}>Code postal</Text>
                                    <Input
                                        placeholder="75000"
                                        borderColor="brand.beige"
                                        borderRadius="none"
                                        bg="white"
                                    />
                                </Box>
                                <Box>
                                    <Text fontFamily="body" fontSize="sm" mb={1}>Ville</Text>
                                    <Input
                                        placeholder="Paris"
                                        borderColor="brand.beige"
                                        borderRadius="none"
                                        bg="white"
                                    />
                                </Box>
                            </Grid>
                        </Box>

                        {/* Mode de paiement (simulé) */}
                        <Box bg="brand.offWhite" p={6}>
                            <Text fontFamily="heading" fontSize="lg" mb={4}>
                                PAIEMENT
                            </Text>
                            <Box>
                                <Text fontFamily="body" fontSize="sm" mb={1}>Numéro de carte</Text>
                                <Input
                                    placeholder="1234 5678 9012 3456"
                                    borderColor="brand.beige"
                                    borderRadius="none"
                                    bg="white"
                                    mb={4}
                                />
                            </Box>
                            <Grid templateColumns="2fr 1fr" gap={4}>
                                <Box>
                                    <Text fontFamily="body" fontSize="sm" mb={1}>Date d'expiration</Text>
                                    <Input
                                        placeholder="MM/AA"
                                        borderColor="brand.beige"
                                        borderRadius="none"
                                        bg="white"
                                    />
                                </Box>
                                <Box>
                                    <Text fontFamily="body" fontSize="sm" mb={1}>CVV</Text>
                                    <Input
                                        placeholder="123"
                                        borderColor="brand.beige"
                                        borderRadius="none"
                                        bg="white"
                                    />
                                </Box>
                            </Grid>
                            <Text fontFamily="body" fontSize="xs" color="brand.gray" mt={4}>
                                * Ceci est une simulation. Aucun paiement réel ne sera effectué.
                            </Text>
                        </Box>
                    </Box>

                    {/* recap */}
                    <Box bg="brand.offWhite" p={6} h="fit-content">
                        <Text fontFamily="heading" fontSize="lg" mb={4}>
                            VOTRE COMMANDE
                        </Text>

                        {items.map((item) => (
                            <Flex key={item.id} justify="space-between" mb={3} pb={3} borderBottom="1px solid" borderColor="brand.beige">
                                <Box>
                                    <Text fontFamily="body" fontSize="sm" fontWeight="medium">
                                        {item.product.name}
                                    </Text>
                                    <Text fontFamily="body" fontSize="xs" color="brand.gray">
                                        Qté: {item.quantity}
                                    </Text>
                                </Box>
                                <Text fontFamily="body" fontSize="sm">
                                    {(item.product.price * item.quantity).toFixed(2)} €
                                </Text>
                            </Flex>
                        ))}

                        <Flex justify="space-between" mb={2} mt={4}>
                            <Text fontFamily="body" color="brand.gray">Sous-total ({itemCount} articles)</Text>
                            <Text fontFamily="body">{total.toFixed(2)} €</Text>
                        </Flex>
                        <Flex justify="space-between" mb={4}>
                            <Text fontFamily="body" color="brand.gray">Livraison</Text>
                            <Text fontFamily="body">Gratuite</Text>
                        </Flex>

                        <Box borderTop="1px solid" borderColor="brand.beige" pt={4}>
                            <Flex justify="space-between" mb={6}>
                                <Text fontFamily="heading" fontSize="lg">TOTAL</Text>
                                <Text fontFamily="heading" fontSize="lg" color="brand.accent">
                                    {total.toFixed(2)} €
                                </Text>
                            </Flex>

                            <Button
                                bg="brand.black"
                                color="brand.white"
                                borderRadius="none"
                                w="100%"
                                py={6}
                                _hover={{ bg: "brand.gray" }}
                                onClick={() => setIsConfirmed(true)}
                            >
                                Confirmer la commande
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default Checkout
