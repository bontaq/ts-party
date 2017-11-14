import * as React from 'react';
import { connect } from 'react-redux';
import SearchBar from './components/SearchBar';
import PreviousSearches from './components/PreviousSearches';

interface IAppProps {
  updateSearchValue: (a: string) => any
  requestSearch: () => null
  search: string
}

class App extends React.Component<IAppProps, any> {
  render() {
    console.info('renders', this.props.search);
    return (
      <div>
        <SearchBar
          updateSearchValue={this.props.updateSearchValue}
          requestSearch={this.props.requestSearch}
        />
        <PreviousSearches />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    search: state.search
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearchValue: (str: string) => {
      dispatch({ type: 'UPDATE_SEARCH', text: str })
    },
    requestSearch: () => {
      console.info('search requested')
      dispatch({ type: 'REQUEST_SEARCH' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
