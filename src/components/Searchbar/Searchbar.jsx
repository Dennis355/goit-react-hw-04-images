import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

import css from 'components/Searchbar/Searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      alert('Please enter a valid search value');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchorm_button}>
          <HiSearch />
          <span className={css.searchorm_button_label}> </span>
        </button>

        <input
          className={css.searchorm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={searchName}
        />
      </form>
    </header>
  );
};

export { SearchBar };
