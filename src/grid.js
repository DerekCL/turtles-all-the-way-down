import React, { Component } from 'react';

class Grid extends Component {
	render () {
		const gridSize = 3;
		let grid = []
		const test = () => {
			console.log('working')
		}
		const createMarkup = (size) => {
			let cell = `<span class='cells' ` + `onChange={this.test}` + ` />Hello</span>`;
			let row = '';
			for(let i = 0; i < size; i ++) {
				row += cell;
			}
			return {__html: row}; 
		}
		for(let i = 0; i < gridSize; i++) {
			let row = <div key={i} dangerouslySetInnerHTML = {createMarkup(gridSize)}></div>;
			grid.push(row)
		}

		return (
			<div className="grid">
			{ grid }
			</div>
			)
		}
	}

	export default Grid;
