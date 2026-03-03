import React from "react"
import { Box, Text, Flex, Image, Button, Grid } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

function Cart() {
    const { items, total, itemCount, removeFromCart, isLoading } = useCart()
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    if (!isAuthenticated) {
        return (
            <Box pt="120px" textAlign="center" px={4}>
                <Text fontFamily="heading" fontSize="3xl" mb={4}>
                    MON PANIER
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={6}>
                    Connectez-vous pour accéder à votre panier
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

    if (items.length === 0) {
        return (
            <Box pt="120px" textAlign="center" px={4}>
                <Text fontFamily="heading" fontSize="3xl" mb={4}>
                    MON PANIER
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={6}>
                    Votre panier est vide
                </Text>
                <Link to="/products">
                    <Button
                        bg="brand.black"
                        color="brand.white"
                        borderRadius="none"
                        px={8}
                        _hover={{ bg: "brand.gray" }}
                    >
                        Découvrir nos stylos
                    </Button>
                </Link>
            </Box>
        )
    }

    return (
        <Box pt="100px" pb={16}>
            <Box maxW="1200px" mx="auto" px={4}>
                <Text fontFamily="heading" fontSize="4xl" mb={2}>
                    MON PANIER
                </Text>
                <Text fontFamily="body" color="brand.gray" mb={8}>
                    {itemCount} article{itemCount > 1 ? "s" : ""} dans votre panier
                </Text>

                <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
                    <Box>
                        {items.map((item) => (
                            <Flex
                                key={item.id}
                                bg="brand.offWhite"
                                p={4}
                                mb={4}
                                gap={4}
                                align="center"
                            >
                                <Box bg="white" p={4} w="120px" h="120px">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        w="100%"
                                        h="100%"
                                        objectFit="contain"
                                    />
                                </Box>
                                <Box flex={1}>
                                    <Text fontFamily="body" fontWeight="bold" mb={1}>
                                        {item.product.name}
                                    </Text>
                                    <Text fontFamily="body" fontSize="sm" color="brand.gray" mb={2}>
                                        Quantité: {item.quantity}
                                    </Text>
                                    <Text fontFamily="body" color="brand.accent">
                                        {item.product.price} €
                                    </Text>
                                </Box>
                                <Button
                                    variant="ghost"
                                    color="red.500"
                                    onClick={() => removeFromCart(item.productId)}
                                    disabled={isLoading}
                                >
                                    Supprimer
                                </Button>
                            </Flex>
                        ))}
                    </Box>

                    <Box bg="brand.offWhite" p={6} h="fit-content">
                        <Text fontFamily="heading" fontSize="xl" mb={6}>
                            RÉCAPITULATIF
                        </Text>

                        <Flex justify="space-between" mb={3}>
                            <Text fontFamily="body" color="brand.gray">Sous-total</Text>
                            <Text fontFamily="body">{total.toFixed(2)} €</Text>
                        </Flex>
                        <Flex justify="space-between" mb={3}>
                            <Text fontFamily="body" color="brand.gray">Livraison</Text>
                            <Text fontFamily="body">Gratuite</Text>
                        </Flex>

                        <Box borderTop="1px solid" borderColor="brand.beige" pt={4} mt={4}>
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
                                onClick={() => navigate("/checkout")}
                            >
                                Passer la commande
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default Cart
