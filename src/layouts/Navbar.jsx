import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import {
  Box,
  Flex,
  Image,
  useColorMode,
  IconButton,
  HStack
} from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../index.css';
import logo from '../assets/images/logo-light.png'
import logoDark from '../assets/images/logo-dark.png'
import { FaBeer } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai'


const navigation = [
  { name: 'Home', href: '/'},
  { name: 'Shop', href: '/listing'},
  { name: 'About', href: '/about'},
]


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <Box  p="4">
      <Flex justifyContent="space-between" alignItems="center">
        {/* Centered Logo */}
        <Box >
          <Image src={colorMode === "light" ? logoDark : logo } w="50px" h="50px" mx="auto" ml="5" />
        </Box>

        {/* Dark/Light Mode Switch */}
        <HStack>
          <IconButton
            icon={<AiFillGithub height="20px" />}
            isRound={true}
            onClick={() => openInNewTab("https://github.com/thinesjs/typing")}
            aria-label="github"
            variant="solid"
          />
          <IconButton
            icon={colorMode === "light" ? <MoonIcon height="20px" /> : <SunIcon  height="20px" /> }
            isRound={true}
            onClick={toggleColorMode}
            aria-label="switch theme"
            variant="solid"
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar