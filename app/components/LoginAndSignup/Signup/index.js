import React from 'react';
import './style.css';
import { very } from '../../utils/very-ajax';

export default React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		let name = this._name.value,
			password = this._password.value,
			repassword = this._repassword.value,
			that = this;

		// 校验参数
		if (name === '') {
			return that.animationOpacity(that._warn1, '请输入用户名');
		}
		if (password === '') {
			return that.animationOpacity(that._warn2, '请输入密码');
		}
		if (repassword === '') {
			return that.animationOpacity(that._warn3, '请再次输入密码');
		}
		if (!(name.length > 0 && name.length <= 10)) {
			return that.animationOpacity(that._warn1, '用户名请限制在1-10个字符');
		}
		if (password < 6) {
			return that.animationOpacity(that._warn2, '密码至少六个字符');
		} 
		if (password !== repassword) {
			return that.animationOpacity(that._warn3, '两次输入密码不一致');
		}

		very.ajax({
			url: '/signup',
			type: 'POST',
			data: {
				name: name,
				password: password,
				repassword: repassword
			},
			dataType: 'json',
			success: function(res) {
				res = JSON.parse(res);
				let code = res.code;
				switch(code) {
					case 200:
						// 跳转至首页
						let protocol = window.location.protocol,
							host = window.location.host;
						window.location.href = protocol + '//' + host;
						break;
					case -1: 
						that.animationOpacity(that._warn1, res.msg);
						break;
				}
			}, 
			fail: function(err) {
				console.error(err)
			}
		})
	},

	handleFocus() {
		clearInterval(this._timer);
		this._warn1.style.display = 'none';	
		this._warn2.style.display = 'none';	
		this._warn3.style.display = 'none';		
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

	render: function() {
		return (
			<div className="r-signup">
				<form>
					<div className='r-signupBox'>
						<input 
							type="text" 
							name="name" 
							placeholder="用户名"
							onFocus={this.handleFocus}
							ref={(c) => this._name = c}/>
						<strong className="r-signup-warn1"
								ref={(c) => this._warn1 = c}>		
						</strong>
					</div>
					<div className='r-signupBox'>
						<input 
							className="r-signup-password" 
							type="password" 
							name="password" 
							placeholder="密码"
							onFocus={this.handleFocus}
							ref={(c) => this._password = c}/>
						<strong className="r-signup-warn2"
								ref={(c) => this._warn2 = c}>		
						</strong>
					</div>
					<div className='r-signupBox'>
						<input 
							className="r-signup-password" 
							type="password" 
							name="repassword" 
							placeholder="重复密码"
							onFocus={this.handleFocus}
							ref={(c) => this._repassword = c} />
						<strong className="r-signup-warn3"
								ref={(c) => this._warn3 = c}>		
						</strong>
					</div>
					<input 
						className="r-signup-btn" 
						type="submit" 
						value="注册者也"
						onClick={this.handleSubmit} />
				</form>
			</div>
		)
	}
})