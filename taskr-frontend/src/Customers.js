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
			iconComponent: <FontAwesomeIcon icon={faBuilding} fixedWidth/>,
			writeable: true
		}
	]
}

export const CustomerEndpoint = "/tracking/customers/"

export function Customers(){

	const endpoint = CustomerEndpoint
	const model = CustomerModel

	return <CRUD endpoint={endpoint} model={model} />
}
