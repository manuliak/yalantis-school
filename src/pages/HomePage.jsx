import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
	return (
		<div className="home">
			<Link to="/employees" className="home__main-link">
				Go to employees page
			</Link>
		</div>
	)
}
