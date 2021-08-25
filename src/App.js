import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import { gql, useQuery } from '@apollo/client'
import { Helmet } from 'react-helmet'

import Pagination from 'react-js-pagination'

import './main.css'

const Tags = ({ tag }) => {
  const EXCHANGE_RATES = gql`
    query MyQuery {
      News(where: { tags: { _has_key: "${tag}" } }) {
        id
        title,
        tags
      }
    }
  `
  const { loading, error, data } = useQuery(EXCHANGE_RATES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <>
      {data.News.map(item => (
        <a id={item.id} href={'/' + item.id}>
          {item.title}
          <hr></hr>
        </a>
      ))}
    </>
  )
}

const Items = ({ page }) => {
  const EXCHANGE_RATES = gql`
    query MyQuery {
      News(order_by: { id: desc }, limit: 20, offset: ${page * 20 - 20}) {
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
  const totalPages = Math.ceil(data.News_aggregate.aggregate.count)

  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={totalPages}
        pageRangeDisplayed={5}
        getPageUrl={page => '/page/' + page}
      />
      <hr />
      {data.News.map(item => (
        <a id={item.id} href={'/' + item.id}>
          {item.title}
          <hr />
        </a>
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
        tags
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
      {data.News_by_pk.react.map(({ id, child, text, attr }) => (
        <span key={id}>
          {child && <p>{child[0].text} </p>}
          {text && <p>{text} </p>}
        </span>
      ))}
      източник: {data.News_by_pk.source}
      <hr></hr>
      <ul>
        {data.News_by_pk.tags &&
          data.News_by_pk.tags
            .filter((v, i, a) => a.findIndex(t => t === v) === i)
            .map(tag => (
              <li id={tag}>
                <a href={'/tag/' + tag}>{tag}</a>
              </li>
            ))}
        {}
      </ul>
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
          <Route
            path='/tag/:id'
            exact
            render={props => <Tags tag={props.match.params.id} />}
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
