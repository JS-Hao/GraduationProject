import React from 'react'
import { IndexLink, Link } from 'react-router' 

export default React.createClass({
	render() {
		return (
			<div className="r-wrap">
				<header className="r-header">
					<div className="r-header-box">
						<h1 className="r-header-title">者也</h1>
						<div className="r-header-searchBox"></div>
						<nav className="r-header-nav"><IndexLink to="/" activeClassName="r-active">首页</IndexLink></nav>
						{/*<nav className="r-header-nav"><Link to="/details" activeClassName="r-active">详情</Link></nav>*/}
						<nav className="r-header-nav"><Link to="/me" activeClassName="r-active">我</Link></nav>
						<nav className="r-header-nav"><Link to="/login" activeClassName="r-active">登录</Link></nav>
					</div>
				</header>
				<content className="r-header-content">
					{this.props.children}
				</content>
			</div>
		)
	}
})