import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import DispatchContext from '../DispatchContext'

const HeaderLoggedIn = ({ setLoggedIn }) => {
	const appDispatch = useContext(DispatchContext)
	function handleLoggedOut() {
		localStorage.removeItem('complexAppToken')
		localStorage.removeItem('complexAppUsername')
		localStorage.removeItem('complexAppAvatar')
		appDispatch({ type: 'logout' })
	}
	return (
		<div className='flex-row my-3 my-md-0'>
			<a href='#' className='text-white mr-2 header-search-icon'>
				<i className='fas fa-search'></i>
			</a>
			<span className='mr-2 header-chat-icon text-white'>
				<i className='fas fa-comment'></i>
				<span className='chat-count-badge text-white'> </span>
			</span>
			<a href='#' className='mr-2'>
				<img className='small-header-avatar' src={localStorage.getItem('complexAppAvatar')} />
			</a>
			<Link to='/create-post' className='btn btn-sm btn-success mr-2' href='/create-post'>
				Create Post
			</Link>
			<button onClick={handleLoggedOut} className='btn btn-sm btn-secondary'>
				Sign Out
			</button>
		</div>
	)
}

export default HeaderLoggedIn
