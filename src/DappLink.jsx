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

import Api from '@parity/api'

export default function DappLink ({ children, className, to }, { api }) {
  const [, appId, params] = to.split('/');
  const onClick = () => api.shell.loadApp(appId, params);

  return (
    <div
      className={ [className].join(' ') }
      onClick={ onClick }
    >
      { children }
    </div>
  );
}

DappLink.contextTypes = {
  api: PropTypes.object.isRequired
};

DappLink.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired
};
