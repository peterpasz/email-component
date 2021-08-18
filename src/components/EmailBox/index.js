import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import './index.css';

class EmailBox extends React.Component{
  state = {
    // Current user input in the email input box
    value: '',
    // Array of emails entered by user
    emails: [],
    // Active suggestion in suggestion dropdown
    activeSuggestion: 0,
    // Array of suggestions that contain user input
    filteredSuggestions: [],
    // Flag to determine whether suggestion dropdown is shown
    showSuggestions: false
  }

  // Email List Data
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  // Default Email List
  static defaultProps = {
    suggestions: []
  };
    
  // Event Handlers
  handleChange = (evt) => {
    const { suggestions } = this.props;
    const value = evt.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      value:evt.currentTarget.value,
      value: evt.target.value,
      error: null,
    });
  };
  
  handleKeyDown = (evt) => {
    
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User presses the 'Enter' key while suggestion dropdown is active
    // Selects active suggestion and enters it into input
    if (['Enter'].includes(evt.key) && activeSuggestion !== 0) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        value: filteredSuggestions[activeSuggestion]
      });
    }

    // User presses the 'Enter' or 'Tab' key while suggesstion dropdown is inactive
    // Adds currently entered input to email list
    if (['Enter', 'Tab'].includes(evt.key) && activeSuggestion === 0) {
      evt.preventDefault();
        
      var email = this.state.value.trim();
      
      // If email isn't a duplicate, adds current input to email list
      // If email is duplicate, resets input
      if (email && !this.isInList(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: ''
        });
      }
      else {
        this.setState({
          value: ''
        });
      }
    }

    // User presses the 'ArrowUp' key
    // Moves suggesstion up by one
    else if (['ArrowUp'].includes(evt.key)) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }

    // User presses the 'ArrowDown' key
    // Moves suggestion down by one
    else if (['ArrowDown'].includes(evt.key)) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }

  };

  handleDelete = (toBeRemoved) => {
    // User clicks 'X' button on submitted email
    // Removes email from list
    this.setState({
      emails: this.state.emails.filter(email => email !== toBeRemoved)
    });
  };

  handleClick = (evt) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      value: evt.currentTarget.innerText
    });
  };

  // Checks if input is valid email
  isEmail(email) {
    var error = /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    if(error){
      return true;
    }
    else {
      return false;
    }    
  }

  // Checks if input is a duplicate of existing email
  isInList(email) {
    var error = this.state.emails.includes(email);
    if(error){
      return true;
    }
    else {
      return false;
    }  
  }

  render(){
    const {
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        value
      }
    } = this;

    let autoCompleteComponent;

    // Autocomplete dropdown that renders as the user enters input
    // Data is pulled from mock API call in App.js
    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        autoCompleteComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Apply a class to the currently active suggestion
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={this.handleClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } 
    }

    return(
      <React.Fragment>

        <div className="email-wpr">

          {/* Renders the list of stored emails into a series of tags */}
          {this.state.emails.map((email, index) => (
            <div className={'email-tag' + (this.isEmail(email) ? '' : ' error')} key={email + index}>
              {email}
              
              <button
                type="button"
                className="button"
                onClick={() =>  this.handleDelete(email)}
              >
                &times;
              </button>
            </div>
          ))}
          
          {/* Email Input */}
          <input
            className={'email-input'}
            placeholder="Enter recipients..."
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />

          {/* Autocomplete dropdown */}
          {autoCompleteComponent}

        </div>

      </React.Fragment>
    );
  }
}

export default EmailBox;