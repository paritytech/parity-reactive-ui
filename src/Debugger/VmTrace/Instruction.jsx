import React from 'react';
import ReactDOM from 'react-dom';
import { ReactiveComponent } from 'oo7-react';
import { Recognizer } from '../../';

import { List, Segment } from 'semantic-ui-react';

export default class Instruction extends ReactiveComponent {
  constructor () {
    super(['vmTrace', 'currentIndex']);
    this.steps = [];
  }

  componentDidUpdate () {
    this.props.currentIndex.then(this.handleChange.bind(this));
  }

  handleChange (index) {
    let selectedStep = ReactDOM.findDOMNode(this.steps[index]);
    this.scrollbar.scrollTop = selectedStep.offsetTop - 20;
  }

  render () {
    const code = this.state.vmTrace.code;
    const opToStep = (op,i) => {
			let info = Instructions[code[op.pc]];
      let name = (typeof(info) != "undefined") ? info.name : "!?";
			return { key: i,
               active:this.state.currentIndex === i,
               onClick:(e, { active }) => !active ? this.props.currentIndex.changed(i) : null,
               content: <span> {`${op.pc} ${name} `} {op.ex.push.length !== 0 ? <Recognizer.Group values={op.ex.push} /> : ''} </span>,
               ref: v => this.steps[i] = v,
               }
		};

    return (
      <Segment padded>
        <div ref={v => this.scrollbar=v} style={{height:'200px', width:'350px', overflowY:'scroll', overflowX:'hidden', display:'inline-block'}} >
          {this.state.vmTrace
  					? <List link items={this.state.vmTrace.ops.map(opToStep.bind(this))} />
           	: null}
        </div>
      </Segment>
    )
  }
}

Instruction.defaultProps = {
  currentIndex: 0,
}



export const Instructions = {
	"STOP": 0x00,
	"ADD": 0x01,
	"MUL": 0x02,
	"SUB": 0x03,
	"DIV": 0x04,
	"SDIV": 0x05,
	"MOD": 0x06,
	"SMOD": 0x07,
	"ADDMOD": 0x08,
	"MULMOD": 0x09,
	"EXP": 0x0a,
	"SIGNEXTEND": 0x0b,
	"LT": 0x10,
	"GT": 0x11,
	"SLT": 0x12,
	"SGT": 0x13,
	"EQ": 0x14,
	"ISZERO": 0x15,
	"AND": 0x16,
	"OR": 0x17,
	"XOR": 0x18,
	"NOT": 0x19,
	"BYTE": 0x1a,
	"SHA3": 0x20,
	"ADDRESS": 0x30,
	"BALANCE": 0x31,
	"ORIGIN": 0x32,
	"CALLER": 0x33,
	"CALLVALUE": 0x34,
	"CALLDATALOAD": 0x35,
	"CALLDATASIZE": 0x36,
	"CALLDATACOPY": 0x37,
	"CODESIZE": 0x38,
	"CODECOPY": 0x39,
	"GASPRICE": 0x3a,
	"EXTCODESIZE": 0x3b,
	"EXTCODECOPY": 0x3c,
	"BLOCKHASH": 0x40,
	"COINBASE": 0x41,
	"TIMESTAMP": 0x42,
	"NUMBER": 0x43,
	"DIFFICULTY": 0x44,
	"GASLIMIT": 0x45,
	"POP": 0x50,
	"MLOAD": 0x51,
	"MSTORE": 0x52,
	"MSTORE8": 0x53,
	"SLOAD": 0x54,
	"SSTORE": 0x55,
	"JUMP": 0x56,
	"JUMPI": 0x57,
	"PC": 0x58,
	"MSIZE": 0x59,
	"GAS": 0x5a,
	"JUMPDEST": 0x5b,
	"PUSH1": 0x60,
	"PUSH2": 0x61,
	"PUSH3": 0x62,
	"PUSH4": 0x63,
	"PUSH5": 0x64,
	"PUSH6": 0x65,
	"PUSH7": 0x66,
	"PUSH8": 0x67,
	"PUSH9": 0x68,
	"PUSH10": 0x69,
	"PUSH11": 0x6a,
	"PUSH12": 0x6b,
	"PUSH13": 0x6c,
	"PUSH14": 0x6d,
	"PUSH15": 0x6e,
	"PUSH16": 0x6f,
	"PUSH17": 0x70,
	"PUSH18": 0x71,
	"PUSH19": 0x72,
	"PUSH20": 0x73,
	"PUSH21": 0x74,
	"PUSH22": 0x75,
	"PUSH23": 0x76,
	"PUSH24": 0x77,
	"PUSH25": 0x78,
	"PUSH26": 0x79,
	"PUSH27": 0x7a,
	"PUSH28": 0x7b,
	"PUSH29": 0x7c,
	"PUSH30": 0x7d,
	"PUSH31": 0x7e,
	"PUSH32": 0x7f,
	"DUP1": 0x80,
	"DUP2": 0x81,
	"DUP3": 0x82,
	"DUP4": 0x83,
	"DUP5": 0x84,
	"DUP6": 0x85,
	"DUP7": 0x86,
	"DUP8": 0x87,
	"DUP9": 0x88,
	"DUP10": 0x89,
	"DUP11": 0x8a,
	"DUP12": 0x8b,
	"DUP13": 0x8c,
	"DUP14": 0x8d,
	"DUP15": 0x8e,
	"DUP16": 0x8f,
	"SWAP1": 0x90,
	"SWAP2": 0x91,
	"SWAP3": 0x92,
	"SWAP4": 0x93,
	"SWAP5": 0x94,
	"SWAP6": 0x95,
	"SWAP7": 0x96,
	"SWAP8": 0x97,
	"SWAP9": 0x98,
	"SWAP10": 0x99,
	"SWAP11": 0x9a,
	"SWAP12": 0x9b,
	"SWAP13": 0x9c,
	"SWAP14": 0x9d,
	"SWAP15": 0x9e,
	"SWAP16": 0x9f,
	"LOG0": 0xa0,
	"LOG1": 0xa1,
	"LOG2": 0xa2,
	"LOG3": 0xa3,
	"LOG4": 0xa4,
	"CREATE": 0xf0,
	"CALL": 0xf1,
	"CALLCODE": 0xf2,
	"RETURN": 0xf3,
	"DELEGATECALL": 0xf4,
	"SUICIDE": 0xff,
};

const GasPriceTier = {
	Zero: 0,
	Base: 1,
	VeryLow: 2,
	Low: 3,
	Mid: 4,
	High: 5,
	Ext: 6,
	Special: 7,
	Invalid: 8
};

Instructions[Instructions.STOP] = { name: 'STOP', additional: 0, args: 0, ret: 0, side_effects: true, tier: GasPriceTier.Zero };
Instructions[Instructions.ADD] = { name: 'ADD', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SUB] = { name: 'SUB', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.MUL] = { name: 'MUL', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Low };
Instructions[Instructions.DIV] = { name: 'DIV', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Low };
Instructions[Instructions.SDIV] = { name: 'SDIV', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Low };
Instructions[Instructions.MOD] = { name: 'MOD', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Low };
Instructions[Instructions.SMOD] = { name: 'SMOD', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Low };
Instructions[Instructions.EXP] = { name: 'EXP', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Special };
Instructions[Instructions.NOT] = { name: 'NOT', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.LT] = { name: 'LT', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.GT] = { name: 'GT', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SLT] = { name: 'SLT', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SGT] = { name: 'SGT', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.EQ] = { name: 'EQ', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.ISZERO] = { name: 'ISZERO', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.AND] = { name: 'AND', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.OR] = { name: 'OR', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.XOR] = { name: 'XOR', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.BYTE] = { name: 'BYTE', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.ADDMOD] = { name: 'ADDMOD', additional: 0, args: 3, ret: 1, side_effects: false, tier: GasPriceTier.Mid };
Instructions[Instructions.MULMOD] = { name: 'MULMOD', additional: 0, args: 3, ret: 1, side_effects: false, tier: GasPriceTier.Mid };
Instructions[Instructions.SIGNEXTEND] = { name: 'SIGNEXTEND', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Low };
Instructions[Instructions.SHA3] = { name: 'SHA3', additional: 0, args: 2, ret: 1, side_effects: false, tier: GasPriceTier.Special };
Instructions[Instructions.ADDRESS] = { name: 'ADDRESS', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.BALANCE] = { name: 'BALANCE', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.Ext };
Instructions[Instructions.ORIGIN] = { name: 'ORIGIN', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.CALLER] = { name: 'CALLER', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.CALLVALUE] = { name: 'CALLVALUE', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.CALLDATALOAD] = { name: 'CALLDATALOAD', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.CALLDATASIZE] = { name: 'CALLDATASIZE', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.CALLDATACOPY] = { name: 'CALLDATACOPY', additional: 0, args: 3, ret: 0, side_effects: true, tier: GasPriceTier.VeryLow };
Instructions[Instructions.CODESIZE] = { name: 'CODESIZE', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.CODECOPY] = { name: 'CODECOPY', additional: 0, args: 3, ret: 0, side_effects: true, tier: GasPriceTier.VeryLow };
Instructions[Instructions.GASPRICE] = { name: 'GASPRICE', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.EXTCODESIZE] = { name: 'EXTCODESIZE', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.Ext };
Instructions[Instructions.EXTCODECOPY] = { name: 'EXTCODECOPY', additional: 0, args: 4, ret: 0, side_effects: true, tier: GasPriceTier.Ext };
Instructions[Instructions.BLOCKHASH] = { name: 'BLOCKHASH', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.Ext };
Instructions[Instructions.COINBASE] = { name: 'COINBASE', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.TIMESTAMP] = { name: 'TIMESTAMP', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.NUMBER] = { name: 'NUMBER', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.DIFFICULTY] = { name: 'DIFFICULTY', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.GASLIMIT] = { name: 'GASLIMIT', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.POP] = { name: 'POP', additional: 0, args: 1, ret: 0, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.MLOAD] = { name: 'MLOAD', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.MSTORE] = { name: 'MSTORE', additional: 0, args: 2, ret: 0, side_effects: true, tier: GasPriceTier.VeryLow };
Instructions[Instructions.MSTORE8] = { name: 'MSTORE8', additional: 0, args: 2, ret: 0, side_effects: true, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SLOAD] = { name: 'SLOAD', additional: 0, args: 1, ret: 1, side_effects: false, tier: GasPriceTier.Special };
Instructions[Instructions.SSTORE] = { name: 'SSTORE', additional: 0, args: 2, ret: 0, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.JUMP] = { name: 'JUMP', additional: 0, args: 1, ret: 0, side_effects: true, tier: GasPriceTier.Mid };
Instructions[Instructions.JUMPI] = { name: 'JUMPI', additional: 0, args: 2, ret: 0, side_effects: true, tier: GasPriceTier.High };
Instructions[Instructions.PC] = { name: 'PC', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.MSIZE] = { name: 'MSIZE', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.GAS] = { name: 'GAS', additional: 0, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.Base };
Instructions[Instructions.JUMPDEST] = { name: 'JUMPDEST', additional: 0, args: 0, ret: 0, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.PUSH1] = { name: 'PUSH1', additional: 1, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH2] = { name: 'PUSH2', additional: 2, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH3] = { name: 'PUSH3', additional: 3, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH4] = { name: 'PUSH4', additional: 4, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH5] = { name: 'PUSH5', additional: 5, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH6] = { name: 'PUSH6', additional: 6, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH7] = { name: 'PUSH7', additional: 7, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH8] = { name: 'PUSH8', additional: 8, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH9] = { name: 'PUSH9', additional: 9, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH10] = { name: 'PUSH10', additional: 10, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH11] = { name: 'PUSH11', additional: 11, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH12] = { name: 'PUSH12', additional: 12, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH13] = { name: 'PUSH13', additional: 13, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH14] = { name: 'PUSH14', additional: 14, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH15] = { name: 'PUSH15', additional: 15, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH16] = { name: 'PUSH16', additional: 16, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH17] = { name: 'PUSH17', additional: 17, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH18] = { name: 'PUSH18', additional: 18, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH19] = { name: 'PUSH19', additional: 19, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH20] = { name: 'PUSH20', additional: 20, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH21] = { name: 'PUSH21', additional: 21, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH22] = { name: 'PUSH22', additional: 22, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH23] = { name: 'PUSH23', additional: 23, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH24] = { name: 'PUSH24', additional: 24, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH25] = { name: 'PUSH25', additional: 25, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH26] = { name: 'PUSH26', additional: 26, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH27] = { name: 'PUSH27', additional: 27, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH28] = { name: 'PUSH28', additional: 28, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH29] = { name: 'PUSH29', additional: 29, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH30] = { name: 'PUSH30', additional: 30, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH31] = { name: 'PUSH31', additional: 31, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.PUSH32] = { name: 'PUSH32', additional: 32, args: 0, ret: 1, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP1] = { name: 'DUP1', additional: 0, args: 1, ret: 2, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP2] = { name: 'DUP2', additional: 0, args: 2, ret: 3, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP3] = { name: 'DUP3', additional: 0, args: 3, ret: 4, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP4] = { name: 'DUP4', additional: 0, args: 4, ret: 5, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP5] = { name: 'DUP5', additional: 0, args: 5, ret: 6, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP6] = { name: 'DUP6', additional: 0, args: 6, ret: 7, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP7] = { name: 'DUP7', additional: 0, args: 7, ret: 8, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP8] = { name: 'DUP8', additional: 0, args: 8, ret: 9, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP9] = { name: 'DUP9', additional: 0, args: 9, ret: 10, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP10] = { name: 'DUP10', additional: 0, args: 10, ret: 11, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP11] = { name: 'DUP11', additional: 0, args: 11, ret: 12, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP12] = { name: 'DUP12', additional: 0, args: 12, ret: 13, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP13] = { name: 'DUP13', additional: 0, args: 13, ret: 14, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP14] = { name: 'DUP14', additional: 0, args: 14, ret: 15, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP15] = { name: 'DUP15', additional: 0, args: 15, ret: 16, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.DUP16] = { name: 'DUP16', additional: 0, args: 16, ret: 17, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP1] = { name: 'SWAP1', additional: 0, args: 2, ret: 2, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP2] = { name: 'SWAP2', additional: 0, args: 3, ret: 3, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP3] = { name: 'SWAP3', additional: 0, args: 4, ret: 4, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP4] = { name: 'SWAP4', additional: 0, args: 5, ret: 5, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP5] = { name: 'SWAP5', additional: 0, args: 6, ret: 6, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP6] = { name: 'SWAP6', additional: 0, args: 7, ret: 7, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP7] = { name: 'SWAP7', additional: 0, args: 8, ret: 8, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP8] = { name: 'SWAP8', additional: 0, args: 9, ret: 9, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP9] = { name: 'SWAP9', additional: 0, args: 10, ret: 10, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP10] = { name: 'SWAP10', additional: 0, args: 11, ret: 11, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP11] = { name: 'SWAP11', additional: 0, args: 12, ret: 12, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP12] = { name: 'SWAP12', additional: 0, args: 13, ret: 13, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP13] = { name: 'SWAP13', additional: 0, args: 14, ret: 14, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP14] = { name: 'SWAP14', additional: 0, args: 15, ret: 15, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP15] = { name: 'SWAP15', additional: 0, args: 16, ret: 16, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.SWAP16] = { name: 'SWAP16', additional: 0, args: 17, ret: 17, side_effects: false, tier: GasPriceTier.VeryLow };
Instructions[Instructions.LOG0] = { name: 'LOG0', additional: 0, args: 2, ret: 0, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.LOG1] = { name: 'LOG1', additional: 0, args: 3, ret: 0, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.LOG2] = { name: 'LOG2', additional: 0, args: 4, ret: 0, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.LOG3] = { name: 'LOG3', additional: 0, args: 5, ret: 0, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.LOG4] = { name: 'LOG4', additional: 0, args: 6, ret: 0, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.CREATE] = { name: 'CREATE', additional: 0, args: 3, ret: 1, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.CALL] = { name: 'CALL', additional: 0, args: 7, ret: 1, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.CALLCODE] = { name: 'CALLCODE', additional: 0, args: 7, ret: 1, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.RETURN] = { name: 'RETURN', additional: 0, args: 2, ret: 0, side_effects: true, tier: GasPriceTier.Zero };
Instructions[Instructions.DELEGATECALL] = { name: 'DELEGATECALL', additional: 0, args: 6, ret: 1, side_effects: true, tier: GasPriceTier.Special };
Instructions[Instructions.SUICIDE] = { name: 'SUICIDE', additional: 0, args: 1, ret: 0, side_effects: true, tier: GasPriceTier.Zero };

export function get_info(opcode) {
	return Instructions[opcode];
}
