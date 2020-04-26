import React, { useEffect } from 'react'

const FlashMessages = ({ messages }) => {
	return (
		<div className='floating-alerts'>
			{messages.map((msg, index) => (
				<div key={index} className='alert alert-success text-center floating-alert shadow-md'>
					{msg}
				</div>
			))}
		</div>
	)
}

export default FlashMessages
