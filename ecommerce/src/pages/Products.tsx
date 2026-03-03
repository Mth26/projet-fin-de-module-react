import React, { useState } from "react"
import { Box, Text, SimpleGrid, Flex, Button, Input, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

// nos stylos
const stylosData = [
    { id: 1, name: "Stylo plume Roméo et Juliette", category: "Stylos Plume", price: 890, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 2, name: "Stylo plume Château de Versailles", category: "Stylos de Collection", price: 1250, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 3, name: "Stylo bille Writers Edition Grimm", category: "Stylos Bille", price: 650, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 4, name: "Feutre Fin StarWalker PolarGreen", category: "Feutres Fins", price: 420, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 5, name: "Stylo plume Meisterstück Gold", category: "Stylos Plume", price: 980, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 6, name: "Stylo bille Montblanc Heritage", category: "Stylos Bille", price: 550, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 7, name: "Stylo plume Bohème Bleu", category: "Stylos Plume", price: 1100, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 8, name: "Feutre Fin Starwalker Midnight", category: "Feutres Fins", price: 380, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 9, name: "Stylo plume Leonardo da Vinci", category: "Stylos de Collection", price: 1450, image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
]

function Products() {
    const [search, setSearch] = useState("")

    // filtre recherche
    const filteredStylos = stylosData.filter(stylo =>
        stylo.name.toLowerCase().includes(search.toLowerCase()) ||
        stylo.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Box pt="100px" px={{ base: 4, md: 8 }} maxW="1400px" mx="auto" pb={16}>
            <Text fontFamily="heading" fontSize="4xl" mb={4}>
                NOS STYLOS
            </Text>

            <Box mb={8} maxW="400px">
                <Input
                    placeholder="Rechercher un stylo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    borderColor="brand.beige"
                    borderRadius="none"
                    _focus={{ borderColor: "brand.black" }}
                />
            </Box>

            {filteredStylos.length === 0 ? (
                <Text fontFamily="body" color="brand.gray">
                    Aucun stylo trouvé pour "{search}"
                </Text>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
                    {filteredStylos.map((stylo) => (
                        <ProductCard key={stylo.id} stylo={stylo} />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    )
}

interface Stylo {
    id: number
    name: string
    category: string
    price: number
    image: string
}

function ProductCard({ stylo }: { stylo: Stylo }) {
    const { addToCart, isLoading } = useCart()
    const { isAuthenticated } = useAuth()

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            alert("Connectez-vous pour ajouter au panier")
            return
        }
        try {
            await addToCart(stylo.id)
            alert(`${stylo.name} ajouté au panier !`)
        } catch (error) {
            alert("Erreur lors de l'ajout au panier")
        }
    }

    return (
        <Box textAlign="center" py={4}>
            <Box p={4} mb={4}>
                <Image
                    src={stylo.image}
                    alt={stylo.name}
                    h="200px"
                    mx="auto"
                    objectFit="contain"
                />
            </Box>
            <Text fontFamily="body" fontSize="sm" fontWeight="medium" mb={2} px={2}>
                {stylo.name}
            </Text>
            <Link to={`/products/${stylo.id}`}>
                <Text fontFamily="body" fontSize="xs" color="brand.gray" mb={4}>
                    Accéder au produit →
                </Text>
            </Link>
            <Button
                variant="outline"
                borderColor="brand.black"
                color="brand.black"
                borderRadius="none"
                size="md"
                fontFamily="body"
                w="80%"
                py={5}
                _hover={{ bg: "blackAlpha.100" }}
                onClick={handleAddToCart}
                disabled={isLoading}
            >
                {isLoading ? "Ajout..." : "Ajouter au panier"}
            </Button>
        </Box>
    )
}

export default Products
