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

import React from 'react';
import {interpretRender, formatValueNoDenom, combineValue, defDenom, denominations} from 'oo7-parity';
import {Dropdown} from 'semantic-ui-react';
import {InputBond} from './InputBond';

export class BalanceBond extends InputBond {
	getUnits () {
		return this.state.ok ? denominations[this.state.internal ? this.state.internal.denom : 6] : null;
	}

	setUnits (v) {
		let s = this.state.internal;
		let d = denominations.indexOf(v);
		s.denom = d;
		this.state.internal = s;
		this.handleEdit(this.state.display);
	}

	handleBlur () {
		let s = this.state;
		if (typeof s.corrected === 'string') {
			s.display = s.corrected;
			delete s.corrected;
			this.setState(s);
		}
	}

	makeAction (p) {
		return p ? 'right' : (<Dropdown
			onChange={(_, v) => this.setUnits(v.value)}
			value={this.getUnits()}
			options={denominations
				.filter(x => x[0] === x[0].toLowerCase())
				.map(d => ({key: d, value: d, text: d}))
			}
		/>);
	}
}
BalanceBond.defaultProps = {
	placeholder: '0',
	defaultValue: '0',
	validator: (u, s) => {
		let q = u === '' ? { denom: 6, units: '0', decimals: '', origNum: '', origDenom: '' } : interpretRender(u, null);
		let d = q && q.denom !== null ? q.origNum : undefined;
		if (q) {
			defDenom(q, s.internal ? s.internal.denom : 6);
		}
		return q ? {
			internal: q,
			display: d,
			corrected: formatValueNoDenom(q),
			external: combineValue(q),
			ok: true
		} : null;
	}
};
