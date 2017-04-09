import React from 'react';
import { render } from 'react-dom';
import Home from './Home/index';
import Header from './Header/index'
import Sort from './Sort/index';
import { very } from './utils/very-ajax';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			list: []
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount(id) {
		let that = this;
		id = id || 0;
		very.ajax({
			url: '/question',
			type: 'GET',
			data: {
				type: id
			},
			dataType: 'json',
			success: function(json) {
				json = JSON.parse(json);
				that.setState({
					list: json.data.list
				});
			},
			fail: function(err) {
				console.error(err);
			}
		})
	}

	render() {
		return (
			<div className="r-wrap">
				<Header userinfo={G.userinfo} />
				<Sort handleEmit={this.componentDidMount} />
				<content className="r-content">
					<Home list={this.state.list} userinfo={G.userinfo} />
				</content>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));