import { Helmet } from 'react-helmet'
import { gql, useQuery } from '@apollo/client'

import Tags from '../Component/Tags'
const Item = ({ id }) => {
  const EXCHANGE_RATES = gql`
      query MyQuery {
        News_by_pk(id: ${id}) {
          media
          title
          react
          tags
          source
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
      {data.News_by_pk.react.map(({ id, child, text }) => (
        <span key={id}>
          {child && <p>{child[0].text} </p>}
          {text && <p>{text} </p>}
        </span>
      ))}
      източник: {data.News_by_pk.source}
      <hr></hr>
      <h2>Tags</h2>
      <ul>{data.News_by_pk.tags && <Tags tags={data.News_by_pk.tags} />}</ul>
    </>
  )
}

export default Item
