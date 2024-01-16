// contexts/MenuContext.tsx
import { DomainItem } from '@/components/challenge';
import { createContext, useState, useContext } from 'react';
import React from 'react';
// Define the shape of your context state
interface AppContextState {
    domains: Set<DomainItem>; // Replace 'any' with your actual state type
    setDomains: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your actual state type
}

// Create the context with a default value
export const AppContext = createContext<AppContextState | undefined>(undefined);

// Create a custom hook for using this context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuContextProvider');
  }
  return context;
};

// Create a context provider component
export const MenuContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [domains, setDomains] = useState<Set<DomainItem>>(new Set([
        { name: "example.com", isAvailable: false }
      ]));
  return (
    <AppContext.Provider value={{ domains, setDomains }}>
      {children}
    </AppContext.Provider>
  );
};