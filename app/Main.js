import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'
import Axios from 'axios'

// My components
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'
import Profile from './components/Profile'

Axios.defaults.baseURL = 'http://localhost:8080'

function Main() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('complexAppToken')),
		flashMessages: [],
		user: {
			token: '',
			username: '',
			avatar: '',
		},
	}

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true
				draft.user = action.data
				return
			case 'logout':
				draft.loggedIn = false
				return
			case 'flashMessage':
				draft.flashMessages.push(action.value)
				return
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState)

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('complexAppToken', state.token)
			localStorage.setItem('complexAppUsername', state.username)
			localStorage.setItem('complexAppAvatar', state.avatar)
		} else {
			localStorage.removeItem('complexAppToken')
			localStorage.removeItem('complexAppUsername')
			localStorage.removeItem('complexAppAvatar')
		}
	}, [state.loggedIn])

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Switch>
						<Route path='/' exact>
							{state.loggedIn ? <Home /> : <HomeGuest />}
						</Route>
						<Route path='/profile/:username' exact>
							<Profile />
						</Route>
						<Route path='/post/:id'>
							<ViewSinglePost />
						</Route>
						<Route path='/create-post' exact>
							<CreatePost />
						</Route>
						<Route path='/about-us'>
							<About />
						</Route>
						<Route path='/terms'>
							<Terms />
						</Route>
					</Switch>
					<Footer />
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

ReactDOM.render(<Main />, document.querySelector('#app'))

if (module.hot) {
	module.hot.accept()
}
