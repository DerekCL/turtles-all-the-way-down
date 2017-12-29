import React, { Component } from 'react';
import Cell from './Cell.js';


class Grid extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cells: Array(9).fill(null),
			xIsNext: true,
			defaultGridSize: 3,
			newGridSize: 3
		}
	}

	handleClick = (i) => {
		console.log('in handle click')

		if(this.state.cells[i].toLowerCase !== 'X' && this.state.cells[i].toLowerCase !== 'O'	) {	
			const cells = this.state.cells.slice();
			cells[i] = this.state.xIsNext ? 'X' : 'O';
			this.setState(
				{cells: cells,
					xIsNext: !this.state.xIsNext
				});
		}
	}

	handleChange = (event) => {
		this.setState({
			newGridSize: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		let action = ''
		console.log('handleSubmit -->', event.target.name)
		if(event.target.name === 'changeSize') {
			action = this.state.newGridSize || this.state.defaultGridSize
			console.log('in if changeSize')
		} else {
			console.log('in if resetGrid')
			action = 3
			// this.setState({
			// 	cells: Array(9).fill(null)
			// })
		}
		
		if(action !== '') {
			this.setState({
				defaultGridSize: action,
				newGridSize: action
			})
		}
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
				<input type='number' placeholder={ 'Current size: ' + this.state.defaultGridSize } onChange={this.handleChange} ></input>
				<input type='submit' name='changeSize' onClick={this.handleSubmit} ></input>
				<input type='submit' name='resetGrid' value='Reset Grid' onClick={this.handleSubmit} ></input>
				</form>
				{ this.createGrid(this.state.defaultGridSize) }
				</div> 

				)
			}
		}

		export default Grid;







