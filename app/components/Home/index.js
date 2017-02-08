import React from 'react'
import Questions from './Questions/index'
import Ask from './Ask/index'

let data = [
	{
		pid: 1,
		timestamp: 234265346,
		answers: 33,
		question: '为什么猫喜欢玩球球？'
	},
	{
		pid: 2,
		timestamp: 2378234572,
		answers: 0,
		question: '如何正确吃饭？'
	}
]

export default React.createClass({
	render() {
		return (
			<div>
				{<Ask />}
				{<Questions data={data}/>}
			</div>			
		)
	}
})