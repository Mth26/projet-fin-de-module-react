import React from "react"
import { Box, Text, Flex, Grid, Image, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const gammes = [
    {
        id: 1,
        nom: "NOS STYLOS DE COLLECTION :",
        produits: [
            { id: 1, nom: "Stylo plume Château de Versailles Limited Edition 3", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 2, nom: "Stylo plume Château de Versailles Limited Edition 3", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 3, nom: "Stylo plume Château de Versailles Limited Edition 3", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" }
        ]
    },
    {
        id: 2,
        nom: "NOS STYLOS PLUME :",
        produits: [
            { id: 4, nom: "Stylo plume Roméo et Juliette beige", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 5, nom: "Stylo plume Roméo et Juliette beige", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 6, nom: "Stylo plume Roméo et Juliette beige", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" }
        ]
    },
    {
        id: 3,
        nom: "NOS STYLOS BILLE :",
        produits: [
            { id: 7, nom: "Stylo bille Writers Edition Hommage aux Frères Grimm", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 8, nom: "Stylo bille Writers Edition Hommage aux Frères Grimm", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 9, nom: "Stylo bille Writers Edition Hommage aux Frères Grimm", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" }
        ]
    },
    {
        id: 4,
        nom: "NOS FEUTRES FINS :",
        produits: [
            { id: 11, nom: "Feutre Fin StarWalker PolarGreen Métal", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 12, nom: "Feutre Fin StarWalker PolarGreen Métal", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
            { id: 13, nom: "Feutre Fin StarWalker PolarGreen Métal", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" }
        ]
    }
]

function ProductCard({ produit, isDark }: { produit: { id: number; nom: string; image: string }; isDark: boolean }) {
    const { addToCart, isLoading } = useCart()
    const { isAuthenticated } = useAuth()

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            alert("Connectez-vous pour ajouter au panier")
            return
        }
        try {
            await addToCart(produit.id)
            alert(`${produit.nom} ajouté au panier !`)
        } catch (error) {
            alert("Erreur lors de l'ajout au panier")
        }
    }

    return (
        <Box textAlign="center" py={4}>
            <Box p={8} mb={4}>
                <Image
                    src={produit.image}
                    alt={produit.nom}
                    h="200px"
                    mx="auto"
                    objectFit="contain"
                />
            </Box>
            <Text fontFamily="body" fontSize="sm" mb={3} px={2} color={isDark ? "white" : "brand.black"}>
                {produit.nom}
            </Text>
            <Link to={`/products/${produit.id}`}>
                <Text fontFamily="body" fontSize="xs" color={isDark ? "whiteAlpha.700" : "brand.gray"} mb={4}>
                    Accéder au produit →
                </Text>
            </Link>
            <Button
                variant="outline"
                borderColor={isDark ? "white" : "brand.black"}
                color={isDark ? "white" : "brand.black"}
                borderRadius="none"
                size="md"
                fontFamily="body"
                w="80%"
                py={5}
                _hover={{ bg: isDark ? "whiteAlpha.200" : "blackAlpha.100" }}
                onClick={handleAddToCart}
                disabled={isLoading}
            >
                {isLoading ? "Ajout..." : "Ajouter au panier"}
            </Button>
        </Box>
    )
}

function Categories() {
    return (
        <Box pt="80px">
            {gammes.map((gamme, index) => {
                const isDark = index % 2 === 0
                return (
                    <Box
                        key={gamme.id}
                        bg={isDark ? "brand.black" : "brand.white"}
                        py={12}
                        px={4}
                    >
                        <Box maxW="1200px" mx="auto">
                            <Flex
                                justify="space-between"
                                align="center"
                                mb={8}
                                px={4}
                            >
                                <Text
                                    fontFamily="heading"
                                    fontSize="xl"
                                    color={isDark ? "white" : "brand.black"}
                                >
                                    {gamme.nom}
                                </Text>
                                <Link to={`/products?category=${gamme.id}`}>
                                    <Text
                                        fontFamily="body"
                                        fontSize="sm"
                                        color={isDark ? "white" : "brand.gray"}
                                    >
                                        Afficher toute la gamme →
                                    </Text>
                                </Link>
                            </Flex>

                            <Grid
                                templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
                                gap={10}
                                px={4}
                            >
                                {gamme.produits.map((produit) => (
                                    <ProductCard key={produit.id} produit={produit} isDark={isDark} />
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default Categories
