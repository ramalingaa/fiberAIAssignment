import React, { useState } from 'react';
import { Box, Button, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import { DomainItem } from '@/components/challenge';
import { useAppContext } from '../context/appcontext';

// This type definition assumes you have a domain object with name and isAvailable properties

type Domain = string;

type CartProps = {
    domains: Set<DomainItem>;
    setDomains: (domain: Set<DomainItem>) => void;
    removeDomain: (domainName: string) => void;
};
interface DomainRank {
    domain: Domain;
    topLevelDomain: string;
    length: number;
  }
  
  const domainRankingMap: { [key: string]: number } = {
    '.com': 1,
    '.app': 2,
    '.xyz': 3,
    // Add more domain endings with their ranking here
  };
  // Helper function to extract the top-level domain from a domain name
const getTopLevelDomain = (domain: Domain): string => {
    const parts = domain.split('.');
    return `.${parts[parts.length - 1]}`; // Assumes the domain is valid and has at least one '.'
  };
  const keepBestDomains = (domains: Set<DomainItem>, numDomainsRequired: number): Domain[] => {
    console.log
    // Convert domains to an array of objects with domain ranking information
    const rankedDomains: DomainRank[] = [...domains].map(domain => ({
      domain: domain?.name,
      topLevelDomain: getTopLevelDomain(domain?.name),
      length: domain?.name?.length
    }));
  
    // Sort the ranked domains by domain ending and then by length
    rankedDomains.sort((a, b) => {
      // Compare by top-level domain ranking
      const rankA = domainRankingMap[a.topLevelDomain] || Number.MAX_VALUE; // Default to a large number if TLD is unknown
      const rankB = domainRankingMap[b.topLevelDomain] || Number.MAX_VALUE;
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      // If TLD ranks are equal, compare by domain length
      return a.length - b.length;
    });
  
    // Return only the top N domains, mapped back to their string representation
    return rankedDomains.slice(0, numDomainsRequired).map(d => d.domain);
  };
const Cart: React.FC<CartProps> = () => {
    const toast = useToast();
    const { domains, setDomains } = useAppContext();
    function removeDomain(domainName: string): boolean {
        // Create a new Set to avoid direct mutation of the state
        const updatedDomains = new Set(domains);
        // We need to find the domain item with the given domain name.
        for (const item of domains) {
            if (item.name === domainName) {
                updatedDomains.delete(item);
                console.log(updatedDomains);
                setDomains(updatedDomains);
                return true; // Indicates the domain was successfully removed
            }
        }
        return false; // Indicates the domain was not found in the set
    }
    const handleDeleteClick = (domainName: string) => {
        removeDomain(domainName);
        toast({
            title: 'Domain removed.',
            description: `${domainName} has been removed from your cart.`,
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    };
    const handleClearCart = () => {
        setDomains(new Set());
    }
    const handleUnavilable = () => {
        const updatedDomains = new Set(domains);
        for (const item of domains) {
            if (!item.isAvailable) {
                updatedDomains.delete(item);
            }
        }
        setDomains(updatedDomains);
    }
    const handleCopyAllDomains = () => {
        let domainsToCopy = "";
        for (const item of domains) {
            domainsToCopy += domainsToCopy ? " , " + item.name: item.name ;
        }
        navigator.clipboard.writeText(domainsToCopy);
    }
    const handleKeepBestDomains = () => {
        const domainList = [...domains].map((item) => item.name);
       const bestDomainsToKeep = keepBestDomains( domains , 12)
       console.log(bestDomainsToKeep)
        // setDomains(bestDomainsToKeep)
    }
    return (
        <VStack spacing={4} align="stretch">
            <Flex
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    alignItems="center"
                    justifyContent="space-between"
                >
                     <Button
                        colorScheme="red"
                        onClick={ handleClearCart } 
                    >
                        Clear Cart
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={ handleUnavilable } // Update this function to handle Set properly
                    >
                        Remove Unavailable Domains
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={ handleCopyAllDomains } // Update this function to handle Set properly
                    >
                        Copy Domains
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={ handleKeepBestDomains } // Update this function to handle Set properly
                    >
                        Keep Best Domains
                    </Button>
                </Flex>
            
            {[...domains].map((domain) => ( // Convert the Set to an array using the spread operator
                <Flex
                    key={domain.name} // Use the unique domain name as a key for React list rendering
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text mt={1}>{domain.name}</Text>
                    <Text color={domain.isAvailable ? 'green.500' : 'red.500'}>
                        {domain.isAvailable ? 'Available' : 'Unavailable'}
                    </Text>
                    <Button
                        colorScheme="red"
                        onClick={() => { handleDeleteClick(domain.name)}} // Update this function to handle Set properly
                    >
                        Delete
                    </Button>
                </Flex>
            ))}
        </VStack>
    );
};

export default Cart;
