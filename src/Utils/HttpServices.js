import axios from 'axios'
import LocalDB from './LocalStorage'

export default class HttpServices {
  constructor(path) {
    this.path = 'http://localhost:3300/api/v1' + path
    // this.path = 'https://my-yoruba-comm.herokuapp.com/api/v1' + path
    // https://my-yoruba-comm.herokuapp.com/
  }

  async post(_data) {
    let token = JSON.parse(LocalDB.retrieve('x-yu-tox'))
    try {
      const { data } = await axios.post(
        this.path,
        { ..._data },
        {
          withCredentials: true,
          headers: {
            auth: token ? token.one : null,
          },
        },
      )
      return data
    } catch (error) {
      console.log(error)
      return error.response.data
    }
  }

  async get() {
    try {
      const { data } = await axios.get(this.path)
      return data
    } catch (error) {
      return error.response.data
    }
  }

  async getWithCred() {
    let token = JSON.parse(LocalDB.retrieve('x-yu-tox'))
    try {
      const { data } = await axios.get(this.path, {
        withCredentials: true,
        headers: {
          auth: token ? token.one : null,
        },
      })
      return data
    } catch (error) {
      return error.response.data
    }
  }
}
