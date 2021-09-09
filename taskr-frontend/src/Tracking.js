import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'

import {request} from './ajax'
import {CustomerModel, CustomerEndpoint} from "./Customers"
import {ProjectModel, ProjectEndpoint} from "./Projects"
import {TaskModel, TaskEndpoint} from "./Tasks"
import {TaskLogEndpoint} from "./TaskLogs"

function Customer({customer, projects, tasks, taskLogs, createTaskLog, finalizeTaskLog}) {
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
					finalizeTaskLog={finalizeTaskLog}
				/>
			))}
		</>
	)
}

function Project({project, tasks, taskLogs, createTaskLog, finalizeTaskLog}) {
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
					finalizeTaskLog={finalizeTaskLog}
				/>
			))}
		</>
	)
}

function Task({task, taskLogs, createTaskLog, finalizeTaskLog}) {

	const completeTaskLogs = taskLogs.filter((taskLog) => taskLog.stop !== null)
	const pendingTaskLogs = taskLogs.filter((taskLog) => taskLog.stop === null)

	if (pendingTaskLogs.length > 1){
		throw Error("Shouldn't have more than 1 pending task log")
	}
	const pendingTaskLog = pendingTaskLogs[0]

	return (
		<tr className="task-row">
			<th scope="row">
				{TaskModel.iconComponent}
				<span>{TaskModel.makeTitle(task)}</span>
			</th>
			<td><PunchClock task={task} pendingTaskLog={pendingTaskLog} createTaskLog={createTaskLog} finalizeTaskLog={finalizeTaskLog}/></td>
			{completeTaskLogs.map((taskLog) => <td className="task-log"key={taskLog.id}>{taskLog.duration_minutes}</td>)}
		</tr>
	)
}


function PunchClock({task, pendingTaskLog, createTaskLog, finalizeTaskLog}){
	if (pendingTaskLog) {
		return (
			<button
				className="button is-danger is-small"
				onClick={(e) => finalizeTaskLog(pendingTaskLog)}
			>
				Punch Out
			</button>
		)
	}
	return (
		<button
			className="button is-primary is-small"
			onClick={(e) => createTaskLog(task)}
		>
			Punch In
		</button>
	)

}

export function Tracking() {

	const [pending, setPending] = useState(false)
	const [customers, setCustomers] = useState([])
	const [projects, setProjects] = useState([])
	const [tasks, setTasks] = useState([])
	const [taskLogs, setTaskLogs] = useState([])

	const createTaskLog = (task) => {
		if (pending) {
			return false
		}
		setPending(true)
		return request(
			TaskLogEndpoint,
			{"task": task.id},
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

	const finalizeTaskLog = (taskLog) => {
		if (pending) {
			return false
		}
		setPending(true)
		return request(
			`${TaskLogEndpoint}${taskLog.id}/stop/`,
			{},
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
						<th scope="col">Punch In/Out</th>
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
							createTaskLog={createTaskLog}
							finalizeTaskLog={finalizeTaskLog}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}
