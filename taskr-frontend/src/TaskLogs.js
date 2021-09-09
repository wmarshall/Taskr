import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTasks, faStopwatch, faUser} from '@fortawesome/free-solid-svg-icons'

import {CRUD} from './CRUD'


export const TaskLogModel = {
	label: "Task Log",
	plural: "Task Logs",
	iconComponent: <FontAwesomeIcon icon={faStopwatch}/>,
	makeTitle: ({id, task, logged_by}) => `${id} - ${task} - ${logged_by}`,
	fields: [
		{
			key: "task",
			label: "Task",
			iconComponent: <FontAwesomeIcon icon={faTasks}/>
		},
		{
			key: "logged_by",
			label: "Logged By",
			iconComponent: <FontAwesomeIcon icon={faUser}/>
		},
		{
			key: "duration_minutes",
			label: "Minutes Logged",
			iconComponent: <FontAwesomeIcon icon={faStopwatch}/>
		},
	]
}

export const TaskLogEndpoint = "/tracking/tasklogs/"

export function TaskLogs(){

	const endpoint = TaskLogEndpoint
	const model = TaskLogModel

	return <CRUD endpoint={endpoint} model={model} />
}
