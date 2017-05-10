import React from 'react';
//import 'semantic-ui-css/semantic.min.css';
import {Bond} from 'oo7';
import {ReactiveComponent, Rimg} from 'oo7-react';
import {isNullData} from 'oo7-parity';
import {Label, Input} from 'semantic-ui-react';
import {AccountIcon} from './AccountIcon.js';
import {InputBond} from './InputBond.js';

export class AddressInputBond extends InputBond {
	constructor () {
		super();

		parity.bonds.addressOf = n => Bond.mapAll([parity.bonds.registry.lookupAddress(n, 'A'), parity.bonds.me], (reg, me) =>
			({ registry: isNullData(reg) ? null : reg, internal: n == 'null' ? '0x0000000000000000000000000000000000000000' : n == 'me' ? me : null })
		);
	}

	render () {
		return (<span><Input
			className={this.props.className}
			style={this.props.style}
			name={this.props.name}
			type='text'
			icon={this.state.validity === null
					? undefined
				: this.state.validity.ok
					? (<i style={{opacity: 1}} className='icon'>
						<AccountIcon
							style={{opacity: 1, border: '0.5em solid transparent'}}
							address={this.state.validity.value}
						/></i>)
					: undefined}
			iconPosition='left'
			placeholder={this.props.placeholder}
			error={this.state.validity.ok === false}
			value={this.state.value}
			onChange={(e, v) => this.fixValue(v.value, v)}
		/>
		{this.state.validity === null
			? ''
		: this.state.validity.badLength
			? (<Label pointing='left' content='Too short' />)
		: this.state.validity.noChecksum
			? (<Label pointing='left' color='orange' basic content='No checksum' />)
		: this.state.validity.badChecksum
			? (<Label pointing='left' color='red' basic content='Bad checksum'/>)
		: !this.state.validity.ok && this.state.value
			? (<Label pointing='left' color='red' basic content='Unknown name'/>)
			: ''
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
				return { ok: false, value: null, badLength: true };
			}
			let addr = '0x' + m[2];
			if (parity.api.util.toChecksumAddress(addr) === addr) {
				return { ok: true, value: addr };
			}
			if (addr.toLowerCase() === addr) {
				return { ok: true, value: addr, noChecksum: true };
			}
			return { ok: false, value: null, badChecksum: true };
		}
		else {
			return parity.bonds.addressOf(a).map(a => {
				let n = a.registry || a.internal;
				return n ? { ok: true, value: n } : { ok: false, value: null };
			});
		}
	}
};
