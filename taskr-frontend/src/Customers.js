import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding} from '@fortawesome/free-solid-svg-icons'

import {CRUD} from './CRUD'


export const CustomerModel = {
	label: "Customer",
	plural: "Customers",
	iconComponent: <FontAwesomeIcon icon={faBuilding} fixedWidth/>,
	makeTitle: ({id, name}) => `${id} - ${name}`,
	fields: [
		{
			key: "name",
			label: "Name",
			iconComponent: <FontAwesomeIcon icon={faBuilding} fixedWidth/>
		}
	]
}

export function Customers(){

	const endpoint = "/tracking/customers/"
	const model = CustomerModel

	return <CRUD endpoint={endpoint} model={model} />
}
