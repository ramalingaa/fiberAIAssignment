import React, { useState } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Text,
  Link,
  IconButton,
  Collapse,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import ShoppingCartIcon from './shoppingcarticon';
import { useAppContext } from '../context/appcontext';
import { useRouter } from 'next/router';


const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { domains, setDomains } = useAppContext();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleCartClick = () => {
    router.push('/cart');
  };
  const displayLinks = useBreakpointValue({ base: 'none', md: 'flex' });

  return (
    <Box p={4} bg="blue.50">
      <Flex alignItems="center">
        {/* Logo on the left */}
        <Text fontSize="xl" fontWeight="bold" color="black">
          Domain_Pool
        </Text>

        {/* Centered Links */}
        <Spacer />
        <Flex justify="center">
          {/* Display Links only on larger screens */}
          <Box display={displayLinks}>
            <Link mx={4} color="black" _hover={{ textDecoration: 'underline' }}>
              Home
            </Link>
            <Link mx={4} color="black" _hover={{ textDecoration: 'underline' }}>
              About
            </Link>
            <Link mx={4} color="black" _hover={{ textDecoration: 'underline' }}>
              Cart
            </Link>
          </Box>
        </Flex>

        {/* Icon on the right */}
        <Spacer />
        <Flex>
          {/* Hamburger icon on small devices */}
          {displayLinks === 'none' && (
            <IconButton
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              size="md"
              variant="ghost"
              color="black"
              onClick={toggleMenu}
              mr={2}
            />
          )}

          {/* Bell icon on larger devices */}
          {displayLinks !== 'none' && (
            <IconButton
              aria-label="Notifications"
              icon={<ShoppingCartIcon />}
              size="md"
              variant="ghost"
              color="black"
              onClick={handleCartClick}
              // Add your notification onClick or other logic here
            />
          )}
        </Flex>
      </Flex>

      {/* Collapsible Links for smaller screens */}
      <Collapse in={isOpen} animateOpacity>
        <Flex direction="column" mt={4}>
          <Link
            color="black"
            _hover={{ textDecoration: 'underline' }}
            mb={2}
          >
            Home
          </Link>
          <Link
            color="black"
            _hover={{ textDecoration: 'underline' }}
            mb={2}
          >
            About
          </Link>
          <Link color="black" _hover={{ textDecoration: 'underline' }}>
            Cart
          </Link>
        </Flex>
      </Collapse>
    </Box>
  );
};

export default Menu;
