import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import {request} from './ajax'

export function LoginForm(){
	const [pending, setPending] = useState(false)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	return (
		<form
			className="box"
			onSubmit={(e) => {
				e.preventDefault();
				setPending(true)
				request("/tracking/login", {
						username, password
				})
				.then((data) => {
					setPassword("")
					setUsername("")
				})
				.catch(err => console.error(err))
				.finally(() => setPending(false))
			}}
		>
			<div className="field">
				<label className="label">Username</label>
				<div className="control has-icons-left">
					<input
						className="input"
						type="text"
						placeholder="Username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faUser}/>
					</span>
				</div>
			</div>
			<div className="field">
				<label className="label">Password</label>
				<div className="control has-icons-left">
					<input
						className="input"
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span className="icon is-small is-left">
						<FontAwesomeIcon icon={faLock}/>
					</span>
				</div>
			</div>
			<div className="field">
				<div className="control">
					<button className={`button is-primary ${pending ? "is-loading" : null}`} disabled={pending}>Log In</button>
				</div>
			</div>
		</form>
	)
}
