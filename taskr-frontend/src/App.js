
import {useState, useEffect} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import {LoginForm} from "./LoginForm"

import {Customers} from "./Customers"
import {Projects} from "./Projects"
import {Tasks} from "./Tasks"
import {TaskLogs} from "./TaskLogs"

import {request} from './ajax'


function NavBar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item" activeClassName="is-active" style={{fontWeight:"bold"}}>
          Taskr
        </NavLink>
        {/* TODO: burger + expand/collapse here so that the navbar doesn't become invisible on non-gigantic windows */}
      </div>

      <div id="taskrNavbar" className="navbar-menu">
        <div className="navbar-start">

          <NavLink to="/tasklogs" className="navbar-item" activeClassName="is-active">
            Task Logs
          </NavLink>
          <NavLink to="/tasks" className="navbar-item" activeClassName="is-active">
            Tasks
          </NavLink>
          <NavLink to="/projects" className="navbar-item" activeClassName="is-active">
            Projects
          </NavLink>
          <NavLink to="/customers" className="navbar-item" activeClassName="is-active">
            Customers
          </NavLink>

        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <NavLink to="/login" className="button is-primary">
                Log in
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Content() {
  return (
    <div className="container">
      <Switch>
        <Route path="/login">
          <LoginForm/>
        </Route>
        <Route path="/tasklogs">
          <TaskLogs/>
        </Route>
        <Route path="/tasks">
          <Tasks/>
        </Route>
        <Route path="/projects">
          <Projects/>
        </Route>
        <Route path="/customers">
          <Customers/>
        </Route>
      </Switch>
    </div>
  )
}

function App() {

  const [bootstrapData, setBootstrapData] = useState(null)

  useEffect(() => {
    if(bootstrapData === null) {
      request("/tracking/bootstrap", {}, "GET")
      .then((data) => {
        console.log(data)
        setBootstrapData(data)
      })
    }
  })

  return (
    <Router>
      <div className="taskr">
        <NavBar/>
        <Content/>
      </div>
    </Router>
  );
}

export default App;
