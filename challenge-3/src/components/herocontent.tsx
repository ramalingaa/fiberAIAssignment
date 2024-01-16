import { Box, Flex, Input, Text, useBreakpointValue, VStack, HStack, Button, useToast, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { DomainItem, DomainName } from './challenge';
import { isDomainAvailable } from '@/lib/resources';
import { useAppContext } from '@/context/appcontext';


const isValidDomain = (domain: string): boolean => {
  // This regex checks for a simple domain with a second-level domain and a top-level domain (e.g., example.com).
  // It does not allow for prefixes (like https://) or paths/routes after the top-level domain (like .com/abc).
  const domainRegex: RegExp = /^[a-zA-Z0-9-]+\.(com|xyz|app)$/;

  return domainRegex.test(domain);
};
const HeroImage = () => {
  const { domains, setDomains } = useAppContext();

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [inputValue, setInputValue] = useState<DomainName>('');
  const [isInputValid, setInputValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [domainErrorMessage, setDomainErrorMessage] = useState<string>('');
  const toast = useToast()
  const addDomain = async (): Promise<void> => {
    const userInputDomainName: DomainName = inputValue.trim().toLowerCase();
    console.log(isValidDomain(userInputDomainName))
    if (isValidDomain(userInputDomainName)) {
      setDomainErrorMessage('')
      const domainExists = Array.from(domains).some(domain => domain.name === userInputDomainName);
      if (!domainExists) {
        try {
          setIsLoading(true); // Start loading
          const isDomainAvailableForPurchase = await isDomainAvailable(userInputDomainName);
          const domainItem: DomainItem = { name: userInputDomainName, isAvailable: isDomainAvailableForPurchase };
          setDomains(new Set(domains).add(domainItem));
          setInputValue('');
          toast({
            title: 'Domain added Successfully.',
            description: `${userInputDomainName} has been added to your cart.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          setInputValid(true);
        }
        catch (error) {
          toast({
            title: 'Domain Adding Failed.',
            description: `${userInputDomainName} could not be added to your cart. Please try again`,
            status: 'warning',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        } finally {
          setIsLoading(false); // Stop loading
        }
      } else {
        toast({
          title: 'Domain already exists.',
          description: `${userInputDomainName} already exists in your cart. Try adding another one.`,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }

    } else {
      setInputValid(false);
      if (userInputDomainName) {
        setDomainErrorMessage("Please enter your domain in this format: example.com")
      } else {
        setDomainErrorMessage("Please enter a domain name")
      }
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    console.log("enter")
    if (event.key === 'Enter') {
      addDomain();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value)
    setInputValue(event.target.value);
  }
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
                  <input type = "text" onChange = {handleChange} onKeyDown={handleKeyPress}/>
                  <Button onClick={addDomain}>Add</Button>
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

              <Button onClick={addDomain}>Add</Button>
              
            </VStack>
          )}
        </>
      )}
    </Flex>
  );
};

export default HeroImage;