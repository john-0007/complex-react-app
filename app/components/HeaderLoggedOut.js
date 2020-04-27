import React, { useState, useContext } from 'react'
import Axios from 'axios'
import DispatchContext from '../DispatchContext'

const HeaderLoggedOut = () => {
	const appDispatch = useContext(DispatchContext)
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await Axios.post('/login', { username, password })
			if (response.data) {
				localStorage.setItem('complexAppToken', response.data.token)
				localStorage.setItem('complexAppUsername', response.data.username)
				localStorage.setItem('complexAppAvatar', response.data.avatar)
				appDispatch({ type: 'login' })
			} else {
				console.log('Incorect username or password')
			}
		} catch (error) {
			console.log('there was an error')
		}
	}

	return (
		<form onSubmit={handleSubmit} className='mb-0 pt-2 pt-md-0'>
			<div className='row align-items-center'>
				<div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
					<input onChange={({ target }) => setUsername(target.value)} name='username' className='form-control form-control-sm input-dark' type='text' placeholder='Username' autoComplete='off' />
				</div>
				<div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
					<input onChange={({ target }) => setPassword(target.value)} name='password' className='form-control form-control-sm input-dark' type='password' placeholder='Password' />
				</div>
				<div className='col-md-auto'>
					<button className='btn btn-success btn-sm'>Sign In</button>
				</div>
			</div>
		</form>
	)
}

export default HeaderLoggedOut
