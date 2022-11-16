import * as React from 'react';
import styled from 'styled-components';
import {
  MenuItems,
  MenuMobileButton,
  MenuWrapper,
  MenuProps,
  VersionSwitcher,
  SearchBox,
  usePathPrefix,
} from '@redocly/developer-portal/ui';

import { theme } from '../theme';

export default function CustomMenu(props: MenuProps) {
  const { className, items, navbarHeight, location, apiVersionId, apiVersions, onVersionChange } = props;

  const [mobileOpened, setMobileOpened] = React.useState(false);

  const toggleMobile = React.useCallback(() => {
    setMobileOpened(!mobileOpened);
  }, [mobileOpened]);

  React.useEffect(() => {
    setMobileOpened(false);
  }, [location.pathname, location.hash]);

  return (
    <>
      <MenuMobileButton opened={mobileOpened} onClick={toggleMobile} />
      <MenuWrapper animate={true} opened={mobileOpened} navBarHeight={navbarHeight} className={className}>
        {(apiVersionId != null && apiVersions && apiVersions.length > 1 && (
          <VersionSwitcher apiVersionId={apiVersionId} apiVersions={apiVersions} onVersionChange={onVersionChange} />
        )) ||
          null}
        <SearchContainer>
          <SearchWrapper>
            <SearchBox pathPrefix={usePathPrefix()} location={props.location} className="searchBox" />
          </SearchWrapper>
        </SearchContainer>
        <MenuInnerWrapper>
          <MenuItems depth={0} items={items} />
        </MenuInnerWrapper>
      </MenuWrapper>
    </>
  );
}

export const MenuInnerWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  flex-grow: 1;
  padding-top: ${({ theme }) => theme.sidebar.spacing.offsetTop}px;

  ul:first-child {
    min-height: calc(100% - 1px); // 1px is a navbar gap
  }
`;

const SearchContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
`;

const SearchWrapper = styled.div`
  border-bottom: 1px solid #e4e7eb;
  padding: 10px 16px;
  input {
    font-family: 'Founders Grotesk Text Light', sans-serif;
    color: ${theme.colors.primary.main};
    &::placeholder {
      color: ${theme.colors.primary.main};
    }
    & + span {
      filter: invert(1);
    }
    max-width: none;
  }

  .searchBox {
    display: block;
    > span { width: 100%; }
    > ul {
      right: auto;
      left: 0;
    }
  }
`;
