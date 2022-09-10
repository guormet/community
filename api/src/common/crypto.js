import crypto from 'crypto-js';

const privateKey = 'qq1445190359abcd'; // 16
const privateIv = 'phone18377330701'; // 16

const publicKey = 'qq1445190395abcd'; // 16
const publicIv = 'phone17620410701'; // 16

async function aesEncrypt (content) {
  const encrypted = await crypto.AES.encrypt(content, crypto.enc.Utf8.parse(privateKey), { iv: crypto.enc.Utf8.parse(privateIv) });

  return crypto.enc.Base64.stringify(encrypted.ciphertext);
}

async function aesDecrypt (content, type) {
  let key = '';
  let iv = '';
  if (type === 1) {
    key = publicKey;
    iv = publicIv;
  } else {
    key = privateKey;
    iv = privateIv;
  }
  const decrypted = await crypto.AES.decrypt(content, crypto.enc.Utf8.parse(key), { iv: crypto.enc.Utf8.parse(iv) });

  return decrypted.toString(crypto.enc.Utf8);
}

export {
  aesEncrypt,
  aesDecrypt
};
