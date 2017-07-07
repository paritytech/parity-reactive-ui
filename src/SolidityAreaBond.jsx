import {TextAreaBond} from './';

// import { validateCode, validateAbi, compile, getCompiler } from 'oo7-parity'; // parity/js/shared/utils validation.js and solidity.js

export class SolidityAreaBond extends TextAreaBond {}
SolidityAreaBond.defaultProps = {
  value: 'pragma solidity ^0.4.0;\n',
	validator: v => {
    /* TODO: validate code (validate func & compile) */
		return v ? {
			internal: v
		} : null;
	}
};
