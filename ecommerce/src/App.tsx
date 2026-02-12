import { Box, Button, ChakraProvider } from '@chakra-ui/react'
import { system } from './theme'

function App() {
  // const [count, setCount] = React.useState(0)

  return (
    <ChakraProvider value={system}>
      <Box bg="brand.500">Welcome</Box>
      <Button colorScheme='brand'>Click me</Button>
    </ChakraProvider>

  )
}

export default App
