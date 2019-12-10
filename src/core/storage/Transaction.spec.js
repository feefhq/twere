/* eslint-disable no-undef */
import { Transaction } from './Transaction.js'
import { DB } from './DB.js'

describe('Transaction', () => {
  let db = null
  const dbname = 'testname'

  beforeEach(async () => {
    db = DB.new(dbname)
    await db.open()
  })

  afterEach(() => {
    db = DB.deleteDatabase(dbname)
  })

  // it('constructor should return instance', async () => {
  //   const transaction = new Transaction(db, 'testname')
  //   transaction.should.be.instanceOf(Transaction)
  // })
  // it('new() should return instance', async () => {
  //   const transaction = Transaction.new(db, 'test')
  //   transaction.should.be.instanceOf(Transaction)
  // })
  // it('store() should return promise', async () => {
  //   const transaction = Transaction.new(db, 'testname')
  //   transaction.store('test').should.be.instanceOf(Promise)
  // })
})
