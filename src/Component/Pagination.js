const Pagination = ({ pages }) => {
  return (
    <ul>
      {pages.map(item =>
        item === 0 ? (
          <></>
        ) : (
          <li key={item}>
            <a href={'/page/' + item}>{item}</a>
          </li>
        )
      )}
    </ul>
  )
}
export default Pagination
