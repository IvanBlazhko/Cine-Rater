import React, { ReactNode } from 'react';

import SaveProvider from './saveProvider/saveProvider';

interface IProps {
  children: ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <SaveProvider>{children}</SaveProvider>
    </>
  );
};

export default AppProvider;
