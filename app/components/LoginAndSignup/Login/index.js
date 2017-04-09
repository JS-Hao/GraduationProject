import React from 'react'
import './style.css'
import {RouteHandler, Link, Route, Router} from 'react-router';
import { very } from '../../utils/very-ajax'

export default React.createClass({
	contextTypes: {
	   	router: React.PropTypes.object
	},

	handleSubmit(event) {
		event.preventDefault();
		let self = this,
			name = this._username.value,
			password = this._password.value;
		if (!name) {
			return self.animationOpacity(self._warn2, '请输入用户名');
		}
		if (!password) {
			return self.animationOpacity(self._warn1, '请输入密码');
		} 

		very.ajax({
			url: '/signin',
			type: 'POST',
			data: {
				username: this._username.value,
				password: this._password.value
			},
			dataType: 'json',
			success: function(res) {
				let code = JSON.parse(res).code;
				if (code === 200) {
					window.location.href = window.location.protocol + '//' + window.location.host; 
				} else if (code === -1) {
					clearInterval(self._timer);
					self.animationOpacity(self._warn1, '邮箱或密码错误！');
				} else if (code === 0) {
					clearInterval(self._timer);
					self.animationOpacity(self._warn2, '用户名不存在');
				}		

			},
			fail: function(err) {
				console.error(err);
			}
		})
	},

	handleFocus() {
		clearInterval(this._timer);
		this._warn1.style.display = 'none';	
		this._warn2.style.display = 'none';		
	},

	animationOpacity(obj, msg) {
		let self = this,
			target = 100;
		// 更新warn中的信息
		obj.innerHTML = msg;
		obj.style.opacity = 0;
		obj.style.filter = 'alpha(opacity=0)';
		obj.style.display = "block";
		obj.style.right = '-20px';
		obj.style.opacity = 0;
		let current = 0;
		let right = -20;
		self._timer = setInterval(function() {
			if (current > target) {
				current = target;
				obj.style.opacity = current / 100;
				obj.style.filter = 'alpha(opacity=' + current + ')';
				obj.style.right = '30px';
				clearInterval(self._timer);

			} else {
				let speed = (target - current) / 10;
				speed = speed <= 1 ? 1 : speed;
				current += speed;
				right += speed * (50/100);
				obj.style.opacity = current / 100;
				obj.style.filter = 'alpha(opacity=' + current + ')';
				obj.style.right = right + 'px';
			}
		}, 1000/60);
	},

	render() {
		return (
			<div className="r-login">
				<form className="r-login-forms" onSubmit={() => false}>
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
						<strong className="r-login-warn1"
								ref={(c) => this._warn1 = c}>		
						</strong>
						<strong className="r-login-warn2"
								ref={(c) => this._warn2 = c}>	
						</strong>
					</div>					
					<button className="r-login-btn" onClick={this.handleSubmit}>登 录</button>
				</form>
			</div>
		)
	}
})