import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTasks, faTag} from '@fortawesome/free-solid-svg-icons'

import {CRUD} from './CRUD'

export function Tasks(){

	const endpoint = "/tracking/tasks/"
	const model = {
		label: "Task",
		plural: "Tasks",
		iconComponent: <FontAwesomeIcon icon={faTasks}/>,
		// TODO: wrap title in a span with some auto-ellipsize
		makeTitle: ({id, description}) => `${id} - ${description}`,
		fields: [
			{
				key: "description",
				label: "Description",
				iconComponent: <FontAwesomeIcon icon={faTasks}/>
			},
			{
				key: "project",
				label: "Project",
				iconComponent: <FontAwesomeIcon icon={faTag}/>
			}
		]
	}

	return <CRUD endpoint={endpoint} model={model} />
}