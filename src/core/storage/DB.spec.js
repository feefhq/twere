/* eslint-disable no-undef */
import { DB } from './DB.js'

describe('DB', () => {
  let db = null

  beforeEach(() => {
    db = DB.new('testname')
  })

  afterEach(() => {
    DB.deleteDatabase('testname')
  })

  it('should return a Promise for static open()', () => {
    DB.open().should.be.instanceOf(Promise)
  })

  it('should return a Promise for instantiated open()', () => {
    const db = DB.new('testname')
    db.open().should.be.instanceOf(Promise)
  })

  it('should return a Database when resolving static open()', async () => {
    const dbconnection = await DB.open()
    dbconnection.should.be.instanceOf(IDBDatabase)
  })

  it('should catch missing store for a transaction', async () => {
    const mydb = await db.open()
    should.throw(() => mydb.transaction('testname'), Error)
  })
})
