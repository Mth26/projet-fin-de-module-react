import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { RouterProvider } from "react-router-dom"
import { system } from "./theme/index"
import router from "./router"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App