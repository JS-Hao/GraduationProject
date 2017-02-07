import React from 'react'
import './style.css'

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="r-login">
				<form className="r-login-form" action="/login" method="post">
					<input 
						type="text"
						name="name"
						className="r-login-username"
						placeholder="用户名" />
					<input 
						type="text" 
						name="password"
						className="r-login-password"
						placeholder="密码" />
					<button className="r-login-btn">登录</button>
				</form>
			</div>
		)
	}
}