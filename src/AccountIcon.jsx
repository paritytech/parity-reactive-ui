// (C) Copyright 2016-2017 Parity Technologies (UK) Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//         http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import blockies from 'blockies';
import React from 'react';
import {Image} from 'semantic-ui-react';
import {ReactiveComponent} from 'oo7-react';

function createIdentityImage (address, scale = 8) {
	return blockies({
		seed: (address || '').toLowerCase(),
		size: 8,
		scale
	}).toDataURL();
}

export class AccountIcon extends ReactiveComponent {
	constructor () {
		super(['address', 'className', 'style']);
	}

	render () {
		if (typeof this.state.address === 'string') {
			return (<Image
				inline
				avatar={this.props.avatar}
				src={createIdentityImage(this.state.address)}
				style={Object.assign({borderRadius: '50%'}, this.state.style)}
				className={typeof this.state.className === 'string' ? this.state.className : ''}
				id={this.props.id}
				data-address-img
			/>);
		} else {
			return (<span
				style={this.props.undefStyle}
				className={this.props.undefClassName}
			>{this.props.undefContent}</span>);
		}
	}
}

AccountIcon.defaultProps = {
	style: {},
	className: '_accountIcon',
	undefStyle: {},
	undefClassName: '_accountIcon _undefined',
	undefContent: '',
	id: null
};
