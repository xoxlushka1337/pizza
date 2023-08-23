import React from 'react';

import styles from './Search.module.scss';
import imgSearch from './imgs/search.png';
import imgCross from './imgs/cross.png';
import { AppContext } from '../../App';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  return (
    <div className={styles.root}>
      <img className={styles.iconSearch} src={imgSearch} alt="" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className={styles.iconCross}
          src={imgCross}
          alt=""
        />
      )}
    </div>
  );
};

export default Search;
