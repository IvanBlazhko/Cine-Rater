import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  return (
    <div className="loader">
      <ClipLoader size={150} color="#fff" />
    </div>
  );
};

export default Loader;
