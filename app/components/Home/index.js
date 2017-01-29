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
	},
	{
		pid: 3,
		timestamp: 234342342,
		answers: 23454,
		question: '泡男生的正确姿势？'
	},
	{
		pid: 4,
		timestamp: 234342342,
		answers: 7667,
		question: '最舒服的体位是什么'
	}
]

export default React.createClass({
	render() {
		return (
			<div>
				{<Ask />}
				{<Questions data={data}/>}
				}
			</div>
		)
	}
})