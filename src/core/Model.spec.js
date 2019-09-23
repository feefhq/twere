/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import { Model } from './Model.js'

describe('Model', () => {
  let model = null
  let Extended = null

  beforeEach(() => {
    model = new Model()
    Extended = class Extended extends Model {}
  })

  describe('#()', () => {
    it('should have a valid constructor', () => {
      expect(model).to.be.an.instanceof(Model)
    })
  })

  describe(':toString()', () => {
    it('should return the constructor name', () => {
      expect(Model.toString()).to.equal('Model')
      expect(Extended.toString()).to.equal('Extended')
    })
  })

  describe('#toString()', () => {
    it('should return the constructor name', () => {
      expect(new Model().toString()).to.equal('Model')
      expect(new Extended().toString()).to.equal('Extended')
    })
  })

  describe.skip(':createObjectStore()', () => {
    it('should create a new IDB store for the model type', () => {})
  })

  describe.skip(':getMethodConstant()', () => {
    it('should set a future method function', () => {})
  })

  describe(':DELETE()', () => {
    it('should return :delete', () => {
      expect(Model.DELETE).to.be.an.instanceof(Model)
      expect(Model.DELETE.method).to.be.an.instanceof(Function)
      expect(Model.DELETE.method.name).to.equal('delete')
      expect(Extended.DELETE.method.name).to.equal('delete')
    })
  })

  describe(':GET()', () => {
    it('should return :get', () => {
      expect(Model.GET).to.be.an.instanceof(Model)
      expect(Model.GET.method).to.be.an.instanceof(Function)
      expect(Model.GET.method.name).to.equal('get')
      expect(Extended.GET.method.name).to.equal('get')
    })
  })

  describe(':POST()', () => {
    it('should return :post', () => {
      expect(Model.POST).to.be.an.instanceof(Model)
      expect(Model.POST.method).to.be.an.instanceof(Function)
      expect(Model.POST.method.name).to.equal('post')
      expect(Extended.POST.method.name).to.equal('post')
    })
  })

  describe(':PUT()', () => {
    it('should return :put', () => {
      expect(Model.PUT).to.be.an.instanceof(Model)
      expect(Model.PUT.method).to.be.an.instanceof(Function)
      expect(Model.PUT.method.name).to.equal('put')
      expect(Extended.PUT.method.name).to.equal('put')
    })
  })

  describe.skip(':list()', () => {
    it('should return a list of model objects', () => {})
  })

  describe.skip('#reflect()', () => {
    it('should define properties', () => {})
  })

  describe.skip('#proxy()', () => {
    it('should proxy to predefined method function', () => {})
    it('should do nothing if no method defined', () => {})
  })

  describe.skip('#delete()', () => {
    it('should delete an object', () => {})
  })

  describe.skip('#get()', () => {
    it('should get an object', () => {})
  })

  describe.skip('#post()', () => {
    it('should update save a new object', () => {})
    it('should update an existing object', () => {})
  })

  describe.skip('#put()', () => {
    it('should update save a new object', () => {})
  })

  describe.skip('#save()', () => {
    it('should save the entity', () => {})
    it('should mark an entity as dirty', () => {})
    it('should mark the model as dirty', () => {})
  })

  describe.skip('#save()', () => {
    it('should remove the entity', () => {})
    it('should mark an entity as dirty', () => {})
    it('should mark the model as dirty', () => {})
  })

  describe('#getData()', () => {
    it('should return entity properties as a clean object', () => {
      expect(model.getData()).to.eql({})
    })
  })
})
