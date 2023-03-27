import { Component } from "react";
import PropTypes from 'prop-types';
import {toast } from 'react-hot-toast';
import { Header, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";


export class Searchbar extends Component {

    state = {
        picture: '',
    }

  handlePicture = (event) => {
    event.preventDefault();

    this.setState({picture: event.currentTarget.value.toLowerCase()})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.picture.trim() === '') {
            toast.error('Please enter the name of the picture for the request');
            return;
        }
        this.props.onSubmit(this.state.picture)
        this.setState({ picture: '' });
    }


    render() {
        return(
        <Header className="searchbar">
            <SearchForm onSubmit={this.handleSubmit} className="form">
            <SearchFormButton type="submit" className="button">
              <span className="button-label">Search</span>
            </SearchFormButton>

            <SearchFormInput
            className="input"
            type="text"
            value={this.state.picture}
            onChange={this.handlePicture}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
      </Header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};