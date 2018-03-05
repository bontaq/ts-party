import * as React from 'react';
import styled from 'styled-components';
import * as R from 'ramda';

interface ITableProps {
  data: Array<Array<any>>
  columnNames: Array<string>
  onClick?: (a: any) => null
}

const Container = styled.div`
  width: 100%;
`

const Row = styled.ul`
  padding: 5px 0px 7px 0px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`

const RowItem: React.StatelessComponent<{ width: number }> = props => (
  <span {...props} />
)

const StyledHeader = styled.ul`
  padding: 5px 0px 25px 0px;
  color: black;
`

// assume the first column is just ID and shrink it
const StyledRowItem = styled(RowItem) `
  &:first-child {
    width: 10%
  }
  width: ${props => props.width}%;
  display: inline-block;
`

class Table extends React.Component<ITableProps, {}> {
  render() {
    const width = 90 / this.props.columnNames.length;
    const header = this.props.columnNames.map(i =>
      <StyledRowItem width={width}>{i}</StyledRowItem>
    );
    const rows = this.props.data.map(d => (
      <Row>
        {d.map(i => <StyledRowItem width={width}>{i}</StyledRowItem>)}
      </Row>
    ));
    return (
      <Container>
        <ul>
          <StyledHeader>{header}</StyledHeader>
          {rows}
        </ul>
      </Container>
    )
  }
}

export default Table;
