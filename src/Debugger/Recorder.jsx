import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { AddressBond, HashBond, BalanceBond, DropdownBond, BButton } from '../';
import { bonds } from 'oo7-parity';
import { ReactiveComponent } from 'oo7-react';
import { Bond } from 'oo7';

const traceOptions = [{text:'trace', value:'trace'}, {text:'vmTrace', value:'vmTrace'}, {text:'stateDiff', value:'stateDiff'}];
const accOptionsBond = bonds.accounts.map(accs => accs.map(v => ({text:v,  value:v})).concat({text:'Donate Contract', value:'0xE3bcd8e92a74e33377B2750f2aB1650bbeb33f99'}));

import styles from './recorder.css';

export default class Recorder extends ReactiveComponent {
  constructor () {
    super([], {me:bonds.me, accountOptions:accOptionsBond });

    // options
    this.replayTx = new Bond(); // tx-hash
    this.replayTx.tie(a => this.setState({replayTx:a}));

    this.to = new Bond(); // tx-obj
    this.value = new Bond();
    this.from = new Bond();
    Bond.all([this.to,this.value,this.from]).tie(a => this.setState({to:a[0], value:a[1], from:a[2]}));

    this.traceMode = new Bond();  // trace-mode
  }

  render () {
    return (
      <Grid celled >
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Content floated='right'>
                  {this.state.accountOptions ? <DropdownBond bond={this.from} options={this.state.accountOptions} fluid /> : null} <br />
                </List.Content>
                <List.Content>
                  From:
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated='right'>
                  {this.state.accountOptions ? <DropdownBond bond={this.to} options={this.state.accountOptions} fluid /> : null} <br />
                </List.Content>
                <List.Content>
                  To:
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated='right'>
                  <BalanceBond bond={this.value} defaultValue={'1'} />
                </List.Content>
                <List.Content>
                  Value:
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Content floated='right'>
                  <HashBond bond={this.replayTx} />
                </List.Content>
                <List.Content>
                  TX-Hash:
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column>
            <div className='center'>
              <DropdownBond bond={this.traceMode} multiple allowAdditions={false} options={traceOptions}/>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column className='center'>
            <div className='center'>
              <BButton content='call TX'
                      onClick={() => bonds.callTx({to: this.to, value: this.value, from: this.from }, this.traceMode, 'latest').then(v => this.props.trace.changed(v))}
                      disabled={! (this.state.to && this.state.from && this.state.value)}/>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className='center'>
              <BButton content='replay'
                      onClick={() => bonds.replayTx(this.state.replayTx, this.traceMode).then(v => this.props.trace.changed(v))}
                      disabled={!this.state.replayTx}/>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
