import React, { useState } from 'react'
import Page from './Page'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

const CreatePost = ({ addFlashMessage }) => {
	const [title, setTitle] = useState()
	const [body, setBody] = useState()
	const [wasSuccessful, setWasSuccessful] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await Axios.post('/create-post', { title, body, token: localStorage.getItem('complexAppToken') })
			console.log('new post created')
			setWasSuccessful(response.data)
		} catch (error) {
			console.log('there was an error')
		}
	}

	if (wasSuccessful) {
		addFlashMessage('Congrate you successfully create a post')
		return <Redirect to={`/post/${wasSuccessful}`} />
	}

	return (
		<Page title='Create New Post'>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='post-title' className='text-muted mb-1'>
						<small>Title</small>
					</label>
					<input onChange={({ target }) => setTitle(target.value)} autoFocus name='title' id='post-title' className='form-control form-control-lg form-control-title' type='text' placeholder='' autoComplete='off' />
				</div>

				<div className='form-group'>
					<label htmlFor='post-body' className='text-muted mb-1 d-block'>
						<small>Body Content</small>
					</label>
					<textarea onChange={({ target }) => setBody(target.value)} name='body' id='post-body' className='body-content tall-textarea form-control' type='text'></textarea>
				</div>

				<button className='btn btn-primary'>Save New Post</button>
			</form>
		</Page>
	)
}

export default CreatePost
