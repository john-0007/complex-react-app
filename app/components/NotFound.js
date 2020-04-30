import React from 'react'
import { Link } from 'react-router-dom'
import Page from './Page'

const NotFound = () => {
	return (
		<Page title='Not Found'>
			<div className='text-center'>
				<h2>Whoops, we cannot find that post</h2>
				<p className='lead text-mutes=d'>
					You can always visit the <Link to='/'>homepage</Link> to get a fresh start.
				</p>
			</div>
		</Page>
	)
}

export default NotFound
