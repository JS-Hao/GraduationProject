import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home/index'
import Dedails from './Details/index'
import Me from './Me/index'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		{/*<Route path="/details" component={Dedails} />*/}
		<Route path="/details/:id" component={Dedails} />
		{/*</Route>*/}
		<Route path="/me" component={Me} />
	</Route>
)