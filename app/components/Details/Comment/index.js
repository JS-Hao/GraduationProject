import React from 'react';
import './style.css';
import { very } from '../../utils/very-ajax';

export default class Comment extends React.Component {
	constructor() {
		super();
		this.state = {
			comment: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		let that = this;
		let url = '/question/' + that.props.quesId + '/answer/' + that.props.answerId + '/comment';
		if (that.state.comment === '') {
			alert('内容不能为空！');
		} else {
			that._text.value = '';
			very.ajax({
				url: url,
				type: 'POST',
				data: {
					comment: that.state.comment
				},
				success: function(result) {
					result = JSON.parse(result);
					if (result.code === 200) {
						alert(result.msg);
						that.props.handleEmit();
					} else {
						alert('评论失败！');
						window.location.reload();
					}
				},
				fail: function(err) {
					console.error(err);
				}
			})
		}
	}

	handleChange(e) {
		this.setState({
			comment: e.target.value
		})
	}

	render() {
		return (
			<div className="r-detail-comment">
				<ol className="r-detail-comment-list">
					{this.props.comments.map((ele, index) => {
						return (
							<li key={index} className="fn-clear">
								<a>{ele.author.name}</a>
								<span>{ele.created_at}</span>
								<p>{ele.content}</p>
							</li>
						)
					})}
				</ol>
				<div className="r-detail-comment-edit">
					<textarea
						onChange={this.handleChange}
						ref={(c) => this._text = c } 
						placeholder='评论几句吧~' />
					<button onClick={this.handleClick}>评论</button>
				</div>
			</div>
			
		)
	}
}