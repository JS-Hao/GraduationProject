import React from 'react'
import Questions from './Questions/index'
import Ask from './Ask/index'
import Tabs from './Tabs/index'

export default React.createClass({
	render() {
		return (
			<div>
				<Ask />
				<Tabs />
			</div>			
		)
	}
})