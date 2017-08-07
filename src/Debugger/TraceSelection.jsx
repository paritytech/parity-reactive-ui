import React from 'react';
import PropTypes from 'prop-types';
import { ReactiveComponent } from 'oo7-react';
import { bonds } from 'oo7-parity';
import { Bond, TransformBond } from 'oo7';

import { DropdownBond } from '../';
import { Contract} from './';

const traceOptions = [{ text: 'trace', value: 'trace' }, { text: 'vmTrace', value: 'vmTrace' }, { text: 'stateDiff', value: 'stateDiff' }];
const traceMode = new Bond();

export default class TraceSelection extends ReactiveComponent {
  constructor () {
    super(['contracts', 'disabled', 'contractName']);

    this.contractBond = new Bond();
  }

  componentDidMount () {
    this.debugDeploy = this.debugDeploy.bind(this);
    this.contractBond.tie(this.debugDeploy);
  }

  render () {
    const contractKeys = Object.keys(this.state.contracts);
    const contractName = this.state.contractName || contractKeys[0];
    const contract = this.state.contracts[contractName];

    return (<div>
      {!this.state.disabled ? <div>
        TraceMode <DropdownBond bond={ traceMode } options={ traceOptions } fluid multiple allowAdditions={false} />
        Contract <DropdownBond bond={ this.contractBond } options={ contractKeys.map((name, i) => ({text:name, value: name}))} fluid defaultValue={contractName} allowAdditions={false} />
        {contract ?
          <Contract
            contract={ contract.deployed }
            trace={ this.props.trace }
            traceMode={ traceMode }
            contractName={ `Contract ${contractName}` }
          /> : <div>Select a contract ...</div>}
      </div> : null}
    </div>);
  }

  debugDeploy (contractName) {
    console.log('debugDeploy contractName', contractName);
    const contract = this.state.contracts[contractName];
    const bytecode = contract.bytecode;
    const abi = contract.interface;

    if (!contract.deployed) {
      let tx = bonds.deployContract(bytecode, JSON.parse(abi));

      tx.done(s => {
        console.log('txDone!');
        let address = s.deployed.address;

        contract.deployed = bonds.makeContract(address, JSON.parse(abi), [], true);
        contract.address = address;
        console.log('New Contract', contract);

        let contracts = this.state.contracts;
        contracts[contractName] = contract;
        this.setState({contracts: contracts, contractName});
      });
    } else {
      this.setState({contractName});
    }
  }
}

TraceSelection.PropTypes = {
  contracts: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.array]),
  disabled: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.bool]),
  trace: PropTypes.instanceOf(Bond)
}
