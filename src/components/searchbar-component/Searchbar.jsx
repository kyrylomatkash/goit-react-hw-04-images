// Імпорт бібліотек
import React, { useState } from 'react';
import { Paper, Input, Button } from '@mui/material';
// Основна функція компоненту
const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <Paper
      component="header"
      elevation={3}
      style={{ marginBottom: 16, padding: 16 }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search"
          value={query}
          onChange={handleChange}
          style={{ flexGrow: 1, marginRight: 8 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
    </Paper>
  );
};
// Експорт
export default Searchbar;
