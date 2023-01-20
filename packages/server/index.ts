import fs from 'node:fs'
import path from 'node:path'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import { createClientAndConnect } from './db'
// импортируем работу с запросами для сервера
import * as http from 'http'
import * as https from 'https'
// импортируем конвертер для кодировок т.к. удаленный сайт в window-1251
import iconv from 'iconv-lite'
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'
import { Words, dbConnect } from './app/config/db.config'
import topicsRouter from './app/routers/topicsRouter'
import commentsRouter from './app/routers/commentsRouter'
import likesRouter from './app/routers/likesRouter'
import teamsRouter from './app/routers/teamsRouter'
import userRouter from './app/routers/userRouter'

function escapeHtml(string: string): string {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&#039;')
    .replace(/'/g, '&#039;')
}

export async function createServer(hmrPort = void 0) {
  const app = express()
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001
  const resolve = (p: string) => path.resolve(__dirname, p)

  app.use('/api/topics', topicsRouter)
  app.use('/api/comments', commentsRouter)
  app.use('/api/likes', likesRouter)
  app.use('/api/teams', teamsRouter)
  app.use('/api/user', userRouter)

  let template: string

  const vite = await (
    await import('vite')
  ).createServer({
    root: void 0,
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  // слушаем апи по этому адресу, заносим все что после слеша в переменную word
  app.get('/api/v1/desc/:word', async (req, res) => {
    const word = req.params.word
    let isWiktionaryOrgEmpty = false

    // делаем запрос в свою базу данных    
    const desc =  Words.findOne({
      where: {
        word: word,
      },
    })
    console.log(desc);

    const json =
    '{"word":"' +
    word +
    '","explanation": "' +
    desc +
    '"}'

    res
    .status(200)
    .set({ 'Content-Type': 'text/html; charset=utf-8' })
    .send(json)

    if (desc != void 0) {
      isWiktionaryOrgEmpty = true;
    }

    // делаем запрос к сайту ru.wiktionary.org
    https.get('https://ru.wiktionary.org/wiki/' + word, response => {
      const data: Buffer[] = []
      // ответ приходит кусками, записываем куски (Buffer) в массив чтобы потом преобразовать разом
      response.on('data', chunk => {
        data.push(chunk)
      })

      response.on('end', () => {
        // Когда всё что можно нам пришло, конвертируем из кодировки window-1251 и превращаем Буфер в строку
        const dataHTML = iconv.decode(Buffer.concat(data), 'utf8').toString()
        // Парсим (выбираем) нужные нам блок по фиксированным (на удаленном сайте) тегам
        const regex = new RegExp(/<ol>(.*?)<\/ol>/, 'g')
        // exec - возвращает соответствие регулярному выражению (нужным нам блок на странице с которым будем
        // работать дальше)
        const results = regex.exec(dataHTML.replace(/\n/g, ''))

        // выходим, если нет значения
        if (!results || !results[0]) {
          isWiktionaryOrgEmpty = true
          return
        }

        // формируем и возвращаем строку json
        const description = escapeHtml(results[0]);
        const json =
          '{"word":"' +
          word +
          '","explanation": "' +
          description +
          '"}'
        res
          .status(200)
          .set({ 'Content-Type': 'text/html; charset=utf-8' })
          .send(json)
          // и записываем себе в базу
          Words.create({ word, description})
      })
    })

    // Если запрос с словарю wiktionary.org не дал результатов, пробуем словарь gramota.ru
    if (isWiktionaryOrgEmpty) {
      http.get(
        'http://gramota.ru/slovari/dic/?bts=x&word=' + word,
        response => {
          const data: Buffer[] = []
          // ответ приходит кусками, записываем куски (Buffer) в массив чтобы потом преобразовать разом
          response.on('data', chunk => {
            data.push(chunk)
          })

          response.on('end', () => {
            // Когда всё что можно нам пришло, конвертируем из кодировки window-1251 и превращаем Буфер в строку
            const dataHTML = iconv
              .decode(Buffer.concat(data), 'cp1251')
              .toString()
            // Парсим (выбираем) нужные нам блок по фиксированным (на удаленном сайте) тегам
            const regex = new RegExp(
              /<div style="padding-left:50px">(.*)<br><br><\/div>/,
              'gi'
            )
            // exec - возвращает соответствие регулярному выражению (нужным нам блок на странице с которым будем
            // работать дальше)
            const results = regex.exec(dataHTML)
            // убедимся что нам хоть что-то вернули)
            if (!results || !results[0]) {
              // возвращаем ошибку 404
              res
                .status(404)
                .set({ 'Content-Type': 'text/html; charset=utf-8' })
                .send('сами не знаем что это')
              return
            }

            // Здесь описываем разделители вариантов объяснение вида <b>1.</b>
            const regexDelimer = new RegExp(/<b>\d.<\/b>/, 'gi')
            results[0] = results[0].replace(regexDelimer, '</p><p>')

            // формируем и возвращаем строку json
            const description = escapeHtml(results[0]);
            const json =
              '{"word":"' +
              word +
              '","explanation": "' +
              description +
              '"}'
            res
              .status(200)
              .set({ 'Content-Type': 'text/html; charset=utf-8' })
              .send(json)
            // и записываем себе в базу
           Words.create({ word, description})
          })
        }
      )
    }
  })

  app.use('/', express.static('../client/dist/ssr'))

  app.get('/*', async (req, res) => {
    const result = render(req.originalUrl)
    const clientSrc = '../client/dist/client/'
    const ssrSrc = '../client/dist/ssr/'

    template = fs.readFileSync(resolve(clientSrc + 'index.html'), 'utf-8')
    if (fs.existsSync(clientSrc) && !fs.existsSync(ssrSrc + 'assets')) {
      fs.cpSync(clientSrc + 'assets', ssrSrc + 'assets', { recursive: true })
      fs.readdir(clientSrc, function (err, files) {
        files
          .filter(el => path.extname(el) === '.js')
          .forEach(file => {
            fs.cp(clientSrc + file, ssrSrc + file, error => {
              if (error) console.error(error)
            })
          })
      })
    }
    template = await vite.transformIndexHtml(req.originalUrl, template)
    const html = template.replace(
      `<div id="root"></div>`,
      `<div id="root">${result}</div>`
    )
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  })

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
  })

  return { app, vite }
}

createServer().then(() => {
  createClientAndConnect().then(dbConnect)
})
