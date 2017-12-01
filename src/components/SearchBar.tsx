import * as React from 'react';
import styled from 'styled-components';

import { Button3 } from './Button';
import Input from './Input';

interface ISearchBarProps {
  updateSearchValue?: (a: string) => any
  requestSearch: (term: string) => null
  searchValue: string
}

export default class SearchBar extends React.Component<ISearchBarProps, {}> {
  render() {
    return (
      <div>
        <Input
          onChange={(event: React.ChangeEvent<any>) => {
            this.props.updateSearchValue(event.currentTarget.value)
          }}
          value={this.props.searchValue}
        />
        <Button3 onClick={() => this.props.requestSearch(
          this.props.searchValue
        )}>Search</Button3>
      </div >
    )
  }
}
