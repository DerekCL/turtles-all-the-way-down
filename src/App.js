import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './grid.js';
// import Login from './Login.js';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';


class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
  }
  // const FACEBOOK_APP_ID = '542387059471156';
  // const FACEBOOK_APP_SECRET = 'c8b6a5869924fc1d3b76ec48ed85f7ea';
  // const GOOGLE_APP_ID = '772441765876-m7btt6vre88q5o057bcjq0rubud3qnaf.apps.googleusercontent.com';
  // const GOOGLE_SECRET_KEY = 'C0C_4ijCD1e8BPk4CRRn5pKW'; 

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
    callback={this.facebookResponse} />
    <GoogleLogin
    clientId={config.GOOGLE_CLIENT_ID}
    buttonText="Login"
    onSuccess={this.googleResponse}
    onFailure={this.onFailure}
    />
    </div>
    );
    return ([
    <div className="App">
    { content }
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to Turtles All the Way Down</h1>
    </header>
    <p className="App-intro">
    </p>
    <div name='grid'>
    <Grid/>
    </div>
    </div>,
    <footer>
    <div>Icons made by <a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div></footer>
    ]);
  }
}

export default App;
