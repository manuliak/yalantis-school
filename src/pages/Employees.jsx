import React, { useContext } from 'react'

import Context from '../context'
import alphabet from '../alphabet'
import month from '../month'

import ListItem from '../components/ListItem'

export default function Employees() {
	const { employeesData, selectedEmployees, loadingStatus } = useContext(
		Context
	)

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
				<div className="employees__sidebar">
					{selectedEmployees.length > 0 ? (
						<div className="employees__sidebar-inner">
							{month.map((month, key) => {
								const selectedData = employeesData.filter(
									(e) => {
										const date = new Date(e.dob)
										return (
											selectedEmployees.includes(e.id) &&
											date.toLocaleString('default', {
												month: 'long',
											}) === month
										)
									}
								)

								if (selectedData.length > 0) {
									return (
										<div
											className="employees__sidebar-item"
											key={`month-${key}`}
										>
											<div className="month-statistic">
												<div className="month-statistic__title">
													{month}
												</div>
												<div className="month-statistic__list">
													{selectedData.map(
														(item) => {
															const date = new Date(
																item.dob
															)
															const monthName = date.toLocaleString(
																'default',
																{
																	month:
																		'long',
																}
															)

															const day = date.getDate()
															const year = date.getFullYear()

															return (
																<div
																	className="month-statistic__list-item"
																	key={
																		item.dob
																	}
																>
																	<b>{`${item.lastName} ${item.firstName}`}</b>{' '}
																	-{' '}
																	<i>{`${day} ${monthName}, ${year} year`}</i>
																</div>
															)
														}
													)}
												</div>
											</div>
										</div>
									)
								}
							})}
						</div>
					) : (
						<p className="no-employees-selected">
							No selected employees
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
