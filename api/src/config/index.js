const DB_URL = 'mongodb://test:123456@120.77.34.116:27017/testdb'

const REDIS = {
  host: '120.77.34.116',
  port: 15001,
  password: '123456'
}
/**
 * https://jwt.io/
 * HEADER:{
 *     "alg": "HS256",
 *     "typ": "JWT"
 *   }
 *   PAYLOAD:{
 *     "name": "KeatonZhang",
 *     "iat": 6228053
 *   }
 *   张继东 secret base64 encoded
 */
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2VhdG9uWmhhbmciLCJpYXQiOjYyMjgwNTN9.E8K1pZq04Hd_AtrFkYPFVVmY5O6rfq8_2KV7C9DXlfw'

export default {
  DB_URL,
  REDIS,
  JWT_SECRET
}
