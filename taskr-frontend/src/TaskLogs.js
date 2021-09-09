import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTasks, faStopwatch, faUser} from '@fortawesome/free-solid-svg-icons'

import {CRUD} from './CRUD'

export function TaskLogs(){

	const endpoint = "/tracking/tasklogs/"
	const model = {
		label: "Task Log",
		plural: "Task Logs",
		iconComponent: <FontAwesomeIcon icon={faStopwatch}/>,
		// TODO: wrap title in a span with some auto-ellipsize
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

	return <CRUD endpoint={endpoint} model={model} />
}
