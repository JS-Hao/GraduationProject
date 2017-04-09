import React from 'react';
import { render } from 'react-dom';
import Login from './Login/index';
import Signup from './Signup/index';

export default React.createClass({
	render: function() {
		return (
			<div className="LoginAndSignup">
				<h3>者 也</h3>
				<div className="r-L&S">
					<div className="r-L&S-switch">
						<nav className="r-L&S-signup">注册</nav>
						<nav className="r-l&S-login">登录</nav>
					</div>
					<content className="r-L&S-sContent">
						<Signup />
					</content>
					<content className="r-L&S-lContent">
						<Login />
					</content>
				</div>
				<Login />
			</div>
		)
	}
})