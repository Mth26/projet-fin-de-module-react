// App.tsx - Composant principal de l'application
import React from "react"
import { ChakraProvider, Box, Text, Button } from "@chakra-ui/react"
import { system } from "./theme/index"

function App() {
  return (
    <ChakraProvider value={system}>
      {/* Test simple pour voir si le thème fonctionne */}
      <Box bg="brand.black" color="brand.white" p={8} textAlign="center">
        <Text fontSize="2xl" fontFamily="heading">
          TEST DU THÈME - TITRE EN BEBAS NEUE
        </Text>
        <Text fontFamily="body" mt={2}>
          Ceci est du texte en Inter
        </Text>
        <Button mt={4} bg="brand.white" color="brand.black">
          Bouton test
        </Button>
      </Box>
    </ChakraProvider>
  )
}

export default App