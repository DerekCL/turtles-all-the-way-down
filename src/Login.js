import React, { Component } from 'react';


class Login extends Component {
	render () {
		return ([
			<a href="/auth/facebook">Sign in with Facebook</a>,
			<br></br>,
			<a href="/auth/github">Sign in with Github</a>
			])
		}

	}

	export default Login;
