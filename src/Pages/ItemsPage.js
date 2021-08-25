import { gql, useQuery } from '@apollo/client'
import paginate from '../utils/paginate'
import Pagination from '../Component/Pagination'
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
  const totalPages = Math.ceil(data.News_aggregate.aggregate.count / 20)
  const pages = paginate(totalPages, page, 10).slice(0, 10)
  console.log(pages)
  return (
    <>
      <hr />
      {data.News.map(item =>
        item === 0 ? (
          <>...</>
        ) : (
          <a id={item.id} href={'/' + item.id}>
            {item.title}
            <hr />
          </a>
        )
      )}
      <Pagination pages={pages} />
    </>
  )
}
export default Items
