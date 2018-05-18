import { formatDate, sortByDateAsc } from './util'

describe('formatDate', () => {
  it('works with undefined', () => {
    expect(formatDate(undefined)).toEqual(null);
  })

  it('formats a date nicely from server format', () => {
    expect(formatDate('2017-06-06T15:30:00')).toEqual('Tue, Jun 6th, 3:30pm, 2017');
  })
})

describe('sortByDateAsc', () => {
  it('puts newer dates first', () => {
    let sortableItems = [
      { dateField: '2017-06-06T15:30:00' },
      { dateField: '2017-06-06T14:30:00' },
      { dateField: '2017-06-06T16:30:00' }
    ]
    expect(sortByDateAsc('dateField', sortableItems)).toEqual([
      { dateField: '2017-06-06T16:30:00' },
      { dateField: '2017-06-06T15:30:00' },
      { dateField: '2017-06-06T14:30:00' }
    ])
  })

  it('does not lose its mind with an empty list', () => {
    expect(sortByDateAsc('dateField', [])).toEqual([])
  })
})
