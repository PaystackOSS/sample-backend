const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios');
const { port, hostname, secretKey } = require('./config')

app.use(bodyParser.json())

const process_request = (req, res, next) => {
  const method = req.method
  const url = `${hostname}${req.url}`

  let headers = {
    authorization: `Bearer ${secretKey}`,
    'content-type': 'application/json'
  }

  if(method === 'POST' || method === 'PUT') {
    return axios({
      method,
      url,
      data: req.body,
      headers
    }).then(function (response) {
      return res.json(response.data)
    }).catch(function (error){
      return res.status(error.response.status).json(error.response.data)
    }); 
  } else {
    return axios({
      method,
      url,
      headers
    }).then(function (response) {
      return res.json(response.data)
    }).catch(function (error){
      return res.status(error.response.status).json(error.response.data)
    });
  }
}

app.get('/', (_, res) => res.status(200).send('Health check OK'))

app.get('/callback', (_, res) => {
  res.status(200).send(`<div>Payment successful!</div>`)
})

app.use(process_request)


app.listen(port, () => console.log(`Server listening on port ${port}!`))