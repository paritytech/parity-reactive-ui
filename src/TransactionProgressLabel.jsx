import React from 'react';
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
TransactionProgressLabel.defaultProps = {
	showContent: true,
	showIcon: true,
	basic: null
};
