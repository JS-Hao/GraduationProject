import React from 'react'
import './style.css'

export default class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}

	componentWillMount() {
		console.log(this.props.data)
		this.setState({
			data: this.props.data
		})
	}

	numDealing(num) {
		return num > 999 ? num.toString().charAt(0) + 'K' : num
	}

	render() {
		return (
			<div className="r-detail-content">
				<div className="r-detail-title">
					<h3>{this.state.data.title}</h3>
					<p>{this.state.data.num + '个回答'}</p>
				</div>
				<ul>
					{this.state.data.answer.map((ele, index) => {
						return (
							<li className="r-detail-answer" key={index}>
								<div className="r-detail-answer-left">
									<div className="r-detail-answer-agreeBtnBox">
										<button className="r-detail-answer-agreeBtn"></button>
										{this.numDealing(ele.agree)}
										<button className="r-detail-answer-disaBtn"></button>
									</div>
								</div>
								<div className="r-detail-answer-right">
									<div className="r-detail-answer-content">
										{ele.text}
									</div>
									<div className="r-detail-answer-dazhuBox">
										<img className="r-detail-answer-dazhuPic"></img>
										<p className="r-detail-answer-dazhuName">{ele.name}</p>
										<p className="r-detail-answer-agree">{ele.agree + '人赞同'}</p>
									</div>
								</div>	
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}