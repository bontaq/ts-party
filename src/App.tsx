import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SearchBar from './components/SearchBar';
import PreviousSearches from './components/PreviousSearches';
import Results from './components/Results';

const BaseDiv = styled.div`
  font-family: sans-serif
`

interface IAppProps {
  updateSearchValue: (a: string) => any
  requestSearch: (term: string) => null
  requestTrending: () => null
  search: string
  pastSearches: any
  displayResults: any
}

class App extends React.Component<IAppProps, any> {
  componentDidMount() {
    this.props.requestTrending()
  }
  render() {
    return (
      <BaseDiv>
        <SearchBar
          updateSearchValue={this.props.updateSearchValue}
          requestSearch={this.props.requestSearch}
          searchValue={this.props.search}
        />
        <PreviousSearches
          pastSearches={this.props.pastSearches}
          requestSearch={this.props.requestSearch}
        />
        <Results displayResults={this.props.displayResults} />
      </BaseDiv>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    search: state.search,
    pastSearches: state.pastSearches,
    displayResults: state.displayResults
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearchValue: (str: string) => {
      dispatch({ type: 'UPDATE_SEARCH', text: str })
    },
    requestSearch: (term: string) => {
      dispatch({ type: 'SEARCH_REQUESTED', term })
    },
    requestTrending: () => {
      dispatch({ type: 'TRENDING_REQUESTED' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
