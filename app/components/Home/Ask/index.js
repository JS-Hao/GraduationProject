import React from 'react'

export default class Ask extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="r-ask">
				<ul className="r-ask-btn"><li>提问</li></ul>
				<div className="r-ask-box">
					<textarea placeholder="请输入你的问题"></textarea>
				</div>
			</div>
		)		
	}
} 