import React, { Component } from 'react';


class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = { 
		// 	style: {
		// 	backgroundColor: 'lightBlue'
		// }, 
		class: 'cells'
	}
	    // This binding is necessary to make `this` work in the callback
	}
	handleClick = (e) => {
		console.log('works', this)
		let toggle = ''
		if (this.state.class === 'cells off') {
			toggle = 'cells on'
		} else {
			toggle = 'cells off'
		}
		this.setState({
			class: toggle
		})
	}
	render () {
		return (
			<span className={this.state.class} style={this.state.style} onClick={this.handleClick} > </span>
			)
		}

	}

	export default Cell;
