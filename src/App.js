import React, { useState, useEffect } from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Context from './context'

import Header from './components/header'
import Footer from './components/footer'

import HomePage from './pages/HomePage'
import Employees from './pages/Employees'

function App() {
	const [employeesData, setEmployeesData] = useState([])
	const [selectedEmployees, setSelectedEmployees] = useState([])
	const [loadingStatus, setLoadingStatus] = useState(false)

	const updateSelectedEmployees = () => {
		const localSession = JSON.parse(
			localStorage.getItem('selectedEmployees')
		)
		setSelectedEmployees(localSession ? localSession.IDs : [])
	}

	const getEmployeesData = async () => {
		await fetch(
			'https://yalantis-react-school-api.yalantis.com/api/task0/users'
		)
			.then(function (response) {
				if (response.status !== 200) {
					console.log(`Error. Status Code: ${response.status}`)
					return
				}

				// Examine the text in the response
				response.json().then(function (data) {
					setEmployeesData(data)
					setLoadingStatus(true)
					console.log(data)
				})
			})
			.catch(function (err) {
				console.log('Error:', err)
			})
	}

	useEffect(() => {
		getEmployeesData()
		updateSelectedEmployees()
	}, [])

	return (
		<Context.Provider
			value={{
				employeesData,
				selectedEmployees,
				loadingStatus,
				updateSelectedEmployees,
			}}
		>
			<Router>
				<div className="page container">
					<Header />

					<div className="page__content">
						<Switch>
							<Route exact path="/">
								<HomePage />
							</Route>
							<Route path="/employees">
								<Employees />
							</Route>
						</Switch>
					</div>

					<Footer />
				</div>
			</Router>
		</Context.Provider>
	)
}

export default App
