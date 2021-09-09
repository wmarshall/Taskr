import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'

import {request} from './ajax'
import {CustomerModel} from "./Customers"
import {ProjectModel} from "./Projects"
import {TaskModel} from "./Tasks"

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

	const [customers, setCustomers] = useState([{"id": 1, "name": "FooCustomer"}])
	const [projects, setProjects] = useState([{"id": 1, "name": "FooProject", "customer": 1}])
	const [tasks, setTasks] = useState([{"id": 1, "description": "FooTask", "project": 1}])
	const [taskLogs, setTaskLogs] = useState([
			{"id": 1, "task": 1, "logged_by": 1, "duration_minutes": 30},
			{"id": 1, "task": 1, "logged_by": 1, "duration_minutes": 30},
			{"id": 1, "task": 1, "logged_by": 1, "duration_minutes": 30},
			{"id": 1, "task": 1, "logged_by": 1, "duration_minutes": 30},
		])

	return (
		<table className="table tracking-table">
			<thead>
				<tr>
					<th scope="col">
						<nav class="breadcrumb">
							<ul>
								<li>Customer</li>
								<li>Project</li>
								<li>Task</li>
							</ul>
						</nav>
					</th>
					<th colspan={taskLogs.length} scope="col">Task Logs</th>
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
	)
}
