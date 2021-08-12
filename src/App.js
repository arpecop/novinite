import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import { gql, useQuery } from '@apollo/client'
import './main.css'

const Row = ({ row }) => {
  if (row.includes('<img')) {
    const regex = /<img.*?src="(.*?)"/
    const src = regex.exec(row)[1]
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={src} alt='' style={{ maxWidth: '100%' }} />
      </div>
    )
  }
  return <p>{row}</p>
}

const Items = ({ page, params }) => {
  console.log(params)
  const EXCHANGE_RATES = gql`
    query MyQuery {
      News(order_by: { id: desc }, limit: 30, offset: ${page * 30 - 30}) {
        id
        media
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
  const pages = Array(Math.round(data.News_aggregate.aggregate.count / 30))
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

function Item () {
  let match = useRouteMatch()
  const { id } = match.params
  const EXCHANGE_RATES = gql`
    query MyQuery {
      News_by_pk(id: ${id}) {
        media
        react
        title
      }
    }
  `
  const { loading, error, data } = useQuery(EXCHANGE_RATES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  //return JSON.stringify(data.News_by_pk.react)
  return data.News_by_pk.react.map(({ id, child }) => (
    <p key={id} href={'/' + id}>
      {child ? child[0].text : ''}
    </p>
  ))
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
