import { InputBond } from './InputBond';

export class URLBond extends InputBond {}
URLBond.defaultProps = {
	placeholder: 'https://...',
	validator: u => {
		let x = (() => {
			try { return new URL(u); } catch (e) {}
			u = 'http://' + u;
			try { return new URL(u); } catch (e) {}
			return null;
		})();

		return x ? { internal: x, external: x.href, corrected: x.href } : null;
	},
	defaultValue: ''
};
