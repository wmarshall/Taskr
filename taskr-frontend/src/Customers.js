import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding} from '@fortawesome/free-solid-svg-icons'

import {CRUD} from './CRUD'

export function Customers(){

	const endpoint = "/tracking/customers/"
	const model = {
		label: "Customer",
		plural: "Customers",
		iconComponent: <FontAwesomeIcon icon={faBuilding}/>,
		makeTitle: ({id, name}) => `${id} - ${name}`,
		fields: [
			{
				key: "name",
				label: "Name",
				iconComponent: <FontAwesomeIcon icon={faBuilding}/>
			}
		]
	}

	return <CRUD endpoint={endpoint} model={model} />
}
