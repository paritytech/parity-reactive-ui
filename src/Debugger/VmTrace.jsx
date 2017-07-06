import React from 'react';
import ReactDOM from 'react-dom';
import { ReactiveComponent } from 'oo7-react';

import { Icon, Step, Segment, Grid, Label } from 'semantic-ui-react';

export default class VmTrace extends ReactiveComponent {
  constructor () {
    super(['vmTrace']);
    this.steps = [];
  }

  componentWillMount () {
    super.componentWillMount();
    this.setState({
      currentStep: this.props.defaultStep,
    });
  }

  handleChange (event) {
    let selectedStep = ReactDOM.findDOMNode(this.steps[event.target.value]);
    this.scrollbar.scrollTop = selectedStep.offsetTop;
    this.setState({
      currentStep: event.target.value
    });
  }

  render () {
    const id = this.state.currentStep;
    const opToStep = (op,i) => ({  active:id === i,
                                   completed: (id>=i),
                                   icon:'checkmark',
                                   onClick:(e, { active }) => !active ? this.setState({currentStep: i}) : null,
                                   title:'OpCode',
                                   ref: v => this.steps[i] = v,
                                   description: `${op.pc} PUSH ${op.ex.push.toString(16)}`});

    return (
      <Segment padded>
        {this.state.vmTrace ?
        <Grid>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div ref={v => this.scrollbar=v} style={{height:'200px', width:'350px', overflowY:'scroll', overflowX:'hidden', display:'inline-block'}} >
                <Step.Group size='mini' fluid vertical items={this.state.vmTrace.ops.map(opToStep)} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Label>Instruction</Label>
              <input type="range" min="0" max={this.state.vmTrace.ops.length-1} value={this.state.currentStep} id="fader" onChange={this.handleChange.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
         : null}
      </Segment>
    )
  }
}

VmTrace.defaultProps = {
  defaultStep: 0,
}
