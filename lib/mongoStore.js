const StoreModel = require('../models/store')
const { Store } = require('koa-session2')

class MongoStore extends Store {
  constructor () {
    super()
    this.mongo = StoreModel
  }

  async get(sid) {
    let data = await this.mongo.find({id: sid})
    console.log(data)
    return JSON.parse(data)
  }

  async set(session, {sid = this.getID(24), maxAge} = {}) {
    if (this.sessions.has(sid) && this.__timer.has(sid)) {
      const __timeout = this.__timer.get(sid);
      if (__timeout) clearTimeout(__timeout);
    }
    if (maxAge) {
      this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge))
    }
    try {
      this.sessions.set(sid, JSON.stringify(session))
      await this.mongo.findOneAndUpdate({id: sid}, JSON.stringify(session.user), {new: true, upsert: true})
    } catch (err) {
      console.log('Set session error:', err)
    }
    return sid
  }
  async destory(sid) {
    let data = await this.mongo.remove({id: sid})
    return JSON.parse(data)
  }
}

module.exports = MongoStore