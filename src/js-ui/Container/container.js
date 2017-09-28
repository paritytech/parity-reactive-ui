// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import PropTypes from 'prop-types';

import { nodeOrStringProptype } from '@parity/shared/util/proptypes';

import Link from './Link';
import Title from './Title';

import styles from './container.css';

export default function Container ({ children, className, compact, dappLink, hover, light, link, onClick, onFocus, style, tabIndex, title }) {
  const props = {};

  if (Number.isInteger(tabIndex)) {
    props.tabIndex = tabIndex;
  }

  const card = (
    <div
      className={
        compact
          ? styles.compact
          : styles.padded
      }
      onClick={ onClick }
      onFocus={ onFocus }
    >
      <Title title={ title } />
      { children }
    </div>
  );

  const hoverCard = (
    hover
      ? (
        <div className={ styles.hoverOverlay }>
          { hover }
        </div>
      )
      : null
  );

  return (
    <div
      className={
        [
          styles.container,
          light
            ? styles.light
            : '',
          className
        ].join(' ')
      }
      style={ style }
      { ...props }
    >
      {
        link
          ? (
            <Link
              isDappLink={ dappLink }
              link={ link }
            >
              { card }
              { hoverCard }
            </Link>
          )
          : (
            <div className={ styles.cardContainer }>
              { card }
              { hoverCard }
            </div>
          )
      }
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  compact: PropTypes.bool,
  dappLink: PropTypes.bool,
  hover: PropTypes.node,
  light: PropTypes.bool,
  link: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  title: nodeOrStringProptype()
};
