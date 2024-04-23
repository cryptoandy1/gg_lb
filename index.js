import express from 'express'
import cors from 'cors'
import { parseLB } from './scraper.js'
import { fetchIPLB } from './fetchIp.js'

const app = express()
app.use(cors())

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send(
    'GG/IP leaderboard scraper server is up and running. Use /leaderboard to scrape GG. Use /ipokerLB to fetch IP'
  )
})

app.get('/leaderboard', async (req, res) => {
  const leaderboard = await parseLB()
  res.send({ timestamp: new Date().toString(), leaderboard })
})

app.get('/ipokerLB', async (req, res) => {
  const leaderboard = await fetchIPLB()
  res.send(leaderboard)
})
