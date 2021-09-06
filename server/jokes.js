const request = require('request')
const fetch = require('node-fetch')
const async = require('async')

const insert = (json, callback) => {
  fetch('http://34.242.176.111/v2/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'maximus'
    },
    body: JSON.stringify({
      type: 'insert',
      args: {
        table: { name: 'Jokes', schema: 'public' },
        source: 'DB',
        objects: [
          {
            ...json
          }
        ],
        returning: ['id']
      }
    })
  })
    .then(result => {
      return result.json()
    })
    .then(data => {
      console.log(data)
      callback(data)
    })
}
request.get(
  'https://pouchdb.herokuapp.com/jokes/_all_docs?limit=10000&include_docs=true&skip=60000',
  function (e, x, body) {
    const json = JSON.parse(body)
    async.eachLimit(
      json.rows,
      200,
      function (item, callback) {
        insert(item.doc, function (data) {
          callback()
        })
      },
      function (err) {
        console.log(err)
      }
    )
  }
)
