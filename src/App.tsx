import * as React from 'react';
import { connect } from 'react-redux';
import SearchBar from './components/SearchBar';
import PreviousSearches from './components/PreviousSearches';

interface IAppProps {
  //store: any
  //  searchValue: any
  updateSearchValue: (a: string) => any
  search: any
}

class App extends React.Component<IAppProps, any> {
  render() {
    return (
      <div>
        <SearchBar updateSearchValue={this.props.updateSearchValue} />
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

const mapDispatchToProps = (f: any) => {
  return {
    updateSearchValue: (str: string) => { }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)