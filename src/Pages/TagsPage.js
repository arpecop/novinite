import { gql, useQuery } from '@apollo/client'
import Item from '../Component/Item'
const TagsPage = ({ tag }) => {
  console.log(tag)
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
  console.log(data)
  return (
    <>
      <h2>{tag}</h2>
      {data.News.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </>
  )
}
export default TagsPage
