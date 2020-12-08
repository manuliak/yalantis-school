import React, { useContext } from 'react'
import Context from '../context'

export default function ListItem({ employees, letter }) {
	const { selectedEmployees, updateSelectedEmployees } = useContext(Context)

	const showEmployeeData = (id) => {
		const localSession = JSON.parse(
			localStorage.getItem('selectedEmployees')
		)

		const IDs = localSession ? localSession.IDs : []
		let newSessionData = { IDs: [] }

		if (selectedEmployees.includes(id)) {
			newSessionData.IDs = selectedEmployees.filter((i) => i !== id)
		} else {
			newSessionData.IDs = [...IDs, id]
		}

		localStorage.setItem(
			'selectedEmployees',
			JSON.stringify(newSessionData)
		)
		updateSelectedEmployees()
	}

	return (
		<div className="employees__box">
			<div className="employees__box-header">
				<h2>{letter}</h2>
			</div>
			{employees.length > 0 ? (
				<div className="employees__box-list">
					{employees.map((employee) => {
						return (
							<div className="employees__item" key={employee.id}>
								<input
									type="checkbox"
									id={`employee_${employee.id}`}
									checked={selectedEmployees.includes(
										employee.id
									)}
									onChange={() =>
										showEmployeeData(employee.id)
									}
								/>
								<label
									htmlFor={`employee_${employee.id}`}
								>{`${employee.lastName} ${employee.firstName}`}</label>
							</div>
						)
					})}
				</div>
			) : (
				<div className="employees__box-empty">---</div>
			)}
		</div>
	)
}
