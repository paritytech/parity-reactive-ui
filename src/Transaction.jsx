import React from 'react';
import PropTypes from 'prop-types';
import {Bond} from 'oo7';
import { ReactiveComponent, Rspan, Hash } from 'oo7-react';
import { Card, List, Icon} from 'semantic-ui-react';
import { formatBlockNumber, formatBalance } from 'oo7-parity';
import { InlineAccount, InlineBalance } from './';

// supports:
// gas: true,
// gasPrice: true,
// txHash: true,
// from: true,
// to: true,
// ether: true,
// blockHash: true,
// blockNumber: true,
// input: true,
// transactionIndex: true,

// condition: true,
// creates: true,
// networkId: true,
// nonce: true,
// publicKey: true,
// raw: true,
// signature: true,

const formatCondition = c => c ? (typeof(c) === timestamp ? new Date(c) : formatBlockNumber(c))
                               : '';

export class Transaction extends ReactiveComponent {
  constructor() {
    super(['transaction']);
  }

  render() {
    if (this.state.transaction === null || this.state.transaction === undefined){
      return (
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Icon name='warning circle' style={{height: '100%'}} />
              transaction undefined
            </Card.Description>
          </Card.Content>
        </Card>
      )
    } else {
      return (  <Card fluid>
                  <Card.Content>
                    <Card.Description>
                      <List divided verticalAlign='middle'>
                        {this.props.txHash ?  <List.Item>
                          <List.Content>
                            TXN Hash
                          </List.Content>
                          <List.Content floated='right'>
                            <Hash value={this.state.transaction.hash}></Hash>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.blockHash ? <List.Item>
                          <List.Content>
                            Block Hash
                          </List.Content>
                          <List.Content floated='right'>
                            <Hash value={this.state.transaction.blockHash}></Hash>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.blockNumber ? <List.Item>
                          <List.Content>
                            Block Number
                          </List.Content>
                          <List.Content floated='right'>
                            <Rspan>{formatBlockNumber(this.state.transaction.blockNumber)}</Rspan>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.from ?  <List.Item>
                          <List.Content>
                            From
                          </List.Content>
                          <List.Content floated='right'>
                            <InlineAccount address={this.state.transaction.from}></InlineAccount>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.to ?  <List.Item>
                          <List.Content>
                            To
                          </List.Content>
                          <List.Content floated='right'>
                            <InlineAccount address={this.state.transaction.to}></InlineAccount>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.ether ?  <List.Item>
                          <List.Content>
                            Amount
                          </List.Content>
                          <List.Content floated='right'>
                            <InlineBalance value={this.state.transaction.value} />
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.condition ? <List.Item>
                          <List.Content>
                            Condition
                          </List.Content>
                          <List.Content floated='right'>
                            <Rspan>{formatCondition(this.state.transaction.condition)}</Rspan>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.creates ? <List.Item>
                          <List.Content>
                            Creates
                          </List.Content>
                          <List.Content floated='right'>
                            <InlineAccount address={this.state.transaction.creates}></InlineAccount>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.gas ? <List.Item>
                          <List.Content>
                            Gas
                          </List.Content>
                          <List.Content floated='right'>
                            <Rspan>{this.state.transaction.gas.toString(10)}</Rspan>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.gasPrice ? <List.Item>
                          <List.Content>
                            Gas Price
                          </List.Content>
                          <List.Content floated='right'>
                            <InlineBalance value={this.state.transaction.gasPrice} />
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.input ? <List.Item>
                          <List.Content>
                            Input Data
                          </List.Content>
                          <List.Content floated='right'>
                            {/* Input is raw byte data */}
                            <Hash value={this.state.transaction.input.toString(16)}></Hash>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.networkId ? <List.Item>
                          <List.Content>
                            Network Id
                          </List.Content>
                          <List.Content floated='right'>
                            <Rspan>{this.state.transaction.networkId}</Rspan>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.nonce ? <List.Item>
                          <List.Content>
                            Nonce
                          </List.Content>
                          <List.Content floated='right'>
                            <Rspan>{this.state.transaction.nonce.toString(10)}</Rspan>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.publicKey ? <List.Item>
                          <List.Content>
                            Public Key
                          </List.Content>
                          <List.Content floated='right'>
                            <Hash value={this.state.transaction.publicKey}></Hash>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.signature ?
                        <List.Item>
                              <List.Content floated='right'>
                                <Hash value={this.state.transaction.r}></Hash>
                              </List.Content>
                              <List.Content>
                                R
                              </List.Content>

                              <List.Content floated='right'>
                                <Hash value={this.state.transaction.s}></Hash>
                              </List.Content>
                              <List.Content>
                                S
                              </List.Content>

                              <List.Content floated='right'>
                                <Rspan>{this.state.transaction.v}</Rspan>
                              </List.Content>
                              <List.Content>
                                V
                              </List.Content>

                              <List.Content floated='right'>
                                <Rspan>{this.state.transaction.standardV}</Rspan>
                              </List.Content>
                              <List.Content>
                                Standard V
                              </List.Content>
                        </List.Item>: "" }
                        {this.props.raw ? <List.Item>
                          <List.Content>
                            Raw
                          </List.Content>
                          <List.Content floated='right'>
                                {/* RAW BYTE DATA */}
                            <Hash value={this.state.transaction.raw.toString(16)}></Hash>
                          </List.Content>
                        </List.Item> : "" }
                        {this.props.transactionIndex ? <List.Item>
                          <List.Content>
                            TXN Index
                          </List.Content>
                          <List.Content floated='right'>
                            <Rspan>{this.state.transaction.transactionIndex.toString(10)}</Rspan>
                          </List.Content>
                        </List.Item> : "" }
                      </List>
                    </Card.Description>
                  </Card.Content>
                </Card>
      );
    }
  }
}

Transaction.defaultProps = {
  txHash: true,
  from: true,
  to: true,
  ether: true,
};

Transaction.propTypes = {
  transaction: PropTypes.oneOfType([PropTypes.instanceOf(Bond), PropTypes.object]),
  transactionIndex: PropTypes.bool,
  raw: PropTypes.bool,
  signature: PropTypes.bool,
  publicKey: PropTypes.bool,
  nonce: PropTypes.bool,
  networkId: PropTypes.bool,
  input: PropTypes.bool,
  gasPrice: PropTypes.bool,
  gas: PropTypes.bool,
  creates: PropTypes.bool,
  condition: PropTypes.bool,
  ether: PropTypes.bool,
  to: PropTypes.bool,
  from: PropTypes.bool,
  blockNumber: PropTypes.bool,
  txHash: PropTypes.bool,
  blockHash: PropTypes.bool
}
