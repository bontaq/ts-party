import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Input from './Input';

export default class SearchBar extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Input />
        <Button>Search</Button>
      </div>
    )
  }
}
