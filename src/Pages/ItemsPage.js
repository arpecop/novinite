import { gql, useQuery } from '@apollo/client'
import Pagination from 'react-js-pagination'
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
export default Items
