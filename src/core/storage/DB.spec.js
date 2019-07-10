/* eslint-disable no-undef */
import { DB } from './DB.js'

describe('DB', () => {
  const dbname = 'testdb'
  const db = DB.new(dbname)

  afterEach(async () => {
    await db.deleteDatabase(dbname)
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
    const connection = await db.open()
    should.throw(() => connection.transaction('testname'), Error)
  })

  it('should create an object store', async () => {
    const connection = await db.open()
    await connection.createObjectStore('teststore')
    const storeNames = [...db.storeNames]
    storeNames.should.contain('teststore')
  })

  it('should create multiple object stores', async () => {
    const connection = await db.open()
    await connection.createObjectStore('teststore')
    await connection.createObjectStore('teststore2')
    const storeNames = [...db.storeNames]
    storeNames.should.contain('teststore')
    storeNames.should.contain('teststore2')
  })
})
