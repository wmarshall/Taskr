import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTasks, faTag} from '@fortawesome/free-solid-svg-icons'

import {CRUD} from './CRUD'


export const TaskModel = {
	label: "Task",
	plural: "Tasks",
	iconComponent: <FontAwesomeIcon icon={faTasks}/>,
	// TODO: wrap title in a span with some auto-ellipsize
	makeTitle: ({id, description}) => `${id} - ${description}`,
	fields: [
		{
			key: "description",
			label: "Description",
			iconComponent: <FontAwesomeIcon icon={faTasks}/>,
			writeable: true
		},
		{
			key: "project",
			label: "Project",
			iconComponent: <FontAwesomeIcon icon={faTag}/>,
			writeable: true
		}
	]
}

export const TaskEndpoint = "/tracking/tasks/"

export function Tasks(){

	const endpoint = TaskEndpoint
	const model = TaskModel

	return <CRUD endpoint={endpoint} model={model}/>
}
