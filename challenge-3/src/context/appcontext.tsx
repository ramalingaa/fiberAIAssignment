// contexts/MenuContext.tsx
import { DomainItem } from '@/components/challenge';
import { createContext, useState, useContext } from 'react';
import React from 'react';
// Define the shape of your context state
interface AppContextState {
    domains: Set<DomainItem>; // Replace 'any' with your actual state type
    setDomains: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your actual state type
    numDomainsRequired: number
}

// Create the context with a default value
export const AppContext = createContext<AppContextState | undefined>(undefined);

// Create a custom hook for using this context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a useAppContextProvider');
  }
  return context;
};

// Create a context provider component
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [domains, setDomains] = useState<Set<DomainItem>>(new Set([
        { name: "example.com", isAvailable: false }
      ]));
    const numDomainsRequired = 12
  return (
    <AppContext.Provider value={{ domains, setDomains, numDomainsRequired }}>
      {children}
    </AppContext.Provider>
  );
};