import React from 'react';
import PropTypes from 'prop-types';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';
import {Label, Icon} from 'semantic-ui-react';

export function styleStatus (value) {
	return (
		value.requested ? { text: 'authorising', icon: 'key', color: 'orange', basic: true } :
		value.signed ? { text: 'signed', icon: 'check', color: 'green', basic: false } :
		value.failed ? { text: 'rejected', icon: 'x', color: 'grey', basic: true } :
		null
	);
}

export class SigningProgressLabel extends ReactiveComponent {
	constructor() {
		super(['value']);
	}
	render() {
		if (!this.state.value) {
			return (<span/>);
		}
		let status = styleStatus(this.state.value);
		return (<Label
			pointing={this.props.pointing}
			icon={this.props.showIcon ? (<Icon
				name={status.icon}
				loading={status.loading}
			/>) : null}
			color={this.props.color || status.color}
			basic={this.props.basic == null ? status.basic : this.props.basic}
			content={this.props.showContent ? status.text : null}
		/>);
	}
}
SigningProgressLabel.defaultProps = {
	showContent: true,
	showIcon: true,
	basic: null
};

SigningProgressLabel.propTypes = {
	value: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.object]),
	pointing: PropTypes.bool,
	showIcon: PropTypes.bool,
	color: PropTypes.string,
	basic: PropTypes.bool,
	showContent: PropTypes.bool,
}
