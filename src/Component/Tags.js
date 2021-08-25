const Tags = ({ tags }) => {
  const filteredTags = tags
    .filter((v, i, a) => a.findIndex(t => t === v) === i)
    .map((tag, key) => ({ tag, key }))
  return (
    <ul className='tags'>
      {filteredTags.map(({ tag, key }) => (
        <li key={key} className='tag'>
          <a href={'/tag/' + tag}>{tag}</a>
        </li>
      ))}
    </ul>
  )
}
export default Tags
