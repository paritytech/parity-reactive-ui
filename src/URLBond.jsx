import {InputBond} from './InputBond.js';

export class URLBond extends InputBond {}
URLBond.defaultProps = {
	placeholder: 'https://...',
	validator: u => {
		try { return new URL(u) && u; } catch (e) {}
		u = 'http://' + u;
		try { return new URL(u) && u; } catch (e) {}
		return false;
	}
}
