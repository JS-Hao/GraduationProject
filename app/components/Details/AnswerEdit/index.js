import React from 'react';
import { very } from '../../utils/very-ajax';
import './style.css';

export default class AnswerEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleFocus() {
		very.addClass(this._edit, 'is-focus');
	}

	handleBlur() {
		very.removeClass(this._edit, 'is-focus');
	}

	handleChange(e) {
		this.setState({
			content: e.target.value
		});
	}

	handleClick() {
		let that = this;

		// 清空编辑框内容
		that._edit.getElementsByTagName('textarea')[0].value = '';
		
		very.ajax({
			url: that.props.url,
			type: 'POST',
			data: {
				content: that.state.content
			},
			success: function(res) {
				res = JSON.parse(res);
				if (res.code === 200) {
					console.log('保存回答成功');
					that.props.handleEmit();
				} else {
					alert(res.msg);
					window.location.reload();
				}
			},
			fail: function(err) {
				console.error(err);
				alert('提交失败!');
				window.location.reload();
			}
		})
	}

	render() {
		return (
			<div className="r-detail-answerEdit" ref={(c) => this._edit = c}>
				<p>我来回答</p>
				<textarea 
					onFocus={this.handleFocus}
					onChange={this.handleChange}
					placeholder="撰写答案" />
				<button 
					onClick={this.handleClick} >
					提交
				</button>
			</div>
		)
	}
}