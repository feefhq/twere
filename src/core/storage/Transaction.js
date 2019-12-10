export class Transaction {
  constructor (database, name) {
    this.database = database
    this.transaction = this.database.transaction(name)
    return this
  }

  static new (database, name) {
    return new Transaction(database, name)
  }

  store (name) {
    return this.transaction.objectStore(name)
  }
}
