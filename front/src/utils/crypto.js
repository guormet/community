import crypto from 'crypto-js';

const public_key = 'qq1445190395abcd';  // 16
const public_iv = 'phone17620410701'; // 16

function aes_encrypt ( content ) {
  let encrypted = crypto.AES.encrypt( content, crypto.enc.Utf8.parse( public_key ), {iv: crypto.enc.Utf8.parse( public_iv )} );

  return crypto.enc.Base64.stringify( encrypted.ciphertext );
}

export {
  aes_encrypt
};