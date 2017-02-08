import React from 'react'
import './style.css'
import {RouteHandler, Link, Route, Router} from 'react-router';
import { very } from '../utils/very-ajax'

export default React.createClass({
	contextTypes: {
	   	router: React.PropTypes.object
	},

	handleSubmit(event) {
		let self = this;
		event.preventDefault();
		very.ajax({
			url: '/signin',
			type: 'POST',
			data: {
				username: this._username,
				password: this._password
			},
			dataType: 'json',
			success: function(res) {
				console.log(res);
				let isLogin = JSON.parse(res).isLogin;
				if (isLogin) {
					window.location.href = window.location.protocol + '//' + window.location.host;
					console.log(window.location.host, window.location.href); 
				} else {
					clearInterval(self._timer);
					self._warn.style.opacity = 0;
					self._warn.style.filter = 'alpha(opacity=0)';
					self._warn.style.display = "block";
					self._warn.style.right = '-20px';
					self.animationOpacity(self._warn, 100);
				}			

			},
			fail: function(err) {
				console.err(err);
			}
		})
	},

	handleFocus() {
		clearInterval(this._timer);
		this._warn.style.display = 'none';		
	},

	animationOpacity(obj, target) {
		obj.style.opacity = 0;
		let current = 0;
		let right = -20;
		this._timer = setInterval(function() {
			if (current > target) {
				current = target;
				obj.style.opacity = current / 100;
				obj.style.filter = 'alpha(opacity=' + current + ')';
				obj.style.right = '30px';
				clearInterval(this._timer);
			} else {
				let speed = (target - current) / 10;
				current += speed;
				right += speed * (50/100)
				obj.style.opacity = current / 100;
				obj.style.filter = 'alpha(opacity=' + current + ')';
				obj.style.right = right + 'px';
			}
		}, 1000/60);
	},

	render() {
		console.log(very);
		return (
			<div className="r-login">
				<form className="r-login-forms" onSubmit={() => false}>
					<h3>者 也</h3>
					<div>
						<input 
							type="text"
							name="name"
							className="r-login-username"
							ref={(c) => this._username = c}
							placeholder="用户名"
							onFocus={this.handleFocus} />
					</div>
					<div className="r-login-passwordBox">
						<input 
							type="password" 
							name="password"
							className="r-login-password"
							onFocus={this.handleFocus}
							ref={(c) => this._password = c}
							placeholder="密码" />
						<strong className="r-login-warn"
								ref={(c) => this._warn = c}>
							邮箱或密码错误！
						</strong>
					</div>					
					<button className="r-login-btn" onClick={this.handleSubmit}>登 录</button>
				</form>
			</div>
		)
	}
})