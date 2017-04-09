import React from 'react';
import Content from './Content/index';
import Answer from './Answer/index';
import AnswerEdit from './AnswerEdit/index';
import { very } from '../utils/very-ajax'

export default class Detail extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		}
		this.getAnswerData = this.getAnswerData.bind(this);
	}

	componentDidMount() {
		this.getAnswerData();
	}

	getAnswerData() {
		let that = this;
		very.ajax({
			url: '/question/' + this.props.data.quesId + '/answer',
			type: 'GET',
			dataType: 'json',
			success: function(res) {
				res = JSON.parse(res)
				console.log('获取回答成功', res);
				that.setState({
					data: res.data.answers
				})
			},
			fail: function(err) {
				console.error(err);
			}
		})
	}

	render() {
		let url = '/question/' + this.props.data.quesId + '/answer';
		return (
			<div className="r-details">
				<Content data={this.props.data} />
				<Answer 
					data={this.state.data} 
					id={this.props.data.quesId} 
					handleEmit={this.getAnswerData} 
					userinfo={this.props.userinfo} />
				<AnswerEdit url={url} handleEmit={this.getAnswerData} />
			</div> 
		)
	}
}