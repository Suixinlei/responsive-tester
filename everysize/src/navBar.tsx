import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from './everysize-wordmark.svg';


interface INavBar {
  url: string;
  onUrlChanged: (url: string) => void;
}

const StyledNavBar = styled.div`
  background-color: #c3c3c3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

const StyledInput = styled.input`
  min-width: 300px;
  border: none;
  padding: 8px;
  height: 100%;
`;

export const NavBar = (props: INavBar): React.ReactElement => {
  const onUrlChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onUrlChanged(event.target.value);
  };

  return (
    <StyledNavBar>
      <Logo height='30px' width='170px'/>
      <StyledInput
        value={props.url}
        onChange={onUrlChanged}
      />
      <div />
      <div />
    </StyledNavBar>
  );
};