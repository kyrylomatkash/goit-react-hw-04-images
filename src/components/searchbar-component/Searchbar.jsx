// Імпорт бібліотек
import React, { Component } from 'react';
import { Paper, Input, Button } from '@mui/material';
// Основний клас застосунку
class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.query);
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };
  // Рендер
  render() {
    return (
      <Paper
        component="header"
        elevation={3}
        style={{ marginBottom: 16, padding: 16 }}
      >
        <form
          onSubmit={this.handleSubmit}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search"
            onChange={this.handleChange}
            style={{ flexGrow: 1, marginRight: 8 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>
      </Paper>
    );
  }
}
// Експорт
export default Searchbar;
