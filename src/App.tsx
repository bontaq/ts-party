import * as React from 'react';
import SearchBar from './components/SearchBar';
import PreviousSearches from './components/PreviousSearches';

interface IAppProps {
  value: any
}

export default class App extends React.Component<IAppProps, any> {
  render() {
    return (
      <div>
        <SearchBar />
        <span>{this.props.value}</span>
        <PreviousSearches />
      </div>
    )
  }
}
