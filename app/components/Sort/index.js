import React from 'react';
import './style.css';
export default class Sort extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		let id = parseInt(e.currentTarget.getAttribute('data-id'));
		console.log(239, id);
		this.props.handleEmit(id);
	}

	// 类型: 0:全部 1:html 2:css 3:javascript 4:jquery 5:bootstrap 6:node.js
	//	     7:angular.js 8:vue.js 9:react.js
	render() {
		return (
			<div className="r-sort">
				<ul className="fn-clear">
					<li data-id='0' onClick={this.handleClick}><a>全部</a></li>
					<li data-id='1' onClick={this.handleClick}><a>html</a></li>
					<li data-id='2' onClick={this.handleClick}><a>css</a></li>
					<li data-id='3' onClick={this.handleClick}><a>javascript</a></li>
					<li data-id='4' onClick={this.handleClick}><a>jquery</a></li>
					<li data-id='5' onClick={this.handleClick}><a>bootstrap</a></li>
					<li data-id='6' onClick={this.handleClick}><a>node.js</a></li>
					<li data-id='7' onClick={this.handleClick}><a>angular.js</a></li>
					<li data-id='8' onClick={this.handleClick}><a>vue.js</a></li>
					<li data-id='9' onClick={this.handleClick}><a>react.js</a></li>
				</ul>
			</div>
		)
	}
}