import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
	return (
		<div className="header">
			<div className="header__logo">
				<Link to="/">Employees Viewer</Link>
			</div>
			<div className="header__nav">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/employees">Employees</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
