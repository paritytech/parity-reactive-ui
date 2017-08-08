import React from 'react';
import PropTypes from 'prop-types';
import { ReactiveComponent, Rdiv } from 'oo7-react';
import { InputBond, AddressBond, BalanceBond, Spoiler, DropdownBond, TransactionProgressLabel } from '../../';
import { Bond } from 'oo7';

import { Segment, Button, Label } from 'semantic-ui-react';

export default class Contract extends ReactiveComponent {
  constructor () {
    super(['contract', 'traceMode']);
    this.functionBond = new Bond();
  }

  render () {
    const c = this.state && this.state.contract;

    return (
      <Segment>
        {c
          ? <div>
            <Label content={this.props.contractName || 'Unknown Contract'} /><br />
            Function <br />
            <DropdownBond bond={ this.functionBond } options={ Object.keys(c).filter((f,j) => (typeof(c[f]) === 'function')).map((f,j) => ({text:f, value:f})) } fluid allowAdditions={false} />
            Function-Parameters <br />
            <Rdiv>
              {this.functionBond.map(f => {
                                  return <div>
                                          {c[f].args.map((arg,i) => {
                                                                      var b = new Bond();
                                                                      b.tie(v => c[f].params ? c[f].params[arg.name] = v : c[f].params = {[arg.name] : v});
                                                                      return <div key={i}>
                                                                                <Label content={`${arg.name} (${arg.type})`} />
                                                                                {arg.type === 'address' ? <AddressBond bond={b} /> : <InputBond key={i} bond={b} />}
                                                                              </div>})}
                                        </div>
              })}
            </Rdiv>
            <div style={{height:'30px'}}>
              <Button content='trace'
                      floated='right'
                      color='green'
                      onClick={() => this.functionBond.then((f,v) => {
                                  let tx = c[f].params
                                    ? c[f](...Object.keys(c[f].params).map(k => c[f].params[k]), {traceMode:this.state.traceMode})
                                    : c[f]({traceMode:this.state.traceMode});
                                  tx.then(o => {
                                    this.props.trace.changed(o);
                                    this.setState({txStatus:false});
                                  });
                                  this.setState({txStatus:true})
                                })}
                    loading={this.state.txStatus}
                    disabled={!(this.state.traceMode && this.props.trace)}
            />
            </div>
          </div>
        : null }
        </Segment>
    )
  }
}

Contract.PropTypes = {
  contract: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.object]),
  contractName: PropTypes.string,
  traceMode: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.array]),
  trace: PropTypes.instanceOf(Bond)
}
