import Cookies from 'js-cookie'

class AJAXError {
	constructor(response, reason) {
		this.response = response
		this.reason = reason
	}
}

export function request(endpoint, body, method="POST"){
	const headers = {
		"X-CSRFToken": Cookies.get('csrftoken'),
	}
	if (method !== "GET" && method !== "HEAD"){
		body = JSON.stringify(body)
		headers["Content-Type"] = "application/json"
	} else {
		body = undefined;
	}
	return fetch(endpoint, {
		method: method,
		headers,
		body
	})
	.then(response => {
		if (!response.ok) {
	      throw new AJAXError(response, 'Network response was not ok');
	    }
		return response.json()
	})
	// .catch(err => console.error(err))

}
