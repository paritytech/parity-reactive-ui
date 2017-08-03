import React from 'react';
import PropTypes from 'prop-types';
import {TextArea} from 'semantic-ui-react';
import {Bond} from 'oo7';

export class TextAreaBond extends React.Component {
	constructor () {
		super();
		this.state = {
			display: null,
			internal: null,
			external: null,
			ok: false,
			extra: {},
		};
	}

	handleEdit(v) {
		let f = function (b) {
			if (typeof(b) === 'string') {
				b = { display: b, external: b, internal: b };
			}
			if (typeof(b) !== 'object') {
				throw { message: 'Invalid value returned from validity function. Must be object with internal and optionally external, display, blurred fields or null', b };
			}
			if (b === null) {
				this.setState({ok: false});
			} else {
				this.setState(s => {
					let i = b && b.hasOwnProperty('internal') ? b.internal : s.internal;
					return {
						ok: true,
						internal: i,
						display: typeof(b.display) === 'string' ? b.display : s.display,
						corrected: b.corrected,
						extra: b.extra || {},
						external: b && b.hasOwnProperty('external') ? b.external : i
					};
				});
			}
			if (this.props.bond instanceof Bond) {
				if (b === null) {
					this.props.bond.reset();
				} else {
					this.props.bond.changed(b && b.hasOwnProperty('external') ? b.external : b && b.hasOwnProperty('internal') ? b.internal : this.state.internal);
				}
			}
		}.bind(this);

		this.setState({display: v});

		if (typeof(this.props.validator) !== 'function') {
			f(v);
		} else {
			let a = v !== undefined && this.props.validator(v, this.state);
			if (a instanceof Promise || a instanceof Bond) {
				a.then(f);
			} else {
				f(a);
			}
		}
	}


	render () {
		return (<TextArea
			style={this.props.style}
			value={this.state.display || this.props.defaultValue}
			onChange={(e, v) => this.handleEdit(v.value)}
			autoHeight={this.props.autoHeight}
      rows={this.props.rows}
		/>);
	}
}

TextAreaBond.defaultProps = {
	defaultValue:'',
};

TextAreaBond.propTypes = {
	validator: PropTypes.func,
	style: PropTypes.object,
	defaultValue: PropTypes.string,
	autoHeight: PropTypes.bool,
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	bond: PropTypes.instanceOf(Bond),
}
