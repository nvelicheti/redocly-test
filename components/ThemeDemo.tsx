import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';

import { getThemeProps, ThemeSelector } from './ThemeSelector';

const ThemeContainer = styled.div<{ $inFrame?: boolean }>`
  margin: 16px 0 0 16px;
`;

const CreditScoreModule = ({theme}) => (<credit-score-module size={"small"} token={"abc123"} {...theme} />);

export const ThemeDemo = () => {
  const [theme, setTheme] = useState<string>('default');

  const handleThemeChange = (t: string) => {
    setTheme(t);
  };

  return (
    <ThemeContainer>
      <CreditScoreModule {...getThemeProps(theme)} />
      <ThemeSelector onChange={handleThemeChange} />
    </ThemeContainer>
  );
};