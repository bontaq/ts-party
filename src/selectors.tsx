import * as R from 'ramda';

const findSearch = (term: string) =>
  R.find(R.propEq('search', term))

export const getResults = (state: any, term: string) => {
  console.info('state', state)
  return findSearch(term)(state.pastSearches)
}
