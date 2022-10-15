import combineRoutes from 'koa-combine-routers';

// import publicRouter from './publicRouter';
// import loginRouter from './modules/loginRouter';
// import userRouter from './userRouter';
const moduleFiles = require.context('./modules', true, /\.js$/);
const modules = moduleFiles.keys().reduce((items, path) => {
  const value = moduleFiles(path);
  items.push(value.default);
  return items;
}, []);
export default combineRoutes(modules);
