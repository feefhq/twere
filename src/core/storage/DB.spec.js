/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { DB } from './DB.js'

describe('DB', () => {
  const dbname = 'testdb'
  const db = DB.new(dbname)

  afterEach(async () => {
    await db.deleteDatabase(dbname)
  })

  describe('#constructor()', () => {
    it('should set `name` property', () => {
      db.name.should.equal('testdb')
    })
  })

  describe('#open()', () => {
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
  })

  describe('#createObjectStore()', () => {
    it('should create an object store', async () => {
      await db.createObjectStore('teststore')
      const storeNames = [...db.storeNames]
      storeNames.should.contain('teststore')
    })

    it('should create multiple object stores', async () => {
      await db.createObjectStore('teststore')
      await db.createObjectStore('teststore2')
      const storeNames = [...db.storeNames]
      storeNames.should.contain('teststore')
      storeNames.should.contain('teststore2')
    })
  })

  describe('#set()', () => {
    it('should set a value', async () => {
      await db.createObjectStore('teststore')
      const result = await db.set('teststore', { data: 'something' })
      result.should.equal(1)
    })
  })

  describe('#get()', () => {
    it('should set and get a value', async () => {
      await db.createObjectStore('teststore')
      await db.set('teststore', { data: 'something' })
      const result = await db.get('teststore', 1)
      result.data.should.equal('something')
    })
  })

  describe('#delete()', () => {
    it('should delete a value', async () => {
      await db.createObjectStore('teststore')
      const key = await db.set('teststore', { data: 'something' })
      let get = await db.get('teststore', key)
      get.should.eql({ data: 'something', id: 1 })
      await db.delete('teststore', key)
      get = await db.get('teststore', key)
      expect(get).to.be.undefined
    })
  })

  describe('#list()', () => {
    beforeEach(async () => {
      await db.createObjectStore('teststore')
    })

    it('should return a promise', () => {
      const list = db.list()
      list.should.be.instanceOf(Promise)
    })

    it('should return an array', async () => {
      const list = await db.list('teststore')
      list.should.be.instanceOf(Array)
    })

    it('should return an empty array', async () => {
      const list = await db.list('teststore')
      list.length.should.be.equal(0)
    })

    it('should return a list', async () => {
      await db.set('teststore', { data: 'something' })
      await db.set('teststore', { data: 'something2' })
      const list = await db.list('teststore')
      list.length.should.be.equal(2)
    })
  })
})
