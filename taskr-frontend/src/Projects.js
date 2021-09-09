import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTag, faBuilding} from '@fortawesome/free-solid-svg-icons'

import {CRUD} from './CRUD'

export function Projects(){

	const endpoint = "/tracking/projects/"
	const model = {
		label: "Project",
		plural: "Projects",
		iconComponent: <FontAwesomeIcon icon={faTag}/>,
		makeTitle: ({id, name}) => `${id} - ${name}`,
		fields: [
			{
				key: "name",
				label: "Name",
				iconComponent: <FontAwesomeIcon icon={faTag}/>
			},
			{
				key: "customer",
				label: "Customer",
				iconComponent: <FontAwesomeIcon icon={faBuilding}/>
			}
		]
	}

	return <CRUD endpoint={endpoint} model={model} />
}