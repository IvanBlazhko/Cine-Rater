import React, { useState, useEffect } from 'react';

import { ReactComponent as SearchSvg } from '../../shared/searchIMG/search.svg';
import { ReactComponent as ClearedSvg } from '../../shared/searchIMG/cleared.svg';

interface IProps {
  handleSearch: (text: string) => void;
  search: string;
}

const Search: React.FC<IProps> = ({ handleSearch, search }) => {
  const [searchState, setSearchState] = useState('');

  useEffect(() => {
    if (search.length > 0) setSearchState(search);
  }, [search]);

  const handleCleared = () => {
    handleSearch('');
    setSearchState('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      handleSearch(searchState);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="search movie"
        value={searchState}
        onKeyDown={handleKeyDown}
        onChange={event => setSearchState(event.target.value)}
      />
      {search.length > 0 ? (
        <div className="search__btn" onClick={() => handleCleared()}>
          <ClearedSvg />
        </div>
      ) : (
        <div className="search__btn" onClick={() => handleSearch(searchState)}>
          <SearchSvg />
        </div>
      )}
    </div>
  );
};

export default Search;
