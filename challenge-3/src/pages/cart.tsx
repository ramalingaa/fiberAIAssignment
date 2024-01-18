import React, { useState } from 'react';
import {  Button, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import { DomainItem } from '@/components/challenge';
import { useAppContext } from '../context/appcontext';
import {  useRouter } from 'next/router';

// This type definition assumes you have a domain object with name and isAvailable properties

type Domain = string;

type CartProps = {
    domains: Set<DomainItem>;
    setDomains: (domain: Set<DomainItem>) => void;
    removeDomain: (domainName: string) => void;
};
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
// Out of a set of domains, keep the best N domains
const keepBestDomains = (domains: Set<DomainItem>, numDomainsRequired: number) => {
    // Convert domains to an array of objects with domain ranking information
    const rankedDomains = Array.from(domains).map(domain => ({
        name: domain.name,
        isAvailable: domain.isAvailable,
        topLevelDomain: getTopLevelDomain(domain.name),
        length: domain.name?.length
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

    // Return only the top N domains, mapped back to their object representation
    return rankedDomains.slice(0, numDomainsRequired);
};
const Cart: React.FC<CartProps> = () => {
    const toast = useToast();
    const router = useRouter();
    const { domains, setDomains, numDomainsRequired } = useAppContext();
    function removeDomain(domainName: string): boolean {
        // Create a new Set to avoid direct mutation of the state
        const updatedDomains = new Set(domains);
        // We need to find the domain item with the given domain name.
        for (const item of domains) {
            if (item.name === domainName) {
                updatedDomains.delete(item);
                setDomains(updatedDomains);
                return true; // Indicates the domain was successfully removed
            }
        }
        return false; // Indicates the domain was not found in the set
    }
    // remove domain name and Add a toast message when a domain is removed
    const handleDeleteClick = (domainName: string) => {
        if(removeDomain(domainName)) {
            toast({
                title: 'Domain removed.',
                description: `${domainName} has been removed from your cart.`,
                status: 'info',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        } else {
            toast({
                title: 'Domain not found.',
                description: `${domainName} was not found in your cart.`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    };
    // clear cart and set a new state
    const handleClearCart = () => {
        setDomains(new Set());
        toast({
            title: 'Cart cleared Successfully.',
            description: 'All domains have been removed from your cart.',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }
    // filter out domains that are not available for purchase
    const handleRemoveUnavilable = () => {
        const updatedDomains = new Set(domains);
        for (const item of domains) {
            if (!item.isAvailable) {
                updatedDomains.delete(item);
            }
        }
        setDomains(updatedDomains);
        toast({
            title: 'Unavailable domains removed.',
            description: 'All unavailable domains have been removed from your cart.',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }
    // copy all domain names which are in cart to clipboard
    const handleCopyAllDomains = () => {
        let domainsToCopy = "";
        for (const item of domains) {
            domainsToCopy += domainsToCopy ? " , " + item.name : item.name;
        }
        navigator.clipboard.writeText(domainsToCopy);
        toast({
            title: 'Domains Copied.',
            description: 'All domains have been copied to your clipboard.',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }
    // keep best 12 domain names which are in cart 
    const handleKeepBestDomains = () => {
        if(Array.from(domains).length === numDomainsRequired) {
            const bestDomainsToKeep = keepBestDomains(domains, numDomainsRequired)
            setDomains(new Set(bestDomainsToKeep));
            toast({
                title: 'Best Domains kept.',
                description: `Best ${numDomainsRequired} domains have been kept in your cart.`,
                status: 'info',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        } else {
            toast({
                title: 'Not enough domains in cart.',
                description: `Cart must contain at least ${numDomainsRequired} domains.`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        }
    }
    // render cart content based on the state
    const renderCartContent = () => {
        return (
            <>
                <Flex
                p={5}
                shadow="md"
                borderWidth="1px"
                alignItems="center"
                justifyContent="space-between"
            >
                <Button
                    colorScheme="red"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </Button>
                <Button
                    colorScheme="red"
                    onClick={handleRemoveUnavilable} // Update this function to handle Set properly
                >
                    Remove Unavailable Domains
                </Button>
                <Button
                    colorScheme="red"
                    onClick={handleCopyAllDomains} // Update this function to handle Set properly
                >
                    Copy Domains
                </Button>
                <Button
                    colorScheme="red"
                    onClick={handleKeepBestDomains} // Update this function to handle Set properly
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
                        onClick={() => { handleDeleteClick(domain.name) }} // Update this function to handle Set properly
                    >
                        Delete
                    </Button>
                </Flex>
            ))}
            <Button
                colorScheme="blue"
                isDisabled = {(Array.from(domains).length) === numDomainsRequired ? false : true}
                className='align-self'
                title={(Array.from(domains).length) === numDomainsRequired ? '' : `Please add ${numDomainsRequired} domains to checkout`}

            >
                Checkout
            </Button>
            </>
        )
    }
    return (
        <VStack spacing={4} align="stretch" className='width-50' mt={4}>
            {
                Array.from(domains).length > 0 ? renderCartContent() : 
                <Flex  justify='center' alignItems='center' direction="column" className='no-items-cart' gap={4}>
                    <Text fontSize="4xl" fontWeight="semibold">Oh Ohhh You haven't added any domain yet Try adding some to your cart</Text>
                    <Button onClick={() => router.push('/')} colorScheme='blue'>Go Back</Button>
                </Flex>
            }
        </VStack>
    );
};

export default Cart;
