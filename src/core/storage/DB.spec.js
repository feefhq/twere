/* eslint-disable no-undef */
import { DB } from './DB.js'

describe('DB', () => {
  let db = null

  beforeEach(() => {
    db = DB.new('testname')
  })

  afterEach(async () => {
    await db.deleteDatabase('testname')
  })

  it('should return a Promise for open()', async () => {
    const connection = db.open()
    connection.should.be.instanceOf(Promise)
    await connection
  })

  it('should return a Database when resolving open()', async () => {
    const connection = await db.open()
    connection.should.be.instanceOf(DB)
  })

  it('should catch missing store for a transaction', async () => {
    const mydb = await db.open()
    should.throw(() => mydb.transaction('testname'), Error)
  })

  it('should do an upgrade', async () => {
    const mydb = await db.open(2)
  })
})
