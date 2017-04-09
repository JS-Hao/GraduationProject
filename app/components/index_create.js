import React from 'react';
import { render } from 'react-dom';
import Header from './Header/index';
import Ask from './Ask/index';

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="r-wrap">
				<Header userinfo={G.userinfo} />
				<content className="r-content">
					<Ask isEdit={G.isEdit} question={G.question} />
				</content>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));