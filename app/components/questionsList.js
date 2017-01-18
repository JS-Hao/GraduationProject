import React from 'react';
import ReactDOM from 'react-dom';


const questionsStyle = {
	margin: '0',
	padding: '0'
}
const questionStyle = {
	height: '55px',
	width: '728px',
	listStyle: 'none',
	cursor: 'pointer',
	borderBottom: '1px solid #e4e6e8'
}
const answerStyle = {
	float: 'left',
    height: '30px',
    width: '59px',
    color: '#6a737c',
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: '30px',
    fontSize: '17px',
    marginTop: '12px',
    marginRight: '10px',
    borderRight: '1px solid rgb(228, 230, 232)'
}
const descStyle = {
	float: 'right',
    margin: '0',
    padding: '0',
    width: '658px',
    height: '100%',
    fontSize: '15px',
    fontWeight: 'normal',
    lineHeight: '55px',
    textAlign: 'left'
}

const aStyle = {
	textDecoration: 'none',
	color: '#005999'
}

class QuestionsList extends React.Component {
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

	render() {
		return (
			<ul className='r-questions' style={questionsStyle}>
				{this.state.data.map((ele, index) => {
					return (
						<li 
							key={index}
							className="r-question"
							data-pid={ele.pid} 
							style={questionStyle} >
							<i className="r-question-answer" style={answerStyle}>
								{ele.answers}
							</i>
							<h4 className="r-question-desc" style={descStyle}>
								<a style={aStyle} href={ele.url ? ele.url : ''}>{ele.question}</a>
							</h4>
						</li>
					);
				})}
			</ul>
		)
	}
}

export {QuestionsList};