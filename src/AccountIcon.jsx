import React from 'react';
import PropTypes from 'prop-types';
import {Bond} from 'oo7';
import blockies from 'blockies';
import {Image} from 'semantic-ui-react';
import {ReactiveComponent} from 'oo7-react';

function createIdentityImage (address, scale = 8) {
	return blockies({
    	seed: (address || '').toLowerCase(),
    	size: 8,
    	scale
    }).toDataURL();
}

export class AccountIcon extends ReactiveComponent {
	constructor() { super(['address', 'className', 'style']); }

	render() {
		if (typeof(this.state.address) == "string") {
			return (<Image
				inline
				avatar={this.props.avatar}
                src={createIdentityImage(this.state.address)}
				style={Object.assign({borderRadius: '50%'}, this.state.style)}
                className={typeof(this.state.className) === 'string' ? this.state.className : ''}
                id={this.props.id}
                data-address-img
            />);
		} else {
			return (<span
				style={this.props.undefStyle}
				className={this.props.undefClassName}
			>{this.props.undefContent}</span>);
		}
	}
};
AccountIcon.defaultProps = {
	style: {},
	className: '_accountIcon',
	undefStyle: {},
	undefClassName: '_accountIcon _undefined',
	undefContent: '',
	id: null
}

AccountIcon.propTypes = {
	address: PropTypes.instanceof(Bond) || PropTypes.string,
	className: PropTypes.instanceof(Bond) || PropTypes.string,
	style: PropTypes.instanceof(Bond) || PropTypes.object
}
