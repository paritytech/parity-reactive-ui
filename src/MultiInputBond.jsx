import React from 'react';
import PropTypes from 'prop-types';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';
import {AddressBond} from './AddressBond';
import {HashBond} from './HashBond';
import {InputBond} from './InputBond';

export class MultiInputBond extends ReactiveComponent {
	constructor () {
		super(['type', 'defaultValue', 'disabled', 'enabled']);
	}

	readyRender () {
		return this.state.type === 'address' ? (<AddressBond
				bond={this.props.bond}
				placeholder={this.props.placeholder}
				defaultValue={this.state.defaultValue}
				action={this.props.action}
				disabled={this.state.disabled || !this.state.enabled}
			/>) : this.state.type === 'hash' ? (<HashBond
				bond={this.props.bond}
				placeholder={this.props.placeholder}
				defaultValue={this.state.defaultValue}
				action={this.props.action}
				disabled={this.state.disabled || !this.state.enabled}
			/>) : this.state.type === 'string' ? (<InputBond
				bond={this.props.bond}
				placeholder={this.props.placeholder}
				defaultValue={this.state.defaultValue}
				action={this.props.action}
				disabled={this.state.disabled || !this.state.enabled}
			/>) : (<span/>);
	}
}
MultiInputBond.defaultProps = {
	defaultValue: '',
	disabled: false,
	enabled: true
};

MultiInputBond.propTypes = {
	type: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.string]),
	defaultValue: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.string]),
	disabled: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.bool]),
	enabled: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.bool]),
	bond: PropTypes.instanceOf(Bond),
	action: PropTypes.any,
	placeholder: PropTypes.string
}
