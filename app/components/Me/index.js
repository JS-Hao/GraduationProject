import React from 'react';
import { very } from '../utils/very-ajax.js';
import './style.css'

export default React.createClass({
	mouseoverHandle(event) {
		very.addClass(event.currentTarget, 'r-me-isMouseover');
	},

	mouseoutHandle(event) {
		very.removeClass(event.currentTarget, 'r-me-isMouseover');
	},

	render() {
		let userinfo = this.props.userinfo,
			username = userinfo.username,
			isLogin = userinfo.isLogin,
			ul = '';
		console.log(this.props.userinfo);
		if (isLogin) {
			ul = (
				<ul>
					<li><a href={this.props.link}>主页</a></li>
					<li><a href="/signout">退出</a></li>
				</ul>
			);
		} else {
			ul = (
				<ul>
					<li><a href="/signin">登录</a></li>
				</ul>
			);
		}
		return (
			<div 
				className="r-me" 
				onMouseOver={this.mouseoverHandle}
				onMouseOut={this.mouseoutHandle}>
				<a>{username ? username : '游客'}</a>
				{ul}
			</div>
		)
		
	}
})