import React, { useEffect, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import Page from './Page'
import Axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import StateContext from '../StateContext'

import LoadingDotsIcon from './LoadingDotsIcon'

const ViewSinglePost = () => {
	const appState = useContext(StateContext)

	const originalState = {
		title: {
			value: '',
			hasErrors: false,
			messages: '',
		},
		body: {
			value: '',
			hasErrors: false,
			messages: '',
		},
		isFatching: true,
		isSaving: false,
		id: useParams().id,
		sendCount: 0,
	}

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'fetchComplete':
				draft.title.value = action.value.title
				draft.body.value = action.value.body
				draft.isFatching = false
				return

			case 'titleChange':
				draft.title.value = action.value
				return

			case 'bodyChange':
				draft.body.value = action.value
				return

			case 'submitRequest':
				draft.sendCount++
				return
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, originalState)

	function submitHandler(e) {
		e.preventDefault()
		dispatch({ type: 'submitRequest' })
	}

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()
		async function fetchPost() {
			try {
				const response = await Axios.get(`/post/${state.id}`, { cancelToken: ourRequest.token })
				dispatch({ type: 'fetchComplete', value: response.data })
			} catch (error) {
				console.log('There was a problem')
			}
		}
		fetchPost()

		return () => {
			ourRequest.cancel()
		}
	}, [])

	useEffect(() => {
		if (state.sendCount) {
			const ourRequest = Axios.CancelToken.source()
			async function fetchPost() {
				try {
					const response = await Axios.post(
						`/post/${state.id}/edit`,
						{
							title: state.title.value,
							body: state.body.value,
							token: appState.user.token,
						},
						{ cancelToken: ourRequest.token }
					)
					alert('good')
				} catch (error) {
					console.log('There was a problem')
				}
			}
			fetchPost()

			return () => {
				ourRequest.cancel()
			}
		}
	}, [state.sendCount])

	if (state.isFatching)
		return (
			<Page title='...'>
				<LoadingDotsIcon />
			</Page>
		)

	return (
		<Page title='Edit Post'>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label htmlFor='post-title' className='text-muted mb-1'>
						<small>Title</small>
					</label>
					<input value={state.title.value} onChange={({ target }) => dispatch({ type: 'titleChange', value: target.value })} autoFocus name='title' id='post-title' className='form-control form-control-lg form-control-title' type='text' placeholder='' autoComplete='off' />
				</div>

				<div className='form-group'>
					<label htmlFor='post-body' className='text-muted mb-1 d-block'>
						<small>Body Content</small>
					</label>
					<textarea value={state.body.value} onChange={({ target }) => dispatch({ type: 'bodyChange', value: target.value })} name='body' id='post-body' className='body-content tall-textarea form-control' type='text' />
				</div>
				<button className='btn btn-primary'>Save Update</button>
			</form>
		</Page>
	)
}

export default ViewSinglePost
