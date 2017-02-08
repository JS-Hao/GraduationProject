import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import router from './components/Router'
import "./public/css/reset.css"
import "./public/css/common.css"

render((
	<Router routes={router} history={browserHistory} />
	), document.getElementById('app')
)