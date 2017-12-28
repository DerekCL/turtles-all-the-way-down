import React, { Component } from 'react';
import Cell from './Cell.js';


class Grid extends Component {

	constructor(props) {
		super(props);
		this.state = { 
		}
	}

	render () {
		const gridSize = 3;
		let grid = []
		
		const createMarkup = (size) => {
			let cell =  <Cell />
			let row = [];
			for(let i = 0; i < size; i ++) {
				row.push(cell);
			}
			return row ; 
		}

		for(let i = 0; i < gridSize; i++) {
			let row = <div key={i}> { createMarkup(gridSize) } </div>;
			grid.push(row)
		}

		return (
		<div className="grid" >
		{ grid }
		</div>
		)
	}
}

export default Grid;
