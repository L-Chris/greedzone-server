/**
 * Socket.io
 */
const Message = require('./models/message')
module.exports = function(server) {
  const io = require('socket.io')(server);
  io.on('connection', socket => {
    socket.on('disconnect', () => {
    })
    socket.on('chat', async(data) => {
      message.create(data)
      io.emit('chat', data)
    })
  })
}
