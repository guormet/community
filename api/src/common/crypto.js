import crypto from "crypto-js"

const private_key = 'qq1445190359abcd'  // 16
const private_iv = 'phone18377330701' // 16

const public_key = 'qq1445190395abcd'  // 16
const public_iv = 'phone17620410701' // 16

async function aes_encrypt(content) {
  let encrypted = await crypto.AES.encrypt(content, crypto.enc.Utf8.parse(private_key), {iv: crypto.enc.Utf8.parse(private_iv)})

  return crypto.enc.Base64.stringify(encrypted.ciphertext)
}

async function aes_decrypt(content, type) {
  let key = ''
  let iv = ''
  if (type === 1) {
    key = public_key
    iv = public_iv
  } else {
    key = private_key
    iv = private_iv
  }
  let decrypted = await crypto.AES.decrypt(content, crypto.enc.Utf8.parse(key), {iv: crypto.enc.Utf8.parse(iv)})

  return decrypted.toString(crypto.enc.Utf8)
}

export {
  aes_encrypt,
  aes_decrypt
}