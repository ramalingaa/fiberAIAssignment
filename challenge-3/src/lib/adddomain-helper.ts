import { DomainItem, DomainName } from "@/components/challenge";
import { isValidDomain } from "./validdomain-helper";
import { isDomainAvailable } from "./resources";
import { useToast } from "@chakra-ui/react";
import React from "react";

export const addDomain = async (props: {inputValue: DomainName;
    setInputValue: React.Dispatch<React.SetStateAction<DomainName>>;
    setInputValid: React.Dispatch<React.SetStateAction<boolean>>;
    setDomainErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    toast: ReturnType<typeof useToast>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    domains: Set<DomainItem>;
    setDomains: React.Dispatch<React.SetStateAction<Set<DomainItem>>>;
}): Promise<void> => {
    const  { inputValue, setInputValue, setInputValid, setDomainErrorMessage, toast, setIsLoading, domains, setDomains } = props;
    const userInputDomainName: DomainName = inputValue.trim().toLowerCase();
    if (isValidDomain(userInputDomainName)) {
      setDomainErrorMessage('')
      const domainExists = Array.from(domains).some((domain) => domain.name === userInputDomainName);
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