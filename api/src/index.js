import Koa from 'koa';
import JWT from 'koa-jwt';
import path from 'path';
import helmet from 'koa-helmet';
import statics from 'koa-static';
import router from './routes/routes';
import koaBody from 'koa-body';
import jsonutil from 'koa-json';
import cors from '@koa/cors';
import compose from 'koa-compose';
import compress from 'koa-compress';
import config from './config/index';
import errorHandle from './common/errorHandle';
import WebSocketServer from './config/WebSocket';

const app = new Koa();
const ws = new WebSocketServer()

ws.init()
global.ws = ws
global.console.log2 = (msg, index = 1) => { // 用于控制台打印
  console.log(`===> ${index}: `, msg)
  console.log('===> typeof: ', typeof msg)
}

const isDevMode = process.env.NODE_ENV !== 'production';

// 定义公共路径，不需要jwt鉴权
const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [ /^\/public/, /^\/login/ ] });

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 5 * 1024 * 1024
    },
    onError: err => {
      console.log('koa-body error：' + err);
    }
  }),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  jwt
]);

if (!isDevMode) {
  app.use(compress());
}

app.use(middleware);
app.use(router());

app.listen(3000);
