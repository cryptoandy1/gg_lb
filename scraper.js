import puppeteer from 'puppeteer'
import 'dotenv/config'

const parseLB = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--single-process',
      '--no-zygote',
    ],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  })

  try {
    // const ipPage = await browser.newPage()
    // await ipPage.goto('https://api.ipify.org')
    // await ipPage.waitForSelector('body > pre')
    // const ipElement = await ipPage.waitForSelector('body > pre') // select the element
    // const ip = await ipElement.evaluate((el) => el.textContent)
    // console.log(ip)

    // Navigate the page to the URL
    const page = await browser.newPage()
    await page.goto(
      'https://pml.good-game-network.com/pm-leaderboard/group?groupId=841&lang=en&timezone=UTC-8'
    )
    // Wait for the list items to be available
    await page.waitForSelector('.dropdown-layer li')

    // Click on the second list item
    await page.evaluate(() => {
      const hundreds = document.querySelectorAll('.dropdown-layer li')[1]
      hundreds.click()
      hundreds.click()
    })

    await page.waitForSelector('.ng-star-inserted > .prize', {
      visible: true,
    })
    // await sleep(2000)
    const result = Object.fromEntries(
      await page.$$eval('tr.ng-star-inserted', (rows) => {
        return Array.from(rows, (row) => {
          const pointsArr = []
          const columns = row.querySelectorAll('td')
          const colsArray = Array.from(columns, (column) => column.innerText)
          pointsArr.push(colsArray[1])
          pointsArr.push(Number(colsArray[3].replace(',', '')))
          return pointsArr
        })
      })
    )
    return result
  } catch (error) {
    return `Error while scrapping leaderboard: ${error}`
  } finally {
    await browser.close()
  }
}

export { parseLB }
