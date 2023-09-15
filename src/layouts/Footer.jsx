import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box p="4">
      <Flex justifyContent="center" alignItems="center">
        <Text>&copy; 2023 thinesjaishankar.com/type</Text>
      </Flex>
    </Box>
  )
}

export default Footer