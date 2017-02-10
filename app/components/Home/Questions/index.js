import React from 'react';
import { Link } from 'react-router'
import './style.css'

export default class QuestionsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentWillMount() {
		this.setState({
			data: this.props.data
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data
		});
	}

	numberDealing(num) {
		num = parseInt(num);
		return num > 999 ? num.toString().charAt(0) + 'K' : num;
	}

	render() {
		return (
			<ul className='r-questions'>
				{this.state.data.map((ele, index) => {
					return (
						<li 
							key={index}
							className="r-question"
							data-pid={ele.pid} >
							<i className="r-question-answer">
								{this.numberDealing(ele.answers)}
							</i>
							<h4 className="r-question-title">
								<Link to={'/details/' + ele.timestamp} >{ele.question}</Link>
							</h4>
							<h6 className="r-question-desc">
								{ele.desc}
							</h6>
						</li>
					);
				})}
			</ul>
		)
	}
}