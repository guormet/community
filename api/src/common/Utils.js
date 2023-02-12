import { getValue } from '@/config/RedisConfig';
import config from '@/config/index';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import moment from 'dayjs';

const getJWTPayload = token => {
  return jwt.verify(token.split(' ')[1], config.JWT_SECRET);
};

// 生成 token 返回给客户端
const generateToken = (payload, expire = '1h') => {
  if (payload) {
    return jwt.sign({
      ...payload
    }, config.JWT_SECRET, { expiresIn: expire });
  } else {
    throw new Error('生成token失败！');
  }
};

// 判断一个日期是否是今天
export const isToday = _date => {
  if (_date) {
    return moment(_date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  }
  return false;
};

const checkCode = async (key, value) => {
  const redisData = await getValue(key);
  if (redisData !== null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const getStats = (path) => {
  return new Promise((resolve) => {
    // fs.stats(path, (err, stats) => {
    //   if (err) {
    //     resolve(false)
    //   } else {
    //     resolve(stats)
    //   }
    // })
    fs.stat(path, (err, stats) => err ? resolve(false) : resolve(stats));
  });
};

const mkdir = (dir) => {
  return new Promise((resolve) => {
    fs.mkdir(dir, err => err ? resolve(false) : resolve(true));
  });
};
const dirExists = async (dir) => {
  const isExists = await getStats(dir);
  // 如果该路径存在且不是文件，返回 true
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) {
    // 路径存在，但是是文件，返回 false
    return false;
  }
  // 如果该路径不存在
  const tempDir = path.parse(dir).dir;
  // 循环遍历，递归判断如果上级目录不存在，则产生上级目录
  const status = await dirExists(tempDir);
  if (status) {
    const result = await mkdir(dir);
    console.log('TCL: dirExists -> result', result);
    return result;
  } else {
    return false;
  }
};
const rename = (obj, key, newKey) => {
  if (Object.keys(obj).indexOf(key) !== -1) {
    obj[newKey] = obj[key];
    delete obj[key];
  }
  return obj;
};
export {
  checkCode,
  getJWTPayload,
  generateToken,
  dirExists,
  rename
};
