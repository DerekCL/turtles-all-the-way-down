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
		if(this.state.cells[i] === null || this.state.cells[i] === 'null'	) {	
			const cells = this.state.cells.slice();
			cells[i] = this.state.xIsNext ? 'X' : 'O';
			this.setState(
				{
					cells: cells,
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
		let size = ''
		console.log('handleSubmit -->', event.target.name)
		if(event.target.name === 'changeSize') {
			size = this.state.newGridSize || this.state.defaultGridSize
			console.log('in if changeSize')
		} else {
			console.log('in if resetGrid')
			size = 3
		}
		
		if(size !== '') {
			this.setState({
				defaultGridSize: size,
				newGridSize: size,
				cells: Array(size * size).fill(null)
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
				<div className="playerTurn">{status}</div>
				<form className="gridSizeForm">
				<div className='gridSizeFormTitle' >Grid Size: </div>
				<input type='number' placeholder={ 'Current size: ' + this.state.defaultGridSize } onChange={this.handleChange} ></input>
				<input type='submit' name='changeSize' onClick={this.handleSubmit} className='gridSizeFormButtons' ></input>
				<input type='submit' name='resetGrid' value='Reset Grid' onClick={this.handleSubmit} className='gridSizeFormButtons'></input>
				</form>
				{ this.createGrid(this.state.defaultGridSize) }
				</div> 

				)
			}
		}

		export default Grid;







