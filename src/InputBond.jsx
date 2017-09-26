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

/* eslint-disable react/prop-types */

import React from 'react';
import {Input} from 'semantic-ui-react';
import {Bond} from 'oo7';

export class InputBond extends React.Component {
	constructor () {
		super();
		this.state = {
			display: null,
			internal: null,
			external: null,
			ok: false,
			extra: {},
			onlyDefault: true
		};
		this.editLock = false;
	}

	componentDidMount () {
		if (this.props.bond && this.props.reversible) {
			this.tieKey = this.props.bond.tie(v => {
				this.handleEdit(v);
			});
		}
	}

	componentWillUnmount () {
		if (this.props.bond && this.props.reversible && this.tieKey) {
			this.props.bond.untie(this.tieKey);
		}
	}

	handleEdit (v, onlyDefault = false) {
		if (this.editLock) {
			return;
		}

		this.resetDefaultValueUpdate();

		let f = function (b) {
			if (typeof b === 'string') {
				b = { display: b, external: b, internal: b };
			}
			if (typeof b !== 'object') {
				throw new Error('Invalid value returned from validity function. Must be object with internal and optionally external, display, blurred fields or null');
			}
			if (b === null) {
				this.setState({ok: false});
			} else {
				this.setState(s => {
					let i = b && b.hasOwnProperty('internal') ? b.internal : s.internal;
					return {
						ok: true,
						internal: i,
						display: typeof b.display === 'string' ? b.display : s.display,
						corrected: b.corrected,
						extra: b.extra || {},
						onlyDefault,
						external: b && b.hasOwnProperty('external') ? b.external : i
					};
				});
			}
			/// Horrible duck-typing, necessary since the specific Bond class instance here is different to the other libraries since it's
			/// pre-webpacked in a separate preprocessing step.
			if (Bond.instanceOf(this.props.bond)) {
				if (b === null) {
					this.props.bond.reset();
				} else {
					this.editLock = true;
					this.props.bond.changed(b && b.hasOwnProperty('external') ? b.external : b && b.hasOwnProperty('internal') ? b.internal : this.state.internal);
					this.editLock = false;
				}
			}
		}.bind(this);

		this.setState({display: v, onlyDefault});

		if (typeof this.props.validator !== 'function') {
			f(v);
		} else {
			let a = v !== undefined && this.props.validator(v, this.state);
			if (a instanceof Promise || Bond.instanceOf(a)) {
				a.then(f);
			} else {
				f(a);
			}
		}
	}

	handleBlur () {
		this.setState(s => typeof s.corrected === 'string' && typeof s.display === 'string'
			? { display: s.corrected, corrected: undefined }
			: {}
		);
	}

	resetDefaultValueUpdate () {
		if (this.lastDefaultValueUpdate) {
			window.clearTimeout(this.lastDefaultValueUpdate);
			delete this.lastDefaultValueUpdate;
		}
	}

	render () {
		if (this.state.onlyDefault && typeof this.props.defaultValue === 'string' && this.state.display !== this.props.defaultValue) {
			this.resetDefaultValueUpdate();
			this.lastDefaultValueUpdate = window.setTimeout(() => { this.handleEdit(this.props.defaultValue, true); }, 0);
		}
		return (<Input
			className={this.props.className}
			style={this.props.style}
			name={this.props.name}
			children={this.props.children}
			disabled={this.props.disabled}
			fluid={this.props.fluid}
			placeholder={this.props.placeholder}
			inverted={this.props.inverted}
			loading={this.props.loading}
			size={this.props.size}
			transparent={this.props.transparent}
			type='text'
			value={this.state.display == null ? this.props.defaultValue : this.state.display}
			error={!this.state.ok}
			onKeyDown={this.props.onKeyDown}
			onChange={(e, v) => this.handleEdit(v.value)}
			onBlur={() => this.handleBlur()}
			action={this.makeAction ? this.makeAction() : this.props.action}
			label={this.makeLabel ? this.makeLabel() : this.props.label}
			labelPosition={this.makeLabel ? this.makeLabel(true) : this.props.labelPosition}
			icon={this.makeIcon ? this.makeIcon() : this.props.icon}
			iconPosition={this.makeIcon ? this.makeIcon(true) : this.props.iconPosition}
		/>);
	}
}

InputBond.defaultProps = {
	placeholder: '',
	defaultValue: '',
	reversible: false
};
