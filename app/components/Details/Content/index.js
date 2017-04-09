import React from 'react';
import './style.css';
import { markdown } from 'markdown';
import { very } from '../../utils/very-ajax';

export default class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: this.props.data,
			answer: null
		};
	}

	numDealing(num) {
		return num > 999 ? num.toString().charAt(0) + 'K' : num
	}

	escaped(str) {
		return str.replace(/&quot;|&#34;/g, '\"')
				  .replace(/&#39;|&apos;/g, "\'")	
				  .replace(/&amp;|&#38;/g, '&')
				  .replace(/&lt;|&#60;/g, '<')
				  .replace(/&gt;|&#62;/g, '>')
				  .replace(/&nbsp;|&#160;/g, ' ');
	}

	getRawMarkup(content) {
    	return { __html: markdown.toHTML(this.escaped(content)) };
  	}

	render() {
		let question = this.state.question;
		let editHTML = '';

		if (parseInt(question.canEdit)) {
			editHTML = (
				<div className="r-detail-edit">
					<a href={"/question/" + question.quesId.toString() + "/edit"}>编辑</a>
					<a href={"/question/" + question.quesId + "/remove"}>删除</a>
				</div>
			)
		}

		return (
			<div className="r-detailBox">
				<div className="r-detail-title">
					<h3>{question.title}</h3>
					{ editHTML }
				</div>
				<div className="r-detail-content">
					<p className="r-detail-content-header">问题详情</p>
					<p 
						className="r-detail-content-text"
						dangerouslySetInnerHTML={this.getRawMarkup(question.content)} >
					</p>
				</div>
			</div>
		)
	}
}