import React from 'react'
import Question from '../Questions/index'
import { very } from '../../utils/very-ajax'
import './style.css'

export default class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex: 0,
			list: []
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.handleClick(null, 0);
	}

	handleClick(e, index) {
		if (e) {
			let that = e.target;
			index = parseInt(that.getAttribute('data-index'));
		}		
		let self = this;
		self.setState({currentIndex: index});
		very.ajax({
			url: '/list',
			type: 'GET',
			data: {
				index: index
			},
			dataType: 'json',
			success: function(json) {
				json = JSON.parse(json);
				self.setState({
					list: json.list
				});
			},
			fail: function(err) {
				console.err(err);
			}
		})
	}

	setLiClassName(index) {
		return index === this.state.currentIndex ? 
						 'r-tabs-li r-is-active' :
						 'r-tabs-li';
	}

	render() {
		return (
			<div className="r-tabs">
				<ul className="r-tabs-ul">
					<li className="r-title">
						全部问题
					</li>
					<li 
						className={this.setLiClassName(0)}
						onClick={this.handleClick}
						data-index='0'>
						最新
					</li>
					<li className={this.setLiClassName(1)}
						onClick={this.handleClick}
						data-index='1'>
						最热
					</li>
					<li className={this.setLiClassName(2)}
						onClick={this.handleClick}
						data-index='2'>
						周
					</li>
					<li className={this.setLiClassName(3)}
						onClick={this.handleClick}
						data-index='3'>
						月
					</li>
				</ul>
				<content className="r-tabs=content">
					<Question data={this.state.list} />
				</content>
			</div>
		)
	}
}