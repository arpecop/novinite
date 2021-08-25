const Item = ({ item }) => (
  <a href={'/' + item.id}>
    {item.title}
    <hr></hr>
  </a>
)
export default Item
