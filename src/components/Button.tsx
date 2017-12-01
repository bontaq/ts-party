import * as React from 'react';
import styled from 'styled-components';

export const Button2: React.StatelessComponent<{
  onClick: (e: any) => null
}> = props => (
  <button {...props} />
)

export const Button3 = styled.button`
  outline: 3px solid green;
  background-color: white;
  height: 45px;
  font-size: 1em;
  border-width: 0px;
  margin: 4px;
  padding: 4px;
`;

export default Button3;
