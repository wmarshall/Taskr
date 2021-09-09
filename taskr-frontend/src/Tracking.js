import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'

import {request} from './ajax'
import {CustomerModel, CustomerEndpoint} from "./Customers"
import {ProjectModel, ProjectEndpoint} from "./Projects"
import {TaskModel, TaskEndpoint} from "./Tasks"
import {TaskLogEndpoint} from "./TaskLogs"

function Customer({customer, projects, tasks, taskLogs, createTaskLog}) {
	return (
		<>
			<tr className="customer-row">
				<th scope="row">
					{CustomerModel.iconComponent}
					<span>{CustomerModel.makeTitle(customer)}</span>
				</th>
			</tr>
			{projects.map((project) => (
				<Project
					key={project.id}
					project={project}
					tasks={tasks.filter((task) => task.project === project.id)}
					taskLogs={taskLogs}
					createTaskLog={createTaskLog}
				/>
			))}
		</>
	)
}

function Project({project, tasks, taskLogs, createTaskLog}) {
	return (
		<>
			<tr className="project-row">
				<th scope="row">
					{ProjectModel.iconComponent}
					<span>{ProjectModel.makeTitle(project)}</span>
				</th>
			</tr>
			{tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					taskLogs={taskLogs.filter((taskLog) => taskLog.task === task.id)}
					createTaskLog={createTaskLog}
				/>
			))}
		</>
	)
}

function Task({task, taskLogs, createTaskLog}) {
	return (
		<tr className="task-row">
			<th scope="row">
				{TaskModel.iconComponent}
				<span>{TaskModel.makeTitle(task)}</span>
			</th>
			{taskLogs.map((taskLog) => <td className="task-log"key={taskLog.id}>{taskLog.duration_minutes}</td>)}
			<td><AddNewTaskLog task={task} createTaskLog={createTaskLog}/></td>
		</tr>
	)
}

function AddNewTaskLog({task, createTaskLog}) {
	const [showForm, setShowForm] = useState(false)
	const [durationMinutes, setDurationMinutes] = useState(0)

	if (showForm) {
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault()
					createTaskLog(task, durationMinutes).then(() => {
						setShowForm(false)
						setDurationMinutes(0)
					})
				}}
			>
				<div className="field is-grouped">
					<div className="control">
						<input
							className="input is-small"
							name="duration_minutes"
							placeholder="Duration in Minutes"
							type="text"
							value={durationMinutes}
							onChange={(e) => setDurationMinutes(e.target.value)}
						/>
					</div>
					<div className="control">
						<button className="button is-small is-primary">
							Submit
						</button>
					</div>
					<div className="control">
						<button
							className="button is-small is-danger"
							onClick={e => {
								setShowForm(false)
								setDurationMinutes(0)
							}}
						>
							Cancel
						</button>
					</div>

				</div>
			</form>
		)
	} else {
		return <button className="button is-primary is-small" onClick={e => setShowForm(true)}><FontAwesomeIcon  icon={faPlus}/></button>
	}

}

export function Tracking() {

	const [pending, setPending] = useState(false)
	const [customers, setCustomers] = useState([])
	const [projects, setProjects] = useState([])
	const [tasks, setTasks] = useState([])
	const [taskLogs, setTaskLogs] = useState([])

	const createTaskLog = (task, durationMinutes) => {
		if (pending) {
			return Promise.reject()
		}
		setPending(true)
		return request(
			TaskLogEndpoint,
			{"task": task.id, "duration_minutes": durationMinutes},
			"POST"
		)
		.then(() => {
			setCustomers([])
			setProjects([])
			setTasks([])
			setTaskLogs([])
		})
		.catch((e) => console.error(e))
		.finally(() => setPending(false))

	}


	// This is pretty gross, and duplicates code from CRUDS.js
	useEffect(() => {
		if (!pending) {
			const pendingPromises = []
			if (customers.length === 0) {
				pendingPromises.push(
					request(CustomerEndpoint, null, "GET")
					.then((customersResponse) => {
						return setCustomers(customersResponse)
					})
				)
			}
			if (projects.length === 0) {
				pendingPromises.push(
					request(ProjectEndpoint, null, "GET")
					.then((projectResponse) => {
						return setProjects(projectResponse)
					})
				)
			}
			if (tasks.length === 0) {
				pendingPromises.push(
					request(TaskEndpoint, null, "GET")
					.then((tasksResponse) => {
						return setTasks(tasksResponse)
					})
				)
			}
			if (taskLogs.length === 0) {
				pendingPromises.push(
					request(TaskLogEndpoint, null, "GET")
					.then((taskLogResponse) => {
						return setTaskLogs(taskLogResponse)
					})
				)
			}
			if (pendingPromises.length > 0) {
				setPending(true)
				Promise.all(pendingPromises).finally(() => setPending(false))
			}

		}

	}, [pending, customers, projects, tasks, taskLogs])

	return (
		<div className="block">
			<h2 className="title">Log Time</h2>
			<table className="table tracking-table">
				<thead>
					<tr>
						<th scope="col">
							<nav className="breadcrumb">
								<ul>
									<li>Customer</li>
									<li>Project</li>
									<li>Task</li>
								</ul>
							</nav>
						</th>
						<th colSpan={taskLogs.length + 1} scope="col">Task Logs</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customer) => (
						<Customer
							key={customer.id}
							customer={customer}
							projects={projects.filter((project) => project.customer === customer.id)}
							tasks={tasks}
							taskLogs={taskLogs}
							createTaskLog={createTaskLog}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}
