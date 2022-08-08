import { getValue, setValue, getHValue, delValue } from "./RedisConfig";

// setValue('imooc', 'this is imooc')
// getValue('imooc').then(res => {
//   console.log(res);
// })
delValue('imooc')
setValue('imoocobj1', {name: 'keaton', age: 30, email: 'keaton@imooc.com'})
getHValue('imoocobj1').then((res) => {
  console.log('getHvalue', res)
})