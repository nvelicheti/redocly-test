import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import highlightjs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/github.css';
import { Grayscale, Secondary } from '../styles/colors';

highlightjs.registerLanguage('xml', xml);
highlightjs.registerLanguage('json', json);

const CodeContainer = styled.div`
  text-align: left;
  max-width: 80vw;
  pre {
    border: solid 1px #eee;y
    margin-bottom: 50px;
    border-radius: 10px;

    > code.hljs {
      border-radius: 10px;
    }
  }

  h1 {
    font-family: primary;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    color: ${Grayscale.gray80};
  }

  h2 {
    font-family: primary;
    font-weight: bold;
    font-size: 24px;
    color: ${Secondary.default};
  }

  h3 {
    font-family: primary;
    font-weight: bold;
    font-size: 20px;
    color: ${Grayscale.gray60};
  }

  p {
    font-family: primary;
    font-size: 14px;
  }

  p > code {
    color: ${Secondary.default};
    font-weight: 600;
  }
`;

const docs = 'IyMgR2V0dGluZyBTdGFydGVkCgpUaGUgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2R1bGUgYXJlIGRpdmlkZWQgYmV0d2VlbiBtb2R1bGUgcHJvcGVydGllcyBhbmQgc3R5bGUgcHJvcGVydGllczoKCiMjIyBNb2R1bGUgUHJvcGVydGllcwoKYGludG8tdGl0bGVgIAoKTW9kdWxlIFRpdGxlIChvcHRpb25hbCkKCmBpbmZvLXN1YnRpdGxlYCAKCk1vZHVsZSBTdWJ0aXRsZSAob3B0aW9uYWwpCgpgZGF0ZS1pbnRlcnZhbGAgCgpTdHJpbmcgZGF0ZSBpbnRlcnZhbCB0byBzaG93IHdoZW4gdGhlIG5leHQgY3JlZGl0IHNjb3JlIHdpbGwgYmUgYXZhaWxhYmxlIChvcHRpb25hbCkKCk9wdGlvbnM6IGBtb250aCB8IHllYXJgIERlZmF1bHRzIHRvIGBtb250aGAgCgpgZGF0ZS1pbnRlcnZhbC1udW1iZXJgIAoKTnVtYmVyIG9mIGludGVydmFscyB1bnRpbCB0aGUgbmV4dCBzY2hlZHVsdWVkIGNyZWRpdCBzY29yZSAob3B0aW9uYWwpCgpgc2hvdy1zY29yZS1wbG90dGVyYCAKClNob3dzIG9yIGhpZGVzIHRoZSBzY29yZSBwbG90dGVyIGdyYXBoIChvcHRpb25hbCkKCmBzaG93LXNjb3JlLXdoZWVsYCAKClNob3dzIG9yIGhpZGVzIHRoZSBzY29yZSB3aGVlbCAob3B0aW9uYWwpCgpgdG9rZW5gIAoKVXNlciB0b2tlbiAocmVxdWlyZWQpCgpgc2l6ZWAgCgpTaXppbmcgYnVja2V0IGZvciB0aGUgbW9kdWxlIChvcHRpb25hbCkKCk9wdGlvbnM6IGBhdXRvIHwgc21hbGwgfCBtZWRpdW0gfCBsYXJnZWAgCgpEZWZhdWx0cyB0byBgYXV0b2AgCgoKYGBgaHRtbAo8IS0tIGltcG9ydCB0aGUgZmlsZSAtLT4KPHNjcmlwdCBzcmM9ImVwcy1jcmVkaXQtc2NvcmUtbW9kdWxlLmpzIj48L3NjcmlwdD4KCjwhLS0gbG9hZCB0aGUgd2lkZ2V0IHZpYSBhIGN1c3RvbSBlbGVtZW50IC0tPgo8Y3JlZGl0LXNjb3JlLW1vZHVsZQogIGluZm8tdGl0bGU9InRpdGxlIgogIGluZm8tc3VidGl0bGU9InRoaXMgaXMgYSBzdWJ0aXRsZSIKICBzaXplPSJzbWFsbCIKICB0b25lPSJjYXN1YWwiCiAgdG9rZW49IntZT1VSX1RPS0VOX0hFUkV9Igo+PC9jcmVkaXQtc2NvcmUtbW9kdWxlPgpgYGAKCiMjIyBTdHlsZSBQcm9wZXJ0aWVzCgpTZWUgW1N0eWxpbmcgV2ViIENvbXBvbmVudHNdKGh0dHBzOi8va2lja3N0YXJ0LXRyYW5zZm9ybWF0aW9uLnJlYWRtZS5pby9tbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkvZG9jcy9zdHlsaW5nLWNvbXBvbmVudHMpCgombmJzcDsKCiMjIEN1c3RvbWl6YXRpb24KClRoZSBtb2R1bGUgY2FuIGJlIGN1c3RvbWl6ZWQgYnkgcGFzc2luZyBpdCBhIHVybCB0byBhIEpTT04gZmlsZSBjb250YWluaW5nIGFkZGl0aW9uYWwgY3VzdG9taXphdGlvbnMuIEZvciBleGFtcGxlLCBpZiB0aGUgZm9sbG93IGlzIHBsYWNlZCBpbiBgY29uZmlnLmpzb25gIGFuZCBsb2FkZWQgdmlhIHRoZSBjb25maWcKcHJvcCwgaXQgd2lsbCByZW1vdmUgdGhlIGJvcmRlciByYWRpdXMgb24gdGhlIG1vZHVsZS4KClNlZSByZWFkbWUgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzCgpgYGBqc29uCnsgImNhcmQiOiB7ICJib3JkZXJSYWRpdXMiOiAiMCIgfSB9CmBgYAoKYGBgaHRtbAo8IS0tIGltcG9ydCB0aGUgZmlsZSAtLT4KPHNjcmlwdCBzcmM9ImVwcy1jcmVkaXQtc2NvcmUtbW9kdWxlLmpzIj48L3NjcmlwdD4KCjwhLS0gbG9hZCB0aGUgd2lkZ2V0IHZpYSBhIGN1c3RvbSBlbGVtZW50IC0tPgo8Y3JlZGl0LXNjb3JlLW1vZHVsZQogIGluZm8tdGl0bGU9InRpdGxlIgogIGluZm8tc3VidGl0bGU9InRoaXMgaXMgYSBzdWJ0aXRsZSIKICBzaXplPSJzbWFsbCIKICB0b25lPSJjYXN1YWwiCiAgdG9rZW49IntZT1VSX1RPS0VOX0hFUkV9IgogIGNvbmZpZz0iaHR0cDovL3d3dy5leGFtcGxlLmNvbS9jb25maWcuanNvbiIKPjwvY3JlZGl0LXNjb3JlLW1vZHVsZT4KYGBgCg==';

export const DocsContainer = () => {

  useEffect(() => {
    highlightjs.highlightAll();
  }, []);

  return (
    <CodeContainer>
      <ReactMarkdown>{atob(docs)}</ReactMarkdown>
    </CodeContainer>
  );
};

export default DocsContainer;