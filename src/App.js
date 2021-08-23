import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import { gql, useQuery } from '@apollo/client'
import { Helmet } from 'react-helmet'
import './main.css'

const Items = ({ page, params }) => {
  console.log(params)
  const EXCHANGE_RATES = gql`
    query MyQuery {
      News(order_by: { id: desc }, limit: 50, offset: ${page * 50 - 50}) {
        id
        title
      }

      News_aggregate {
        aggregate {
          count
        }
      }
    }
  `
  const { loading, error, data } = useQuery(EXCHANGE_RATES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const pages = Array(Math.round(data.News_aggregate.aggregate.count / 50))
    .fill(0)
    .map((x, i) => ({
      id: i + 1
    }))

  return (
    <>
      {data.News.map(item => (
        <a id={item.id} href={'/' + item.id}>
          {item.title}
          <hr></hr>
        </a>
      ))}
      {pages.map(page => (
        <>
          <a href={'/page/' + page.id}>{page.id}</a>|
        </>
      ))}
    </>
  )
}
const Item = () => {
  let match = useRouteMatch()
  const { id } = match.params
  const EXCHANGE_RATES = gql`
    query MyQuery {
      News_by_pk(id: ${id}) {
        media
        title
        react
      }
    }
  `
  const { loading, error, data } = useQuery(EXCHANGE_RATES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <>
      <Helmet>
        <title>{data.News_by_pk.title}</title>
      </Helmet>
      <h1>{data.News_by_pk.title}</h1>
      <div style={{ textAlign: 'center' }}>
        <img
          src={data.News_by_pk.media}
          alt={data.News_by_pk.title}
          style={{ maxWidth: 300 }}
        />
      </div>
      {data.News_by_pk.react.map(({ id, child }) => (
        <>
          <p key={id} href={'/' + id}>
            {child ? child[0].text : ''}
          </p>
        </>
      ))}
      източник: nova.bg
      <hr></hr>
    </>
  )
}

export default function App () {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path='/page/:id'
            exact
            render={props => <Items page={props.match.params.id} />}
          />

          <Route path='/:id'>
            <Item />
          </Route>
          <Route path='/'>
            <Items page={1} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
