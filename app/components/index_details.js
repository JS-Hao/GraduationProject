import React from 'react';
import { render } from 'react-dom';
import Details from './Details/index';
import Header from './Header/index'

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		let button = '';
		if (G.userinfo && G.userinfo.isLogin) {
			button = (<a href="/question/create">我要提问</a>);	
		} else {
			button = (<a href="/signin">提问前先登录</a>);
		}
		return (
			<div className="r-wrap">
				<Header userinfo={G.userinfo} />
				<content className="r-content">
					<Details data={G.question} userinfo={G.userinfo} />
					<div className="r-askBox">
						<p>什么？又遇到BUG了？</p>
						{ button }
					</div>
				</content>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));