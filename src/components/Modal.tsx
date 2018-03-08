import * as React from 'react';
import styled from 'styled-components';


interface IModalProps {
  header: string;
  handleClose: () => void;
}

const ModalContainer = styled.div`
  z-index: 1;
  position: fixed;
  left: 25%;
  width: 50%;
  top: 40%;
  min-height: 150px;
  background: white;
  padding: 20px;
  border: 1px solid grey;
`

const Header = styled.div`
  text-align: center;
`

const HeaderText = styled.h3`
  margin: 0px;
  text-align: center;
`

const Close = styled.span`
  position: absolute;
  top: 25px;
  left: 25px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`

class Modal extends React.Component<IModalProps, {}> {
  render() {
    return (
      <ModalContainer>
        <Header>
          <Close onClick={this.props.handleClose}>Close</Close>
          <HeaderText>{this.props.header}</HeaderText>
        </Header>
        {this.props.children}
      </ModalContainer>
    )
  }
};

export default Modal;
