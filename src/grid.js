import React, { Component } from 'react';
import Cell from './Cell.js';


class Grid extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cells: Array(9).fill(null),
			xIsNext: true,
			currentGridSize: 3,
			newGridSize: null

		}
	}

	handleClick = (i) => {
		const cells = this.state.cells.slice();
		cells[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState(
			{cells: cells,
				xIsNext: !this.state.xIsNext
			});
	}

	handleChange = (event) => {
		this.setState({
			newGridSize: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({
			currentGridSize: this.state.newGridSize
		})
	}

	renderCell = (i) => {
		return (
			<Cell
			value={this.state.cells[i]}
			onClick={() => this.handleClick(i)}
			/>
			);
		}

		createGrid = (size) => {	
			let grid = []
			let counter = 0;
			for(let i = 0; i < size; i++) {
				let cells = []
				let row = <div className="row"> { cells } </div>	
				for(let j = 0; j < size; j++) {
					cells.push(this.renderCell(counter++))
					if(j === size - 1) {
						grid.push(row)
					}
				}
			}
			return grid
		}

		render () {
			const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');


			return ( 
				<div>
				<div className="status">{status}</div>
				<div className="status">Grid Size: </div>
				<form>
				<input type='number' placeholder={ this.state.currentGridSize } onChange={this.handleChange} ></input>
				<input type='submit' onClick={this.handleSubmit} ></input>
				</form>
				{ this.createGrid(this.state.currentGridSize) }
				</div> 

				)
		}
	}

	export default Grid;







