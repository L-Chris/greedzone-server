module.exports = {
  env: 'dev',
  port: 3000,
  app: {
    port: 3000,
    baseUrl: '/api'
  },
  session: {
    key: 'test',
    maxAge: 259200000
  },
  keys: 'lchris',
  mongodb: {
    name: 'test',
    url: 'mongodb://localhost:27017/test',
    account: 'chris',
    password: '123456'
  },
  redis: {
    url: '',
    port: ''
  }
}