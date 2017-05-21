import React from 'react';
import {Api} from '@parity/parity.js';
import {Bond} from 'oo7';
import {ReactiveComponent, Rimg} from 'oo7-react';
import {bonds, isNullData} from 'oo7-parity';
import {Label, Input} from 'semantic-ui-react';
import {AccountIcon} from './AccountIcon';
import {InputBond} from './InputBond';

export class AddressInputBond extends InputBond {
	constructor () {
		super();

		bonds.addressOf = n => Bond.mapAll([bonds.registry.lookupAddress(n, 'A'), bonds.me], (reg, me) =>
			({ registry: isNullData(reg) ? null : reg, internal: n == 'null' ? '0x0000000000000000000000000000000000000000' : n == 'me' ? me : null })
		);
	}

	render () {
		return (<span><Input
			className={this.props.className}
			style={this.props.style}
			name={this.props.name}
			type='text'
			icon={this.state.ok
					? (<i style={{opacity: 1}} className='icon'>
						<AccountIcon
							style={{opacity: 1, border: '0.5em solid transparent'}}
							address={this.state.external}
						/></i>)
					: undefined}
			iconPosition='left'
			placeholder={this.props.placeholder}
			error={!this.state.ok}
			value={this.state.display}
			onChange={(e, v) => this.handleEdit(v.value, v)}
		/>
		{this.state.ok
			? ''
		: this.state.extra.noChecksum
			? (<Label pointing='left' color='orange' basic content='No checksum' />)
		: (<Label pointing='left' content='Unknown/invalid address' />)
		}
		</span>);
	}
}
AddressInputBond.defaultProps = {
	placeholder: '0xAddress, name or e-mail',
	validator: a => {
		let m = a.match(/^(0x)([a-fA-F0-9]+)$/);
		if (m) {
			if (m[2].length != 40) {
				return null;
			}
			let addr = '0x' + m[2];
			if (parity.api.util.toChecksumAddress(addr) === addr) {
				return { external: addr, internal: a, corrected: addr };
			}
			if (addr.toLowerCase() === addr) {
				return { external: addr, internal: a, corrected: addr, extra: { noChecksum: true } };
			}
			return null;
		}
		else {
			return bonds.addressOf(a).map(a => {
				let n = a.registry || a.internal;
				return n ? { external: n, internal: a } : null;
			});
		}
	},
	defaultValue: ''
};
