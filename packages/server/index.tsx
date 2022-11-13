import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createClientAndConnect } from './db'
import * as ReactDOMServer from 'react-dom/server';

dotenv.config()
process.env.MY_CUSTOM_SECRET = 'API_KEY_qwertyuiop'
const port = Number(process.env.SERVER_PORT) || 3001

export async function createServer(
  //root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort= void 0
 ) {
  const app = express();
  app.use(cors())
  const resolve = (p: string) => path.resolve(__dirname, p)
  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite:any

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root : void 0,
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        },
        hmr: {
          port: hmrPort
        }
      },
      appType: 'custom'
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
//      app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // Проблема - ругается на sass если пути идут от корня и без двойного слеша //
        // Проблема - при попытки react.render элемента не видит переменную window, domjs не помогает
        // решено через ReactDomServer
        // Проблема - не рендерит стили.. - проверить как происходит рендер 
        // Проблема - не видит could react-redux context - поэксперементировать с переменной контекст 
        // и функцией hydrate
        // Основное начинается тут. Берем из файла шаблон html
        template = fs.readFileSync(resolve('../client/index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        // Загружаем модуль React (возможны варинты что надо грузить постранично)
        render  = await vite.ssrLoadModule('../client/src/pages/index.tsx')
        } else {
        template = indexProd
      }

      const context = { url: '' }
      // Рендерим через серверДом в строку React Element
      const appHtml = ReactDOMServer.renderToString(render.Rules()) + '(url, context)';

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url)
      }
      // Ну и далее как простой шаблонизатор запихиваем это через реплейс, чтобы не менять клиентскую часть ловлю весь блок <div 'root>..
      const html = template.replace(`<div id="root"></div>`,`<div id="root">${appHtml}</div>`)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e:any) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })  

  return { app, vite };
}


createServer().then( () => {
  
  createClientAndConnect()
})

/* содержимое переменной render после импорта index.tsx
  Main: [Getter],
  Login: [Getter],
  SignUp: [Getter],
  NewGame: [Getter],
  Profile: [Getter],
  Rules: [Getter],
  Leaders: [Getter],
  ForumPage: [Getter],
  ChangePassword: [Getter],
  ForumDetail: [Getter],
  NotFoundPage: [Getter],
  ServerErrorPage: [Getter],
  WinnerPage: [Getter],
  RoundStart: [Getter],
  RoundProcess: [Getter],
  RoundEnd: [Getter],
  ScoreInRoundPage: [Getter],
  [Symbol(Symbol.toS
    */