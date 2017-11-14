import * as React from 'react';
import styled from 'styled-components';

import { Button2 } from './Button';
import Input from './Input';

interface ISearchBarProps {
  updateSearchValue?: (a: string) => any
  requestSearch: () => null
}

export default class SearchBar extends React.Component<ISearchBarProps, {}> {
  render() {
    console.info("what", this.props)
    return (
      <div>
        <Input onChange={(event: React.ChangeEvent<any>) => {
          this.props.updateSearchValue(event.currentTarget.value)
        }} />
        <Button2 onClick={() => this.props.requestSearch()}>Search</Button2>
      </div >
    )
  }
}
