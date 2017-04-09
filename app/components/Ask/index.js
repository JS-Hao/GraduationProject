import React from 'react';
import './style.css';
import { markdown } from 'markdown';
import { very } from '../utils/very-ajax';

export default class Ask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.question.title,
			content: this.escaped(this.props.question.content),
			type: 0
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeRadio = this.handleChangeRadio.bind(this);
	}

	escaped(str) {
		// html字符转义
		return str.replace(/&quot;|&#34;/g, '\"')
				  .replace(/&#39;|&apos;/g, "\'")	
				  .replace(/&amp;|&#38;/g, '&')
				  .replace(/&lt;|&#60;/g, '<')
				  .replace(/&gt;|&#62;/g, '>')
				  .replace(/&nbsp;|&#160;/g, ' ');
	}

	handleClick(e) {
		e.preventDefault();

		// 校验参数
		if (!this.state.title) {
			return very.addClass(this._title, 'is-warn');
		}
		if (!this.state.content) {
			return very.addClass(this._content, 'is-warn');
		}

		// 通过isEdit判断是否为编辑 0:新建问题，1:编辑问题
		let url = this.props.isEdit ? 
			'/question/' + this.props.question.quesId + '/edit' :
			'/question/create';

		very.ajax({
			url: url,
			type: 'POST',
			data: {
				title: this.state.title,
				content: this.state.content,
				type: this.state.type
			},
			dataType: 'json',
			success: function(res) {
				res = JSON.parse(res);
				if (res.code === 200) {
					alert('保存成功！');
					console.log(res);
					let protocol = window.location.protocol,
						host = window.location.host,
						quesId = res.data.quesId;
					/*window.location.href = protocol + '//' + host + '/question/' + quesId; */
				} else {
					alert('请先登录！');
				}
			},
			fail: function(err) {
				console.error(err);
			}
		})
	}

	handleFocus(e) {
		very.removeClass(e.target, 'is-warn');
	}

	handleChange(e) {
		var target = e.target;
		if (target.name === 'title') {
			this.setState({title: target.value});
		} else if (target.name === 'content') {
			this.setState({content: target.value});
			clearTimeout(this._timer);
			this.animationBgColor(this._html, 'is-input', 1000);
		}
	}

	getRawMarkup() {
		let content = this.state.content || '您编辑的内容将在这里呈现';
    	return { __html: markdown.toHTML(content) };
  	}

	animationBgColor(node, className, time) {
		className = className || '';
		time = time || 5000;
		// 让该节点的背景变色
		very.addClass(node, className);
		// 设置定时器，时间到后恢复原色
		this._timer = setTimeout(() => {
			very.removeClass(node, className);
		}, time);
	}

	handleChangeRadio(e) {
		let arr = document.getElementById('r-ask-radio').getElementsByTagName('input');
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].checked) {
				console.log(parseInt(arr[i].getAttribute('value')))
				this.setState({
					type: parseInt(arr[i].getAttribute('value'))
				})
				console.log(this.state.type);
				return;
			}

		}
	}

	render() {
		return (
			<div className="r-ask">
				<form>
					<label>请输入您的问题（良好的排版风格更便于阅读）</label>
					<input 
						className="r-ask-title" 
						type="text" 
						name="title" 
						placeholder="标题字数不可超过20个"
						onChange={this.handleChange}
						onFocus={this.handleFocus} 
						defaultValue={this.props.question.title}
						ref={(c) => this._title = c} />
					<div className="r-ask-content fn-clear">
						<textarea 
							className="r-ask-content-md" 
							name="content" 
							placeholder="请使用Markdown编辑您的问题详情" 
							onChange={this.handleChange} 
							onFocus={this.handleFocus}
							defaultValue={this.escaped(this.props.question.content)}
							ref={(c) => this._content = c} />
						<p 
							className="r-ask-content-html"
							ref={(c) => this._html = c}
							dangerouslySetInnerHTML={this.getRawMarkup()} >		
						</p>
					</div>
					<div className="r-ask-radio fn-clear" id="r-ask-radio">
						<p>标签</p>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="0" defaultChecked="checked"/>全部</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="1" />html</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="2" />css</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="3" />javascript</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="4" />jquery</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="5" />bootstrap</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="6" />node.js</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="7" />angular.js</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="8" />vue.js</label>
						<label><input onChange={this.handleChangeRadio} name="type" type="radio" value="9" />react.js</label>
					</div>
					<button 
						className="r-ask-submit"
						onClick={this.handleClick} > 
						发布
					</button>
				</form>
			</div>
		)
	}
}