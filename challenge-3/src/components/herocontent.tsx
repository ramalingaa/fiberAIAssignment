import { Box, Flex, Input, Text, useBreakpointValue, VStack, HStack, Button, useToast, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { DomainName } from './challenge';
import { addDomain } from '../lib/adddomain-helper';
import React from 'react';
import { useAppContext } from '../context/appcontext';
/**
/**
 * Component for displaying the hero image and search form.
 */
const HeroImage: React.FC = () => {
  const { domains, setDomains } = useAppContext();

  // Check if the screen size is mobile
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // State variables
  const [inputValue, setInputValue] = useState<DomainName>('');
  const [isInputValid, setInputValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [domainErrorMessage, setDomainErrorMessage] = useState<string>('');

  // Toast notification
  const toast = useToast();

  // Props to be passed to child components
  const props = {
    inputValue,
    setInputValue,
    setInputValid,
    setDomainErrorMessage,
    toast,
    setIsLoading,
    domains,
    setDomains
  };

  /**
   * Handler for the key press event.
   * If the Enter key is pressed, call the addDomain function.
   * @param event - The keyboard event object
   */
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      addDomain(props);
    }
  };

  /**
   * Handler for the input change event.
   * Update the input value state.
   * @param event - The change event object
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };
  // Render the content based on the screen size 
  const renderContent = () => {
    return (
      <>
        {!isMobile && (
          <VStack spacing={4} maxWidth={{ lg: '50%' }}>
            <Box flexBasis={{ lg: '50%' }}>
              <Text fontSize="4xl" fontWeight="bold">
                Unleash Your Online Potential Find and secure the perfect domain name for your vision.
              </Text>
              <HStack mt={4}>
                <Input
                  placeholder="Search"
                  size="lg"
                  value={inputValue}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  isInvalid={!isInputValid}
                />
                <Button onClick={() => addDomain(props)}>Add</Button>
              </HStack>
              {!isInputValid && <Text color="red.500">{domainErrorMessage}</Text>}
            </Box>
          </VStack>
        )}
        {isMobile && (
          <VStack flexBasis={{ base: '100%', lg: '50%' }} mt={4}>
            <Text fontSize="4xl" fontWeight="bold" textAlign="center">
              Unleash Your Online Potential Find and secure the perfect domain name for your vision.
            </Text>
            <Input
              placeholder="Search"
              size="lg"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              isInvalid={!isInputValid}
            />
            {!isInputValid && <Text color="red.500">{domainErrorMessage}</Text>}
            <Button onClick={() => addDomain(props)}>Add</Button>
          </VStack>
        )}
      </>
    );
  };
  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      align="center"
      justify="space-around"
      wrap="nowrap"
      minH="70vh"
      px={8}
      mb={16}
    >
      {isLoading ? (
        // If isLoading is true, display the Spinner
        <Spinner size="xl" />
      ) : (
        // Else, display the content
        renderContent()
      )}
    </Flex>
  );
};


export default HeroImage;