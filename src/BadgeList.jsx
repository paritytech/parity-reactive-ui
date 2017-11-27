const React = require('react');
const { ReactiveComponent } = require('oo7-react');
const { bonds } = require('oo7-parity');

class BadgeList extends ReactiveComponent {
	constructor () {
		super(['badges']);
	}
	render () {
		// WIP
		return <div>-</div>;
	}
}

module.exports = { BadgeList };
