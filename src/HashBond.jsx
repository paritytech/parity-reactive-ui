import {InputBond} from './InputBond';

export class HashBond extends InputBond {}
HashBond.defaultProps = {
	placeholder: '0x...',
	validator: v => {
		let m = v.match(/(0x)?([a-fA-F0-9]{64})/);
		return m ? '0x' + m[2] : false;
	}
};
