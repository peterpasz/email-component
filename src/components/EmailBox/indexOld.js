import React from 'react';

import './index.css';

class EmailBox extends React.Component{
  state = {
    value: '',
    emails: [],
    error: null
  }
    
  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleKeyDown = (evt) => {
    if (['Enter', 'Tab'].includes(evt.key)) {
      evt.preventDefault();
        
      var email = this.state.value.trim();
        
      if (email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: ''
        });
      }
    }
  };

  handleDelete = (toBeRemoved) => {
    this.setState({
      emails: this.state.emails.filter(email => email !== toBeRemoved)
    });
  };

  isValid(email) {
    var error = null;
    
    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }
    
    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }
    
    if (error) {
      this.setState({ error });
      
      return false;
    }
    
    return true;
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  isInList(email) {
    return this.state.emails.includes(email);
  }

  render(){
      return(
        <React.Fragment>

          <div className="email-box">

            {this.state.emails.map(email => (
              <div className="tag-item" key={email}>
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
            
            <input
              className={'input ' + (this.state.error && ' has-error')}
              placeholder="Enter recipients..."
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />

          </div>

          {this.state.error &&
            <p className="error">
              {this.state.error}
            </p>
          }
          
        </React.Fragment>
      );
   }
}

export default EmailBox;