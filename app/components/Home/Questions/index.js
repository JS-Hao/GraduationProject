import React from 'react';
import { Link } from 'react-router';
import { markdown } from 'markdown';
import './style.css';

export default class QuestionsList extends React.Component {
	constructor(props) {
		super(props);
	}

	numberDealing(num) {
		num = parseInt(num);
		return num > 999 ? num.toString().charAt(0) + 'K' : num;
	}

	getTypeName(id) {
		let arr = [ '全部', 'html', 'css', 
		            'javascript', 'jquery', 'bootstrap', 
		            'node.js', 'angular.js', 'vue.js', 
		            'react.js'];
		return arr[id];
	}

	render() {
		return (
			<ul className='r-questions'>
				{this.props.data.map((ele, index) => {
					return (
						<li 
							key={index}
							className="r-question"
							data-user={ele.author.name}
							data-pid={ele.author._id} >
							<div className="r-question-pv">
								<i>{this.numberDealing(ele.pv)}</i>
								<p>浏览</p>
							</div>
							<div className="r-question-answer">
								<i>{this.numberDealing(ele.answersCount)}</i>
								<p>回答</p>
							</div> 
							<h4 className="r-question-title">
								<div className="r-question-title-info">
									<span>{ele.author.name}</span>
									<span>{ele.created_at}</span>
								</div>
								<div>
									<a href={'/question/' + ele._id} >{ele.title}</a>
									<span className="r-question-title-type">{this.getTypeName(ele.type)}</span>
								</div>
							</h4>
						</li>
					);
				})}
			</ul>
		)
	}
}