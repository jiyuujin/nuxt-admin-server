const { FakeFirestore } = require('firestore-jest-mock')
const { mockCollection } = require('firestore-jest-mock/mocks/firestore')

describe('Single records versus queries', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  const db = new FakeFirestore({
    characters: [
      {
        id: 'user-01',
        name: 'jiyuujin',
        occupation: 'technician'
      },
      {
        id: 'user-02',
        name: 'caorol',
        occupation: 'clown'
      }
    ]
  })

  it('confirm a single record', async () => {
    const record = await db.collection('characters').doc('user-02').get()
    expect(record.exists).toBe(true)
    expect(record.id).toBe('user-02')
    const data = record.data()
    expect(data).toHaveProperty('name', 'caorol')
    expect(data).toHaveProperty('occupation', 'clown')
  })

  it('confirm a single record with promise', () => {
    db.collection('characters')
      .doc('user-01')
      .get()
      .then((record) => {
        expect(record.exists).toBe(true)
        expect(record.id).toBe('user-01')
        const data = record.data()
        expect(mockCollection).toHaveBeenCalledWith('characters')
        expect(data).toHaveProperty('name', 'jiyuujin')
        expect(data).toHaveProperty('occupation', 'technician')
      })
  })

  it('confirm a single record with promise without a specified collection', () => {
    db.doc('characters/user-01')
      .get()
      .then((record) => {
        expect(record.exists).toBe(true)
        expect(record.id).toBe('user-01')
        const data = record.data()
        expect(mockCollection).not.toHaveBeenCalled()
        expect(data).toHaveProperty('name', 'jiyuujin')
        expect(data).toHaveProperty('occupation', 'technician')
      })
  })

  it('confirm a record not existed', async () => {
    const record = await db.collection('animals').doc('monkey').get()
    expect(record.exists).toBe(false)
  })

  it('confirm multiple records', async () => {
    const records = await db
      .collection('characters')
      .where('name', '==', 'jiyuujin')
      .get()

    expect(records.empty).toBe(false)
    expect(records).toHaveProperty('docs', expect.any(Array))
    expect(records.docs[0]).toHaveProperty('id', 'user-01')
    expect(records.docs[0].data()).toHaveProperty('name', 'jiyuujin')
  })

  it('confirm an empty collection', async () => {
    const records = await db
      .collection('animals')
      .where('type', '==', 'mammal')
      .get()

    expect(records.empty).toBe(true)
  })

  test('confirm multiple records with promise', () => {
    db.collection('characters')
      .where('name', '==', 'jiyuujin')
      .get()
      .then((records) => {
        expect(records.empty).toBe(false)
        expect(records).toHaveProperty('docs', expect.any(Array))
        expect(records.docs[0]).toHaveProperty('id', 'user-01')
        expect(records.docs[0].data()).toHaveProperty('name', 'jiyuujin')
      })
  })

  it('confirm all records', async () => {
    const firstRecord = db.collection('characters').doc('user-01')
    const secondRecord = db.collection('characters').doc('user-02')
    const records = await db.getAll(firstRecord, secondRecord)
    expect(records[0]).toHaveProperty('id', 'user-01')
    expect(records[0].data()).toHaveProperty('name', 'jiyuujin')
  })
})
