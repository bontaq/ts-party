import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Input from './Input';

interface ISearchBarProps {
  updateSearchValue?: (a: string) => any
}

export default class SearchBar extends React.Component<ISearchBarProps, {}> {
  render() {
    console.info("what", this.props)
    return (
      <div>
        <Input onChange={(event: React.ChangeEvent<any>) => {
          this.props.updateSearchValue(event.currentTarget.value)
        }} />
        <Button>Search</Button>
      </div>
    )
  }
}
