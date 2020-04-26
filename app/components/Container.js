import React, { useEffect } from 'react'

const Container = ({ children, wide }) => {
	console.log(wide)
	return <div className={`container py-md-5 ${wide ? '' : 'container--narrow'}`}>{children}</div>
}

export default Container
