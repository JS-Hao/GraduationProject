import React from 'react';
import SearchBox from '../SearchBox/index';
import Me from '../Me/index';
import './style.css';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className="r-header">
				<div className="r-header-box">
					<img className="r-header-title" src="/public/img/logo.png" />
					<div className="r-header-searchBox">
						<SearchBox />
					</div>
					<nav className="r-header-nav"><a href="/">首页</a></nav>
					<nav className="r-header-nav r-header-me">
						<Me userinfo={this.props.userinfo} link="/me" />
					</nav>
				</div>
			</header>
		)
	}
}