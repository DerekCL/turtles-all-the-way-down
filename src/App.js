import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './grid.js';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';


class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
  }

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  onFailure = (error) => {
    alert(error);
  }

  facebookResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:4000/api/v1/auth/facebook', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.setState({isAuthenticated: true, user, token})
        }
      });
    })
  };

  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.setState({isAuthenticated: true, user, token})
        }
      });
    })
  };


  render() {
       let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <FacebookLogin
                        appId={config.FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} 
                        className='facebookLogInButton' />

                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login with Gmail"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                        className='googleLogInButton'
                    />
                </div>
            );

    return ([
    <div className="App">
      <header className="App-header">
      { content }
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Turtles All the Way Down</h1>
      </header>
      <p className="App-intro">
        Start by clicking on of the square boxes. It's just like Tic-Tac-Toe!
      </p>
      <div name='grid'>
        <Grid/>
      </div>
    </div>,
    <footer>
    </footer>
    ]);
  }
}

export default App;
