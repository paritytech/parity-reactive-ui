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
  }

  componentDidMount () {
    this.debugDeploy = this.debugDeploy.bind(this);
    if (this.props.contractName) {
      this.props.contractName.tie(this.debugDeploy);
    } else {
      this.contractName = new Bond();
      this.contractName.tie(contractName => this.setState({contractName}));
      this.contractName.tie(this.debugDeploy);
    }
  }

  render () {
    const contracts = this.state.contracts || this.props.contracts;
    if (contracts && typeof(contracts) === 'object') {
      const contractKeys = Object.keys(contracts);
      const contractName = this.state.contractName || contractKeys[0];
      const contract = contracts[contractName];

      return (<div>
        {!this.state.disabled ? <div>
          TraceMode <DropdownBond bond={ traceMode } options={ traceOptions } fluid multiple allowAdditions={false} />
          Contract <DropdownBond bond={ this.props.contractName } options={ contractKeys.map((name, i) => ({text:name, value: name}))} fluid defaultValue={contractName} allowAdditions={false} />
          {contract && contract.deployed ?
            <Contract
              contract={ contract.deployed }
              trace={ this.props.trace }
              traceMode={ traceMode }
              contractName={ `Contract ${contractName}` }
            /> : <div>Select a contract (no interface)...</div>}
        </div> : null}
      </div>);
    } else {
      return <div>loading...</div>;
    }
  }

  debugDeploy (contractName) {
    const contract = this.state.contracts[contractName];
    const bytecode = contract.bytecode;
    const abi = contract.interface;

    if (!contract.deployed && bytecode && abi) {
      let tx = bonds.deployContract(bytecode, JSON.parse(abi));

      tx.done(s => {
        let address = s.deployed.address;

        contract.deployed = bonds.makeContract(address, JSON.parse(abi), [], true);
        contract.address = address;
        console.log('New Contract', contract);

        let contracts = this.state.contracts;
        contracts[contractName] = contract;
        this.setState({contracts: contracts});
      });
    }
  }
}

TraceSelection.PropTypes = {
  contracts: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.object]),
  contractName: PropTypes.instanceOf(Bond),
  disabled: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.bool]),
  trace: PropTypes.instanceOf(Bond)
}
