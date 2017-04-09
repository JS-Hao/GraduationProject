import React from 'react';
import Questions from './Questions/index';
import Tabs from './Tabs/index';

export default React.createClass({
	render() {
		let button = '';
		if (this.props.userinfo && this.props.userinfo.isLogin) {
			button = (<a href="/question/create">我要提问</a>);	
		} else {
			button = (<a href="/signin">提问前先登录</a>);
		}
		return (
			<div>
				<Tabs list={this.props.list} />
				<div className="r-askBox">
					<p>什么？又遇到BUG了？</p>
					{ button }
				</div>			
			</div>			
		)
	}
})