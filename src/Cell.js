import React, { Component } from 'react';


class Cell extends Component {

// handleClick = (e) => {
// 	// this.props.onClick({value: 'X'})
// 	// console.log('e -->', e, 'this --> ', this)

// 	// let toggle = 'cells'

// 	// // console.log(this.state.count)
// 	// if(this.state.count !== 0) {
// 	// 	//Value X or O has already been set for this cell
// 	// 	return
// 	// }

// 	// if (this.state.class === 'cells' && this.state.count === 0) {
// 	// 	toggle = 'cells toggleX'
// 	// }

// 	// this.setState({
// 	// 	class: toggle,
// 	// 	count: 1
// 	// })
// }
render () {
	return (
		<button className='cells' onClick={() => {this.props.onClick()}} >{this.props.value} </button>
		)
	}

}

export default Cell;
