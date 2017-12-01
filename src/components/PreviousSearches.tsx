import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

const PreviousSearchEl = styled.span`
  display: inline-block;
  padding: 10px;
  font-weight: bold;
  color: grey;
  &:hover {
    color: black;
    cursor: pointer;
  }
`

interface IPreviousSearchesProps {
  requestSearch: (term: string) => null
  pastSearches: Array<{
    search: string,
    responses: Array<{ url: string }>
  }>
}

export default class PreviousSearches extends React.Component<IPreviousSearchesProps, {}> {
  requestSearch = (term: string) => {
    this.props.requestSearch(term);
  }
  render() {
    const pastSearches = R.map(i => (
      <PreviousSearchEl onClick={() => this.requestSearch(i.search)}>
        {i.search}
      </PreviousSearchEl>
    ), this.props.pastSearches)
    return (
      <div>
        {pastSearches}
      </div>
    )
  }
}
