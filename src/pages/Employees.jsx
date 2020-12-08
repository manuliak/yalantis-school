import React, { useContext } from 'react'

import Context from '../context'
import alphabet from '../alphabet'
import month from '../month'

import ListItem from '../components/ListItem'

export default function Employees() {
	const { employeesData, selectedEmployees, loadingStatus } = useContext(
		Context
	)
	console.log(employeesData)

	return (
		<div className="employees">
			<div className="employees__container">
				<div className="employees__main">
					{loadingStatus ? (
						<div>
							{alphabet.map((symbol, key) => {
								const filteredEmployees = employeesData.filter(
									(employee) =>
										employee.lastName
											.charAt(0)
											.toLowerCase() === symbol
								)
								return (
									<ListItem
										key={key}
										employees={filteredEmployees}
										letter={symbol}
									/>
								)
							})}
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>
				<div className="employees__sidebar"></div>
			</div>
		</div>
	)
}
