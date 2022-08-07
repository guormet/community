import axios from '@/utils/request'

const getCode = () => {
  // axios.request({
  //  method: 'get',
  //  url: '/getCaptcha'
  // })
  return axios.get('/getCaptcha')
}

const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}

export { getCode, forget }
