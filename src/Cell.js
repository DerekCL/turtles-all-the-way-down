import React, { Component } from 'react';


class Cell extends Component {
	render () {
		return (
			<button className='cells' onClick={() => {this.props.onClick()}} >{this.props.value || null} </button>
			)
		}

	}

	export default Cell;
