import React from 'react';
import './style.css';

export default React.createClass({
	render() {
		return (
			<div className="r-search">
				<input 
					placeholder="请输入你想知道的内容" 
					name="search"
					type="text"
					/>
				<button>搜索</button>
			</div>
		)
	}
})