import React from 'react';
import { render } from 'react-dom';
import Login from './Login/index';
import Signup from './Signup/index';
import './style.css'


var LoginAndSignup = React.createClass({
	getInitialState: function() {
		return {
			index: 1
		}
	},
	handleClick: function(e) {
		let index = parseInt(e.target.getAttribute('data-index'));
		this.setState({index: index});
	},

	navClassName: function(index) {
		return this.state.index === index ?  
				'r-LS-btn r-btn-isClick':
				'r-LS-btn';
	},

	contentClassName: function(index) {
		return index === this.state.index ?
				'r-LS-content r-content-isClick': 
				'r-LS-content'
	},

	render: function() {
		return (
			<div className="r-LoginAndSignup">
				<img src="public/img/logo.png" />
				<h4>人不装逼枉少年</h4>
				<div className="r-LS">
					<div className="r-LS-switch clear">
						<nav className={this.navClassName(0)}
							 onClick={this.handleClick}
							 data-index="0">
							注册
						</nav>
						<nav className={this.navClassName(1)}
							 onClick={this.handleClick}
							 data-index="1">
							登录
						</nav>
					</div>
					<content 
						className={this.contentClassName(0)}
						ref={(c) => {this._sContent = c}}>
						<Signup />
					</content>
					<content 
						className={this.contentClassName(1)}
						ref={(c) => {this._lContent = c}}>
						<Login />
					</content>
				</div>
			</div>
		)
	}
});

render((
	<LoginAndSignup />
	), document.getElementById('app')
);
