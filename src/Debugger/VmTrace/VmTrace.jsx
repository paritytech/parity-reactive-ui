import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { Recognizer } from '../../'
import { Label, List, Segment, Grid, Button } from 'semantic-ui-react';

export default class VmTrace extends ReactiveComponent {
  constructor () {
    super(['currentStep']);
    this.steps = [];
  }

  render () {
    const stepToDetails = (step, part) => {
      const { id, op, info } = step;
      return part === 0
      ? ([
          <List.Item key='pc'><Label content='program counter' /><List.Content floated='right' content={op.pc} /></List.Item>,
          <List.Item key='op'><Label content='operation' /><List.Content floated='right' content={info.name ? info.name : '?!'} /></List.Item>,
          <List.Item key='args'>
            <Label content='# arguments' /><List.Content floated='right' content={info.args} />
            <div>{info.args !== 0 ? op.stack.slice(-info.args, op.stack.length).map((arg,i) => {
              return <Recognizer key={i} value={arg} size='mini' />
            }) : null}</div>
          </List.Item>,
          <List.Item key='ret'><Label content='# returns' /><List.Content floated='right' content={info.ret} /></List.Item>,
          <List.Item key='cost'><Label content='gas cost' /><List.Content floated='right' content={op.cost} /></List.Item>,
        ])
      : ([
        <List.Item key='tier'><Label content='gas price tier' /><List.Content floated='right' content={info.tier} /></List.Item>,
        <List.Item key='sub'><Label content='sub-routine' /><List.Content floated='right' content={op.sub ? JSON.stringify(op.sub) : 'false'} /></List.Item>,
        <List.Item key='side'><Label content='side effects' /><List.Content floated='right' content={info.side_effects ? 'true' : 'false'} /></List.Item>,
        <List.Item key='exec'><Label content='execution' /><List.Content content={<OpExecution execution={op.ex} />} /></List.Item>,
      ])
    }
    return (
      <Segment padded>
        {this.state.currentStep ?
          <Grid padded divided>
            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <List relaxed='very' items={stepToDetails(this.state.currentStep, 0)} />
              </Grid.Column>
              <Grid.Column width={3}>
                <List relaxed='very' items={stepToDetails(this.state.currentStep, 1)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
         : null}
      </Segment>
    );
  }
}

export class OpExecution extends React.Component {
  constructor () {
    super();
  }

  render () {
    if (this.props.execution) {
      const { mem, push, store, used } = this.props.execution;
      return (
        <Segment padded color='red'>
          <List>
            <List.Item>
              <List.Content floated='right' content={JSON.stringify(mem)} /><Label content='memory' color='red'/>
            </List.Item>
            <List.Item>
              <Label content='push' color='red' />
              <List.Content floated='right' content={<Recognizer.Group values={push} color='grey' />} />
            </List.Item>
            <List.Item>
              <List.Content floated='right' content={JSON.stringify(store)} /><Label content='store' color='red' />
            </List.Item>
            <List.Item>
              <List.Content floated='right' content={used} /><Label content='used' color='red' />
            </List.Item>
          </List>
        </Segment>
      );
    } else {
      return null;
    }
  }
}
