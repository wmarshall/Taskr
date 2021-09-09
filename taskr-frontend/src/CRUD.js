import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding} from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'
import {request} from './ajax'

export function CRUD({endpoint, model}){

	const [instances, setInstances] = useState([])
	const [selected, setSelected] = useState({})
	const [pending, setPending] = useState(false)
	const [errors, setErrors] = useState({})


	useEffect(() => {
		if (instances.length === 0) {
			setPending(true)
			request(endpoint, null, "GET")
			.then((instancesResponse) => {
				return setInstances(instancesResponse)
			})
			.finally(() => setPending(false))
		}
	}, [endpoint, instances.length])

	return (
		<>
			<CRUDForm
				selected={selected}
				model={model}
				onChange={(e) => {
					const {name, value} = e.target
					selected[name] = value
					setSelected(selected)
				}}
				setSelected={setSelected}
				pending={pending}
				errors={errors}
				onSubmit={(e) => {
					e.preventDefault();

					const isUpdate = !!selected.id
					const requestMethod = isUpdate ? "PATCH": "POST"

					if (!pending){
						setPending(true)
						request(
							endpoint + (isUpdate ? `${selected.id}/` : ""),
							selected,
							requestMethod
						)
						.then((data) => {
							setInstances([])
							setSelected({})
							setErrors({})
						})
						.catch((err) => {
							return err.response.json().then(setErrors)
						})
						.finally(() => setPending(false))
					}
				}}
			/>
			<InstanceList
				model={model}
				selected={selected}
				setSelected={(c) => {
					setErrors([])
					setSelected(c)
				}}
				instances={instances}
			/>
		</>
	)
}

function InstanceList({model, selected, setSelected, instances}) {
	return (
		<div className="block">
			<h2 className="title">Existing {model.plural}</h2>
			<div className="columns is-multiline">
			{
				instances.map((instance) => {
					const isSelected = selected.id === instance.id;
					return (
						<div
							key={instance.id}
							className="column is-3"
							onClick={
								(e) => {
									e.preventDefault()
									if (isSelected){
										setSelected({})
									} else {
										setSelected(instance)
									}
								}
							}
						>
							<div className="card">
								<div className="card-header">
									<div className="card-header-title">
										{model.makeTitle(instance)}
									</div>
									{model.iconComponent &&
										<div className="card-header-icon">
											<span className={`icon is-small is-left ${isSelected ? "has-text-primary" : null}`}>
												{model.iconComponent}
											</span>
										</div>
									}
								</div>
								<div className="card-content">
									<ul>
										{model.fields.map(({key, label, iconComponent}) =>(
											<li key={key}>
												{iconComponent} {label}: {instance[key]}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)
				})
			}
			</div>
		</div>
	)
}

function CRUDForm({selected, model, onChange, onSubmit, errors, pending}){

	const hasSelected = !!selected.id

	return (
		<>
			<h2 className="title">{hasSelected ? "Edit" : "New"} {model.label}</h2>
			<form
				className="box"
				onSubmit={onSubmit}
			>
				{
					model.fields.map(({key, label, iconComponent}) => (
						<div key={key} className="field">
							<label className="label">{label}</label>
							<div className="control has-icons-left">
								<input
									className={`input ${errors['name'] ? 'is-danger': ""}`}
									type="text"
									placeholder={label}
									name="name"
									value={selected[key] || ""}
									onChange={onChange}
								/>
								{iconComponent && (
									<span className="icon is-small is-left">
										{iconComponent}
									</span>
								)}
								{errors['name'] && (
									<ul>
										{errors['name'].map((error, idx) => <li key={idx}><span className="tag is-danger">{error}</span></li>)}
									</ul>
								)}
							</div>
						</div>
					))
				}
				<div className="field">
					<div className="control">
						<button
							className={`button is-primary ${pending ? "is-loading" : null}`}
							disabled={pending}
						>
						{
							hasSelected ? "Update" : "Create"
						}
						</button>
						{
							hasSelected && (
								<button
									className={`button is-danger ${pending ? "is-loading" : null}`}
									disabled={pending}
								>
								Delete
								</button>
							)
						}
					</div>
				</div>
			</form>
		</>
	)
}
