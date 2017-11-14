import * as React from 'react';
import styled from 'styled-components';

export const Button2: React.StatelessComponent<{
  onClick: (e: any) => null
}> = props => (
  <button {...props} />
)

const Button = styled.button`
  border-radius: 3px;
  background: linear-gradient(to right, rgb(64, 214, 209), rgb(195, 247, 245));
  padding: 5px 10px;
  border-width: 0px;
`;

export default Button;
