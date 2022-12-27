import React, {useState} from 'react';
import {ThemeDemo} from "./ThemeDemo";
import {DocsContainer} from "./DocsContainer"
import styled from 'styled-components';
import { Grayscale } from '../styles/colors';

const LinksWrapper = styled.nav`
  display: flex;
  margin-bottom: 33px;

  a {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    font-family: primary;
    padding-bottom: 2px;
    margin-right: 32px;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 1.5px;
  }

  a:last-child {
    margin-right: 0;
  }
`;

export const ActivatableLink = styled.a<{ $isActive?: boolean }>`
  color: ${props => (props.$isActive ? '#71217B' : Grayscale.gray50)};
  border-bottom: ${props => (props.$isActive ? '1px solid #71217B' : 'none')};
  cursor: pointer;
`;

export const ComponentExplorer = () => {

  const [isCodeView, setIsCodeView] = useState(false);

  return (
    <>
      <LinksWrapper>
        <ActivatableLink onClick={() => setIsCodeView(false)} $isActive={!isCodeView}>
          Component
        </ActivatableLink>
        <ActivatableLink onClick={() => setIsCodeView(true)} $isActive={isCodeView}>
          Code
        </ActivatableLink>
      </LinksWrapper>
      {isCodeView ? <DocsContainer /> : <ThemeDemo />}
    </>
  );
}