import React from 'react';
import BigNumber from 'bignumber.js';
import blockies from 'blockies';

import {Bond, TimeBond, TransformBond} from 'oo7';
import {splitValue} from 'oo7-parity';
import {ReactiveComponent, Reactive} from 'oo7-react';

function createIdentityImage (address, scale = 8) {
	return blockies({
    	seed: (address || '').toLowerCase(),
    	size: 8,
    	scale
    }).toDataURL();
}

export class Balance extends ReactiveComponent {
	constructor() { super(['value']); }

	render () {
		if (this.state.value === null || typeof(this.state.value) == 'undefined')
			return (<span className="_undefined _balance">?</span>);
		var v = new BigNumber(this.state.value);
		var isNeg = v.lt(0);
		var s = splitValue(v.mul(isNeg ? -1 : 1));
		var a = ('' + s.base.mul(1000).round().div(1000)).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
		return (
			<span className={'_balance _' + denominations[s.denom]}>
				{isNeg ? "-" : this.props.signed ? "+" : ""}
				{a}
				<span className="_denom">
					{denominations[s.denom]}
				</span>
			</span>
		);
	}
}

export class BlockNumber extends ReactiveComponent {
	constructor() { super(['value']); }

	render() {
        let classes = this.props.classes === null ? '_blocknumber' : this.props.classes;
        let undefClasses = this.props.undefClasses === null ? '_blocknumber _undefined' : this.props.undefClasses;
        let undefContent = this.props.undefContent === null ? '?' : this.props.undefContent;
		if (this.state.value === null || typeof(this.state.value) == 'undefined')
			return (<span className={undefClasses}>{undefContent}</span>);
		var a = ('' + this.state.value).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
		return <span className={classes}>#{a}</span>;
	}
};

export class AccountIcon extends ReactiveComponent {
	constructor() { super(['address', 'className']); }

	render() {
		if (typeof(this.state.address) == "string") {
			return (<img
                src={createIdentityImage(this.state.address)}
                className={typeof(this.state.className) === 'string' ? this.state.className : ''}
                id={this.props.id}
                data-address-img
            />);
		} else {
			return (<span className={this.props.undefClassName}>{this.props.undefContent}</span>);
		}
	}
};
AccountIcon.defaultProps = {
	className: '_accountIcon',
	undefClassName: '_accountIcon _undefined',
	undefContent: '',
	id: null
}

export class Account extends ReactiveComponent {
	constructor() { super(['address'], {accountsInfo: parity.bonds.accountsInfo}); }

	render() {
		if (typeof(this.state.address) == "string") {
			let i = this.state.accountsInfo != null ? this.state.accountsInfo[parity.api.util.toChecksumAddress(this.state.address)] : null;
			var a = i == null ? this.state.address.substr(0, 8) + "…" + this.state.address.substr(38) : i.name;
			return (<span className="_account">
				{this.props.icon ? (<img src={createIdentityImage(this.state.address)} className={'_identigram'} data-address-img style={{marginRight: '0.5ex'}}/>) : ''}
				{this.props.text ? a : ''}
			</span>);
		} else {
			return <span className="undefined _account">[null]</span>;
		}
	}
};
Account.defaultProps = {
  icon: true,
  text: true
}

export class RichAccount extends ReactiveComponent {
	constructor() { super(['address']); }

	render() {
		if (typeof(this.state.address) == "string") {
			return <span><Account address={this.state.address}/> <Balance value={parity.api.eth.getBalance.blockBond(this.state.address)}/></span>;
		} else {
			return <span className="undefined _account">[null]</span>;
		}
	}
};

export class TransactionProgress extends ReactiveComponent {
	constructor() {
		super(['request']);
	}

	render () {
		if (typeof(this.state.request) != 'object' || this.state.request == null)
			return (<div className='_progress _null'/>);
		var x;
		if (x = this.state.request.requested)
			return (<div className='_progress _authorising'>Authorising transaction...</div>);
		if (x = this.state.request.signed)
			return (<div className='_progress _submitting'>Confirming transaction...</div>);
		if (x = this.state.request.confirmed)
			return (<div className='_progress _confirmed'>Confirmed at <BlockNumber value={x.blockNumber}/></div>);
		if (x = this.state.request.failed)
			return (<div className='_progress _failed'>Failed: {x.text}</div>);
		return (<div>???</div>);
	}
}

export class BalanceInput extends React.Component {
    constructor() {
		super();
        this.state = { value: 1 };
	}
}
