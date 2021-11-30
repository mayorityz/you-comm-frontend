export default class LocalDB {
  static retrieve(name) {
    let DB = window.localStorage.getItem(name)
    if (DB) return DB
    else return null
  }

  static save(name, data) {
    let DB = window.localStorage.setItem(name, data)
    return DB
  }

  static destroy(name) {
    let DB = window.localStorage.removeItem(name)
  }
  // save
  // retrieve
  // destroy
}
