import React, { useState, useEffect } from "react"
import { Box, Text, Button, Flex, Grid, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const toutesLesGammes = [
    [
        {
            id: 1,
            nom: "NOS STYLOS DE COLLECTION :",
            description: "Une large sélection de nos stylos de collection. Retrouvez des éditions limitées et bien plus.",
            image: "https://external.xx.fbcdn.net/emg1/v/t13/12012815334002359272?url=https%3A%2F%2Fwww.montblanc-boutique-cannes.com%2Fcdn%2Fshop%2Ffiles%2FA_Auguste_Renoir.jpg%3Fv%3D1746546205%26width%3D956&fb_obo=1&utld=montblanc-boutique-cannes.com&stp=c0.5000x0.5000f_dst-emg0_p720x376_q75_tt6&_nc_gid=-1SD0fTi6K7ydJjTnfMGfQ&_nc_oc=AdnHhcpFV7cdSlPfbZYEViO6rQ3VeEN1Bd94HIXpHKpm0FahoocQJBhH9vWwuOJyuT7spSz-ZL3Te9fbxkN_Fdbz&ccb=13-1&oh=06_Q3-8AdqLT48Uo22nNsokb0zaNIPGgk1MM6418siBWnnPAuZa&oe=69A7CD03&_nc_sid=c24604"
        },
        {
            id: 2,
            nom: "NOS STYLOS PLUME :",
            description: "Découvrez nos stylos plumes confectionnés par nos experts.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsJCoXN7J7iA6QY8Gxe8sMf_JbpuojPpxerg&s"
        }
    ],
    [
        {
            id: 3,
            nom: "NOS STYLOS BILLE :",
            description: "Découvrez nos stylos billes, les plus efficaces et polyvalents de tous les stylos.",
            image: "https://img.pikbest.com/wp/202347/do-tasks-fountain-pen-and-3d-task-list-paper-prioritizing-to-s-for-optimal-completion_9746495.jpg!sw800"
        },
        {
            id: 4,
            nom: "NOS FEUTRES FINS :",
            description: "Apportez des détails même les plus fins à vos création à l'aide de notre gamme de feutre fin sur-mesure.",
            image: "https://bollwerk-joailliers.com/wp-content/uploads/2023/08/Stylo-feutre-1-mobile.webp"
        }
    ]
]

const produitsApercu = [
    { id: 1, nom: "Stylo plume Roméo et Juliette", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 2, nom: "Stylo plume Roméo et Juliette", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 3, nom: "Stylo plume Roméo et Juliette", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 4, nom: "Stylo bille Writers Edition", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 5, nom: "Stylo bille Writers Edition", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" },
    { id: 6, nom: "Feutre Fin StarWalker", image: "https://montblanc-boutique-montreal.com/cdn/shop/files/MB132922_OnStand_1080p.png?v=1769999045&width=1080" }
]

function Home() {
    const [gammeIndex, setGammeIndex] = useState(0)
    const { addToCart, isLoading } = useCart()
    const { isAuthenticated } = useAuth()

    const handleAddToCart = async (productId: number, productName: string) => {
        if (!isAuthenticated) {
            alert("Connectez-vous pour ajouter au panier")
            return
        }
        try {
            await addToCart(productId)
            alert(`${productName} ajouté au panier !`)
        } catch (error) {
            alert("Erreur lors de l'ajout au panier")
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setGammeIndex((prev) => (prev + 1) % toutesLesGammes.length)
        }, 3500)
        return () => clearInterval(interval)
    }, [])

    const gammesActuelles = toutesLesGammes[gammeIndex]

    return (
        <Box>
            <Box
                h="100vh"
                w="100%"
                position="relative"
                style={{
                    backgroundImage: "url('https://www.montblanc.com/content/dam/mtb/assets/categories/writing-instruments/all-writing-modes/ballpoint-pen/24-ballpoint-pen_inlay-1920x1280.png.transform.global_image_1366.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <Box position="absolute" inset={0} bg="blackAlpha.400" />

                <Flex
                    position="relative"
                    h="100%"
                    direction="column"
                    justify="center"
                    px={{ base: 8, md: 16 }}
                    maxW="1400px"
                    mx="auto"
                >
                    <Text
                        fontFamily="heading"
                        fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                        color="white"
                        lineHeight="1"
                        mb={4}
                    >
                        DÉCOUVREZ NOS MEILLEURS STYLOS
                    </Text>
                    <Text
                        fontFamily="heading"
                        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                        color="whiteAlpha.800"
                        mb={8}
                    >
                        PARCOUREZ NOS GAMMES PERSONNALISÉES
                    </Text>
                    <Link to="/products">
                        <Button
                            bg="brand.white"
                            color="brand.black"
                            size="lg"
                            borderRadius="none"
                            px={8}
                            fontFamily="body"
                            _hover={{ bg: "brand.beige" }}
                        >
                            Découvrir
                        </Button>
                    </Link>
                </Flex>

                <Box
                    position="absolute"
                    bottom={8}
                    right={8}
                    bg="brand.white"
                    p={4}
                    display={{ base: "none", lg: "block" }}
                    w="220px"
                >
                    <Image
                        src="https://www.forbes.fr/wp-content/uploads/2021/02/960x0-921x580.jpg"
                        alt="Dernière sortie"
                        w="100%"
                        h="120px"
                        objectFit="cover"
                        mb={2}
                    />
                    <Text fontFamily="body" fontSize="sm" color="brand.black">
                        Dernière sortie →
                    </Text>
                </Box>
            </Box>

            <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={0}
                style={{ transition: "opacity 0.5s ease-in-out" }}
            >
                {gammesActuelles.map((cat) => (
                    <Box
                        key={cat.id}
                        h="400px"
                        position="relative"
                        style={{
                            backgroundImage: `url('${cat.image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    >
                        <Box position="absolute" inset={0} bg="blackAlpha.600" />
                        <Flex
                            position="relative"
                            h="100%"
                            direction="column"
                            justify="space-between"
                            p={6}
                        >
                            <Box>
                                <Text fontFamily="heading" fontSize="xl" color="white" mb={2}>
                                    {cat.nom}
                                </Text>
                                <Text fontFamily="body" fontSize="sm" color="whiteAlpha.800" maxW="300px">
                                    {cat.description}
                                </Text>
                            </Box>
                            <Link to="/categories">
                                <Text fontFamily="body" fontSize="sm" color="white">
                                    Découvrir plus →
                                </Text>
                            </Link>
                        </Flex>
                    </Box>
                ))}
            </Grid>

            <Flex justify="center" gap={2} py={4} bg="brand.black">
                {toutesLesGammes.map((_, index) => (
                    <Box
                        key={index}
                        w={3}
                        h={3}
                        borderRadius="full"
                        bg={index === gammeIndex ? "white" : "whiteAlpha.400"}
                        cursor="pointer"
                        onClick={() => setGammeIndex(index)}
                    />
                ))}
            </Flex>

            <Box py={12} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
                <Flex justify="space-between" align="center" mb={8}>
                    <Text fontFamily="heading" fontSize="2xl">
                        DÉCOUVREZ TOUS NOS STYLOS :
                    </Text>
                    <Link to="/products">
                        <Text fontFamily="body" fontSize="sm" color="brand.gray">
                            Afficher tous les stylos →
                        </Text>
                    </Link>
                </Flex>

                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={8}>
                    {produitsApercu.map((produit) => (
                        <Box key={produit.id} textAlign="center">
                            <Box bg="brand.offWhite" p={8} mb={4}>
                                <Image
                                    src={produit.image}
                                    alt={produit.nom}
                                    h="150px"
                                    mx="auto"
                                    objectFit="contain"
                                />
                            </Box>
                            <Text fontFamily="body" fontSize="sm" mb={2}>
                                {produit.nom}
                            </Text>
                            <Link to={`/products/${produit.id}`}>
                                <Text fontFamily="body" fontSize="xs" color="brand.gray" mb={3}>
                                    Accéder au produit →
                                </Text>
                            </Link>
                            <Button
                                variant="outline"
                                borderColor="brand.black"
                                borderRadius="none"
                                size="sm"
                                fontFamily="body"
                                w="100%"
                                onClick={() => handleAddToCart(produit.id, produit.nom)}
                                disabled={isLoading}
                            >
                                {isLoading ? "Ajout..." : "Ajouter au panier"}
                            </Button>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default Home
