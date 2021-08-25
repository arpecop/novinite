import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//pages
import ItemsPage from './Pages/ItemsPage'
import ItemPage from './Pages/ItemPage'
import TagsPage from './Pages/TagsPage'
//container
import Layout from './Layout/Layout'
import './Assets/main.css'

export default function App () {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route
            path='/page/:id'
            exact
            render={props => <ItemsPage page={props.match.params.id} />}
          />
          <Route
            path='/tag/:id'
            exact
            render={props => <TagsPage tag={props.match.params.id} />}
          />
          <Route
            path='/:id'
            exact
            render={props => <ItemPage id={props.match.params.id} />}
          />
          <Route path='/'>
            <ItemsPage page={1} />
          </Route>
        </Switch>
      </Router>
    </Layout>
  )
}
