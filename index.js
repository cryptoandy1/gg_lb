import express from 'express'
import { parseLB } from './scraper.js'

const app = express()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('GG leaderboard scraper server is up and running')
})

app.get('/leaderboard', async (req, res) => {
  const leaderboard = await parseLB()
  res.send({ timestamp: new Date().toString(), leaderboard })
})
