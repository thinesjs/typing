import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
        <Flex
          flex="1"
          p="4"
          maxW="lg"
          mx="auto"
          rounded="lg"
          overflow="hidden"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box layerStyle={colorMode === "light" ? "lightBox" : "darkBox"}  p="4" rounded="lg">
            <Text>
              Thsis is a passage of text in a rounded rectangular box in the middle of the page using Chakra UI and Tailwind CSS for the  theme.
            </Text>
          </Box>

          <Flex mt="4" w="100%" alignItems="center">
              <Input placeholder="Type something..." flex="1" mr="2" />

              <Button size="md">
                Retry
              </Button>
            </Flex>
        </Flex>
  )
}

export default Home