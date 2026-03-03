import React, { useState } from "react"
import { Box, Text, Flex, Image, Button, Grid } from "@chakra-ui/react"
import { useParams, Link } from "react-router-dom"

// donnees des stylos
const stylosData = [
    {
        id: 1,
        name: "Stylo plume Roméo et Juliette",
        category: "Stylos Plume",
        price: 890,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Ce stylo plume d'exception est inspiré de la célèbre histoire d'amour de Shakespeare. La plume en or 18 carats assure une fluidité parfaite pour une écriture élégante.",
        stock: 15,
        caracteristiques: [
            { label: "Matériau", valeur: "Résine précieuse noire" },
            { label: "Plume", valeur: "Or 18 carats" },
            { label: "Système", valeur: "Remplissage à piston" }
        ]
    },
    {
        id: 2,
        name: "Stylo plume Château de Versailles",
        category: "Stylos de Collection",
        price: 1250,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Édition limitée inspirée des dorures du Château de Versailles. Chaque détail a été pensé pour offrir une expérience d'écriture luxueuse et unique.",
        stock: 5,
        caracteristiques: [
            { label: "Matériau", valeur: "Résine avec finitions dorées" },
            { label: "Plume", valeur: "Or 18 carats" },
            { label: "Édition", valeur: "Limitée à 500 exemplaires" }
        ]
    },
    {
        id: 3,
        name: "Stylo bille Writers Edition Grimm",
        category: "Stylos Bille",
        price: 650,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Hommage aux frères Grimm et à l'univers des contes. Un stylo bille élégant pour une écriture fluide au quotidien.",
        stock: 25,
        caracteristiques: [
            { label: "Matériau", valeur: "Résine noire laquée" },
            { label: "Mécanisme", valeur: "Rotation" },
            { label: "Recharge", valeur: "Internationale" }
        ]
    },
    {
        id: 4,
        name: "Feutre Fin StarWalker PolarGreen",
        category: "Feutres Fins",
        price: 420,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Feutre fin de précision avec pointe ultra-fine. Idéal pour les détails et les signatures élégantes.",
        stock: 30,
        caracteristiques: [
            { label: "Pointe", valeur: "0.4mm ultra-fine" },
            { label: "Encre", valeur: "À base d'eau" },
            { label: "Couleur", valeur: "Vert polaire" }
        ]
    },
    {
        id: 5,
        name: "Stylo plume Meisterstück Gold",
        category: "Stylos Plume",
        price: 980,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Le classique intemporel avec finitions dorées. Un must-have pour les amateurs de belle écriture.",
        stock: 12,
        caracteristiques: [
            { label: "Matériau", valeur: "Résine noire précieuse" },
            { label: "Plume", valeur: "Or 14 carats" },
            { label: "Finitions", valeur: "Plaqué or" }
        ]
    },
    {
        id: 6,
        name: "Stylo bille Montblanc Heritage",
        category: "Stylos Bille",
        price: 550,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Un stylo bille qui allie tradition et modernité. Parfait pour le bureau ou en déplacement.",
        stock: 20,
        caracteristiques: [
            { label: "Matériau", valeur: "Résine rouge bordeaux" },
            { label: "Clip", valeur: "Plaqué platine" },
            { label: "Mécanisme", valeur: "Twist" }
        ]
    },
    {
        id: 7,
        name: "Stylo plume Bohème Bleu",
        category: "Stylos Plume",
        price: 1100,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Design bohème avec pierre précieuse bleue. Une pièce d'art pour collectionneurs.",
        stock: 8,
        caracteristiques: [
            { label: "Pierre", valeur: "Topaze bleue synthétique" },
            { label: "Plume", valeur: "Or 18 carats rétractable" },
            { label: "Capuchon", valeur: "Système twist" }
        ]
    },
    {
        id: 8,
        name: "Feutre Fin Starwalker Midnight",
        category: "Feutres Fins",
        price: 380,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Feutre fin élégant en finition noir midnight. Précision et style au quotidien.",
        stock: 35,
        caracteristiques: [
            { label: "Pointe", valeur: "0.5mm fine" },
            { label: "Corps", valeur: "Métal brossé" },
            { label: "Encre", valeur: "Noir intense" }
        ]
    },
    {
        id: 9,
        name: "Stylo plume Leonardo da Vinci",
        category: "Stylos de Collection",
        price: 1450,
        image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080",
        description: "Édition hommage au génie de la Renaissance. Gravures inspirées des carnets de Léonard.",
        stock: 3,
        caracteristiques: [
            { label: "Gravures", valeur: "Inspirées des croquis de Da Vinci" },
            { label: "Plume", valeur: "Or 18 carats bi-ton" },
            { label: "Édition", valeur: "Limitée à 250 exemplaires" }
        ]
    },
]

function ProductDetail() {
    const { id } = useParams()
    const [addedMessage, setAddedMessage] = useState("")

    const stylo = stylosData.find(s => s.id === Number(id))

    if (!stylo) {
        return (
            <Box pt="120px" textAlign="center" px={4}>
                <Text fontFamily="heading" fontSize="2xl" mb={4}>
                    Stylo introuvable
                </Text>
                <Link to="/products">
                    <Button bg="brand.black" color="brand.white" borderRadius="none">
                        Retour aux stylos
                    </Button>
                </Link>
            </Box>
        )
    }

    const handleAddToCart = () => {
        setAddedMessage("Produit ajouté au panier !")
        setTimeout(() => setAddedMessage(""), 3000)
    }

    return (
        <Box pt="100px" pb={16}>
            <Box maxW="1200px" mx="auto" px={4}>
                {/* Fil d'Ariane */}
                <Text fontFamily="body" fontSize="sm" color="brand.gray" mb={8}>
                    <Link to="/">Accueil</Link> / <Link to="/products">Nos stylos</Link> / {stylo.name}
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
                    {/* Image */}
                    <Box bg="brand.offWhite" p={8} display="flex" alignItems="center" justifyContent="center">
                        <Image
                            src={stylo.image}
                            alt={stylo.name}
                            maxH="500px"
                            objectFit="contain"
                        />
                    </Box>

                    {/* Informations */}
                    <Box>
                        <Text fontFamily="body" fontSize="sm" color="brand.gray" mb={2}>
                            {stylo.category}
                        </Text>
                        <Text fontFamily="heading" fontSize="3xl" mb={4}>
                            {stylo.name.toUpperCase()}
                        </Text>
                        <Text fontFamily="heading" fontSize="2xl" color="brand.accent" mb={6}>
                            {stylo.price} €
                        </Text>
                        <Text fontFamily="body" fontSize="md" color="brand.gray" mb={4} lineHeight="1.8">
                            {stylo.description}
                        </Text>

                        {/* Stock */}
                        <Text fontFamily="body" fontSize="sm" mb={6}>
                            Stock disponible : <strong>{stylo.stock}</strong> unités
                        </Text>

                        {/* Messages */}
                        {addedMessage && (
                            <Box bg="green.100" color="green.700" p={3} mb={4} fontSize="sm">
                                {addedMessage}
                            </Box>
                        )}

                        {/* Boutons */}
                        <Flex gap={4} mb={8}>
                            <Button
                                bg="brand.black"
                                color="brand.white"
                                borderRadius="none"
                                size="lg"
                                px={12}
                                py={6}
                                fontFamily="body"
                                _hover={{ bg: "brand.gray" }}
                                onClick={handleAddToCart}
                            >
                                Ajouter au panier
                            </Button>
                            <Button
                                variant="outline"
                                borderColor="brand.black"
                                borderRadius="none"
                                size="lg"
                                px={6}
                                py={6}
                                fontFamily="body"
                            >
                                ♡
                            </Button>
                        </Flex>

                        {/* Caractéristiques */}
                        <Box borderTop="1px solid" borderColor="brand.beige" pt={6}>
                            <Text fontFamily="heading" fontSize="lg" mb={4}>
                                CARACTÉRISTIQUES
                            </Text>
                            {stylo.caracteristiques.map((carac, index) => (
                                <Flex key={index} justify="space-between" py={2} borderBottom="1px solid" borderColor="brand.beige">
                                    <Text fontFamily="body" fontSize="sm" color="brand.gray">
                                        {carac.label}
                                    </Text>
                                    <Text fontFamily="body" fontSize="sm">
                                        {carac.valeur}
                                    </Text>
                                </Flex>
                            ))}
                            <Flex justify="space-between" py={2} borderBottom="1px solid" borderColor="brand.beige">
                                <Text fontFamily="body" fontSize="sm" color="brand.gray">
                                    Référence
                                </Text>
                                <Text fontFamily="body" fontSize="sm">
                                    #{stylo.id}
                                </Text>
                            </Flex>
                            <Flex justify="space-between" py={2} borderBottom="1px solid" borderColor="brand.beige">
                                <Text fontFamily="body" fontSize="sm" color="brand.gray">
                                    Disponibilité
                                </Text>
                                <Text fontFamily="body" fontSize="sm" color={stylo.stock > 0 ? "green.600" : "red.600"}>
                                    {stylo.stock > 0 ? "En stock" : "Rupture"}
                                </Text>
                            </Flex>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductDetail
