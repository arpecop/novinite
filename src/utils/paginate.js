const paginate = (totalPages, page, maxLength) => {
  function range (start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start)
  }

  var sideWidth = 1
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1
  var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1
  if (totalPages <= maxLength) {
    // no breaks in list
    return range(1, totalPages)
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    // no break on left of page
    return range(1, maxLength - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    )
  }
  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    // no break on right of page
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    )
  }
  // Breaks on both sides
  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  )
}
export default paginate
