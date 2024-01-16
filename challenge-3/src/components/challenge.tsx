// import { Box } from "@chakra-ui/react";

// export interface ChallengeProps {
//   /**
//    * The maximum number of domains the user is allowed to have
//    * in their cart. Invalid domains count toward this limit as well.
//    */
//   maxDomains: number;
// }

// export function Challenge(props: ChallengeProps) {
//   const { maxDomains } = props;

 

// }



// src/components/DomainCart.tsx
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { isDomainAvailable } from '../lib/resources';
import HeroImage from './herocontent';
import Menu from './menu';

interface DomainCartProps {
  numDomainsRequired: number;
}
export type DomainItem = {
  name: string;
  isAvailable: boolean;
};
interface DomainAvailability {
  [domain: string]: boolean;
}
export type DomainName = string;

const DomainCart: React.FC<DomainCartProps> = ({ numDomainsRequired = 12}) => {
    return(
    <div>
      <HeroImage />
    </div>
  )
};

export default DomainCart;