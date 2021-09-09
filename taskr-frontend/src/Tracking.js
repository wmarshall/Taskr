import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'

import {request} from './ajax'
import {CustomerModel, CustomerEndpoint} from "./Customers"
import {ProjectModel, ProjectEndpoint} from "./Projects"
import {TaskModel, TaskEndpoint} from "./Tasks"
import {TaskLogEndpoint} from "./TaskLogs"

function Customer({customer, projects, tasks, taskLogs}) {
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
				/>
			))}
		</>
	)
}

function Project({project, tasks, taskLogs}) {
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
				/>
			))}
		</>
	)
}

function Task({task, taskLogs}) {
	return (
		<tr className="task-row">
			<th scope="row">
				{TaskModel.iconComponent}
				<span>{TaskModel.makeTitle(task)}</span>
			</th>
			{taskLogs.map((taskLog) => <td key={taskLog.id}>{taskLog.duration_minutes}</td>)}
			<td><FontAwesomeIcon icon={faPlus}/></td>
		</tr>
	)
}

export function Tracking() {

	const [pending, setPending] = useState(false)
	const [customers, setCustomers] = useState([])
	const [projects, setProjects] = useState([])
	const [tasks, setTasks] = useState([])
	const [taskLogs, setTaskLogs] = useState([])


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
						<th colSpan={taskLogs.length} scope="col">Task Logs</th>
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
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}
