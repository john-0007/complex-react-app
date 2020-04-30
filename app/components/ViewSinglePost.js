import React, { useEffect, useState } from 'react'
import Page from './Page'
import Axios from 'axios'
import ReactMarkDown from 'react-markdown'
import ReactTooltip from 'react-tooltip'
import { useParams, Link } from 'react-router-dom'

import LoadingDotsIcon from './LoadingDotsIcon'

const ViewSinglePost = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [post, setPost] = useState([])
	const { id } = useParams()

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()
		async function fetchPost() {
			try {
				const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token })
				setIsLoading(false)
				setPost(response.data)
			} catch (error) {
				console.log('There was a problem')
			}
		}
		fetchPost()

		return () => {
			ourRequest.cancel()
		}
	}, [])

	if (isLoading)
		return (
			<Page title='...'>
				<LoadingDotsIcon />
			</Page>
		)

	const date = new Date(post.createdDate)
	const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

	return (
		<Page title={post.title}>
			<div className='d-flex justify-content-between'>
				<h2>{post.title}</h2>
				<span className='pt-2'>
					<a href='#' data-tip='Edit' data-for='edit' className='text-primary mr-2' title='Edit'>
						<i className='fas fa-edit'></i>
					</a>
					<ReactTooltip id='edit' className='custom-tooltip' />{' '}
					<a data-tip='Delete' data-for='delete' className='delete-post-button text-danger' title='Delete'>
						<i className='fas fa-trash'></i>
					</a>
					<ReactTooltip id='delete' className='custom-tooltip' />
				</span>
			</div>
			<p className='text-muted small mb-4'>
				<Link to={`/profile/${post.author?.username}`}>
					<img className='avatar-tiny' src={post.author?.avatar} />
				</Link>
				Posted by <Link to={`/profile/${post.author?.username}`}>{post.author?.username}</Link> on {dateFormatted}
			</p>
			<div className='body-content'>
				<ReactMarkDown source={post.body} />
			</div>
		</Page>
	)
}

export default ViewSinglePost
