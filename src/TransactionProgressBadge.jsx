import React from 'react';
import {ReactiveComponent} from 'oo7-react';
import {styles} from "./TransactionProgressBadgeStyles.js";

class TransactionProgressBadge extends ReactiveComponent {
	constructor() {
		super(['value']);
	}
	render() {
		if (!this.state.value) {
			return (<span/>);
		}
		let status =
			this.state.value.estimating ? 'estimating...' :
			this.state.value.requested ? 'signing...' :
			this.state.value.signed ? 'finalising...' :
			this.state.value.confirmed ? 'finalised' :
			this.state.value.failed ? 'cancelled' : 'unknown';

		return (<span style={styles.top}><span style={styles.left}>tx</span><span style={styles[status.replace('...', '')]}>{status}</span></span>);
	}
}

export { TransactionProgressBadge };
