import * as React from 'react';
import SearchBar from './components/SearchBar';
import PreviousSearches from './components/PreviousSearches';

interface IAppProps {
  searchValue: any
  updateSearchValue: (a: string) => any
}

export default class App extends React.Component<IAppProps, any> {
  render() {
    console.info(this.props.searchValue)
    return (
      <div>
        <SearchBar updateSearchValue={this.props.updateSearchValue} />
        <span>{this.props.searchValue}</span>
        <PreviousSearches />
      </div>
    )
  }
}
