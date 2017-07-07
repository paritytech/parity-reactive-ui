import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { bonds } from 'oo7-parity';
import { Bond } from 'oo7';
import { SolidityAreaBond, DropdownBond} from '../';

import { Grid, Checkbox, Button, Segment } from 'semantic-ui-react';

const DonationABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"moveFund","outputs":[],"payable":false,"type":"function"},
      							 {"constant":false,"inputs":[],"name":"donate","outputs":[],"payable":true,"type":"function"},{"inputs":[],"type":"constructor"},
      							 {"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"fundMoved","type":"event"}];

const versionOptions = [{longVersion:'v0.4.13-nightly.2017.7.6+commit.40d4ee49', path:'soljson-v0.4.13-nightly.2017.7.6%2Bcommit.40d4ee49.js'}]

const traceOptions = [{text:'trace', value:'trace'}, {text:'vmTrace', value:'vmTrace'}, {text:'stateDiff', value:'stateDiff'}];


export default class Editor extends ReactiveComponent {
  constructor () {
    super();

    this.traceMode = new Bond();
    this.version = new Bond();
    this.optimize = new Bond();
    this.autoCompile = new Bond();

    this.code = new Bond();

  }

  compile () {
    console.log('compile ...');
    this.setState({
      contracts: {errors:null, sources:null, contracts:{Donation:{bytecode:'DonationCode', interface:DonationABI}}}.contracts,
    });

    // this.version.then(v => {
      // this.setState({
      //   contracts: compile(this.code, getCompiler(v)),
      // });
    // });
  }

  deploy () {
    let dContracts = [];
    let k = Object.keys(this.state.contracts);
    k.map(c => {
      let i = this.state.contracts[c].interface;
      dContracts.push(bonds.makeContract('0xE3bcd8e92a74e33377B2750f2aB1650bbeb33f99', i, [], true));
    });

    this.setState({
      deployedContracts: dContracts,
    });
    console.log('deployedContracts');
    console.log(this.state.deployedContracts);
    let v = dContracts[0];
    let o = v.donate({value:1});
    console.log(o);
    o.then(tx => this.props.trace.changed(tx));
    o.then(tx => console.log(tx));

    // let dContracts = [];
    // this.contracts.map(c => {
    //   let i = this.state.contracts[c].interface;
    //       b = this.state.contracts[b].bytecode;
    //   dContracts.push(bonds.deployContract(b, validateAbi(i).abi))
    // });
    // this.setState({
    //    deployedContracts: dContracts;
    // })
  }

  render () {
    console.log('render');
    if (this.state && this.state.deployedContracts) {
      console.log(this.state.deployedContracts);
    }
    return (
      <Grid celled>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <SolidityAreaBond bond={this.code} style={{width:420, height:150}}/>
          </Grid.Column>
          <Grid.Column>
            <DropdownBond bond={this.traceMode} options={traceOptions} fluid multiple />
            <DropdownBond bond={this.version} options={versionOptions.map(v => ({text:v.longVersion, value:v.path}))} fluid/>
            <Checkbox toggle label='optimize' defaultChecked={false} onChange={(event, data) => this.optimize.changed(data.checked)}/>
            <Checkbox toggle label='autoCompile' defaultChecked={false} onChange={(event, data) => this.autoCompile.changed(data.checked)}/>
            <br />
            <Button content='compile' icon='settings' onClick={this.compile.bind(this)}/>
            <Button content='create' icon='tasks' onClick={this.deploy.bind(this)} disabled={!this.state.contracts}/>
            {(this.state && this.state.deployedContracts) ? this.state.deployedContracts.map((d,i) => {
              <Segment key={i}>
              {Object.keys(d).map((f,j) => (typeof(d[f]) === 'function') ? <Button key={j} content={f} onClick={() => d[f]()}/> : console.log(d[f]))}
              </Segment>
            }) : <div>Null</div>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}
