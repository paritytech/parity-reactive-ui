import React from 'react';
import PropTypes from 'prop-types';
import {Bond} from 'oo7';
import {ReactiveComponent} from 'oo7-react';
import {Label, Icon} from 'semantic-ui-react';

export function styleStatus (value) {
	return (
		value.initialising !== undefined || value.estimating !== undefined ? { text: 'estimating', icon: 'bullseye', color: 'blue', basic: true } :
		value.estimated ||
		value.requested ? { text: 'authorising', icon: 'key', color: 'orange', basic: true } :
		value.signed ? { text: 'finalising', icon: 'spinner', color: 'green', basic: true, loading: true } :
		value.confirmed ? { text: 'finalised', icon: 'check', color: 'green', basic: false } :
		value.failed ?
			value.failed.code == -32015 ? { text: 'invalid', icon: 'exclamation', color: 'red', basic: true } :
			value.failed.code == -32040 ? { text: 'rejected', icon: 'x', color: 'grey', basic: true } :
			null :
		null
	);
}

export class TransactionProgressLabel extends ReactiveComponent {
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
			color={this.props.color || status.color}
			basic={this.props.basic == null ? status.basic : this.props.basic}
		>
			{this.props.showIcon ? (<Icon
				name={status.icon}
				loading={status.loading}
			/>) : null}
			{this.props.showContent ? status.text : null}
			{this.props.total < 2 ? null : (
				<Label.Detail>{Math.min(this.props.total, this.props.current)} of {this.props.total}</Label.Detail>
			)}
		</Label>);
	}
}

TransactionProgressLabel.defaultProps = {
	showContent: true,
	showIcon: true,
	basic: null,
	current: 0,
	total: 0
};

TransactionProgressLabel.propTypes = {
	value: PropTypes.instanceof(Bond) || PropTypes.object,
	pointing: PropTypes.bool,
	color: PropTypes.string,
	showIcon: PropTypes.bool,
	basic: PropTypes.bool,
	showContent: PropTypes.bool,
	total: PropTypes.number,
	current: PropTypes.number
}
