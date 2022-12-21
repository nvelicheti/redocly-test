import React, { useEffect, useRef, useState } from 'react';
import highlightjs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github.css';
import styled from 'styled-components';

highlightjs.registerLanguage('xml', xml);
highlightjs.registerLanguage('json', json);

const HiddenTextArea = styled.textarea`
  height: 1;
  width: 1;
  position: absolute;
  top: -10000rem;
  left: -10000rem;
`;

const ThemeDropdown = styled.select`
  margin-top: 20px;
  margin-bottom: 30px;
  border: 0;
  border-bottom: 2px solid #7c8894;
  color: #5f6b77;
  padding: 7px 0 7px;
  font-family: primary;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  min-width: 205px;
`;

const ThemePreWrapper = styled.pre`
  border: solid 1px #eee;
  margin-top: 0;
  border-radius: 10px;
  position: relative;
  margin-bottom: 50px;
  font-size: 14px;

  > code.hljs {
    border-radius: 10px;
  }
`;

const ThemeButton = styled.button`
  align-items: center;
  background: none;
  border-radius: 20px;
  border: 0;
  border: 1px solid #dee1e5;
  bottom: 10px;
  color: #71217b;
  display: inline-flex;
  font-family: primary;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 20px;
  padding: 10px 20px;
  position: absolute;
  right: 10px;
`;

export const getWebComponentAttributes = (name: string) => {
  switch (name) {
    case 'default':
      return {};
    case 'friendly':
      return {
        'card-border-radius': '20',
        'card-drop-shadow': '0',
        'card-drop-shadow-y': '0',
        'card-drop-shadow-spread': '2',
        'card-drop-shadow-blur': '20',
        'card-drop-shadow-color': 'rgba(183, 194, 219, 0.34)',
      };
    case 'modern':
      return {
        'card-border-radius': '0',
        'card-drop-shadow': '0',
        'card-drop-shadow-y': '4',
        'card-drop-shadow-spread': '0',
        'card-drop-shadow-blur': '4',
        'card-drop-shadow-color': 'rgba(0, 0, 0, 0.2)',
      };
    default:
      return {};
  }
};

export const getThemeProps = (name: string) => {
  return {
    theme: getWebComponentAttributes(name),
  };
};

const generateThemeCode = (theme: string) => {
  const props = getWebComponentAttributes(theme);
  const propsAsString = Object.entries(props).reduce(
    (string, [prop, value]) => {
      if (string) {
        return `${string}\r\n  ${prop}="${value}"`;
      }

      return `\r\n  ${prop}="${value}"`;
    },
    ''
  );

  return `<!-- import the file -->
<script src="eps-credit-score-module-bundled.js"></script>

<!-- load the widget via a custom element -->
<credit-score-module
  token="{YOUR_TOKEN_HERE}"${propsAsString}
></credit-score-module>
`;
};

export const ThemeSelector = ({onChange,}: {
  onChange: (theme: string) => void;
}) => {
  const [theme, setTheme] = useState<string>('default');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    highlightjs.highlightAll();
    onChange(theme);
  }, [theme]);

  const handleCopyToClipboard = () => {
    const { current: input } = inputRef;
    const { current: button } = buttonRef;
    if (input && button) {
      input.select();
      input.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(input.value);

      const originalText = button.textContent;
      button.textContent = 'Copied to clipboard!';

      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    }
  };

  return (
    <>
      <ThemeDropdown
        onChange={e => {
          setTheme(e.target.value);
          onChange(e.target.value);
        }}
      >
        <option value='default'>Default</option>
        <option value='friendly'>Friendly</option>
        <option value='modern'>Modern</option>
      </ThemeDropdown>
      <ThemePreWrapper>
        <code className='language-html' style={{minWidth: 600}}>{generateThemeCode(theme)}</code>
        <ThemeButton
          ref={buttonRef}
          type='button'
          onClick={handleCopyToClipboard}
        >Copy</ThemeButton>
      </ThemePreWrapper>
      <HiddenTextArea
        ref={inputRef}
        readOnly
        value={generateThemeCode(theme)}
      />
    </>
  );
};
