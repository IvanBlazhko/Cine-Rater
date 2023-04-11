import React, { createContext, ReactNode, useState, useEffect } from 'react';

import { ISaveItem } from '../../interfaces/saveItem.interface';

interface IProps {
  children: ReactNode;
}

interface ISaveContext {
  saved?: ISaveItem[];
  addOnSave?: (item: ISaveItem) => void;
  removeOnSave?: (id: string) => void;
}

export const SaveContext = createContext<ISaveContext>({});

const SaveProvider: React.FC<IProps> = ({ children }) => {
  const [saved, setSaved] = useState<ISaveItem[]>([]);

  const addOnSave = (item: ISaveItem) => {
    setSaved(prevState => [...prevState, item]);
  };

  const removeOnSave = (id: string) => {
    setSaved(prevState => prevState.filter(item => item.id !== id));
  };

  useEffect(() => {
    const localStoreItems = localStorage.getItem('saved');

    if (localStoreItems) {
      setSaved(JSON.parse(localStoreItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(saved));
  }, [saved]);

  return (
    <>
      <SaveContext.Provider value={{ saved, addOnSave, removeOnSave }}>
        {children}
      </SaveContext.Provider>
    </>
  );
};

export default SaveProvider;
