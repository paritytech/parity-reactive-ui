import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { formatToExponential } from 'oo7-parity';
import { InlineBalance, InlineAccount, Hash } from './';

import { Button } from 'semantic-ui-react';

// props: color, size, value, hints(['timestamp']), basic, iconButton, button (bool)
export class Recognizer extends ReactiveComponent {
  constructor () {
    super(['value']);
  }

  componentWillMount () {
    super.componentWillMount();
    this.state = {
      detailedView: this.props.detailedView,
    }
  }

  render () {
    const color = this.state.detailedView ? 'orange' : this.props.color,
          content = this.state.detailedView ? this.state.value : recognize(this.state.value, this.props.hints),
          onClick = () => this.setState({detailedView:!this.state.detailedView});
    if (this.state.value) {
      if (this.props.iconButton) {
        return <Button basic={this.props.basic}
                icon='refresh'
                color={color}
                size={this.props.size}
                labelPosition='left'
                label={{color: color, pointing: 'right', content: content }}
                onClick={onClick} />
      }
      if (this.props.button) {
        return <Button basic={this.props.basic}
                color={color}
                size={this.props.size}
                content={content}
                onClick={onClick} />
      }
      if (/^(0x)?([0-9a-fA-F]+)$/.test(this.state.value)){
        return (<button style={{background:'none', border:'none', color:color}} onClick={onClick}>
          {content}
        </button>);
      }
      return <span>{content}</span>;
    } else {
      return null;
    }
  }

  static Group = getRecognizerGroup;
}

Recognizer.defaultProps = {
  color: 'olive',
  detailedView: false,
  iconButton: false,
  button: false,
  hints: [],
}

function getRecognizerGroup (props) {
  return <RecognizerGroup values={props.values} color={props.color} size={props.size} button={props.button} iconButton={props.iconButton} basic={props.basic} />
}

export class RecognizerGroup extends ReactiveComponent {
  constructor () {
    super(['values']);
  }

  render () {
    return (
      <span>
        {this.state.values.map((v,i) => <Recognizer key={i} value={v} color={this.props.color} size={this.props.size} button={this.props.button} iconButton={this.props.iconButton} basic={this.props.basic} />)}
      </span>
    )
  }
}

RecognizerGroup.defaultProps = {
  basic: true,
  size: 'mini',
}

export function recognize (v, hints) {
  if (v && /^(0x)?([0-9a-fA-F]+)$/.test(v)) {
    if (v.length>= 0 && v.length <= 7){ // small int 0x10000 (<65536) [length: 5]
      return parseInt(v,16);
    }
    if (v.length >=12 && v.length <= 13 && hints.includes('timestamp')){ // timestamp [length: 10-11] or ether value [length: 10-20 (default)]
      return new Date(v.slice(2));
    }
    if (v.length >= 12 && v.length <= 26) { // ether value E8D4A51000 = 10^12, 10^24 [length: 10-24]
      return <InlineBalance value={v} />;
    }
    if (v.length >= 40 && v.length <= 42) { // Address [length: 40-42]
      return <InlineAccount address={v} />;
    }
    if (v.length >= 64 && v.length <= 66) {
      if (/^(0x)?(0{59})(10{4}|0[0-9a-fA-F]{4})$/.test(v)){ // small int 0x10000 (<65536)
        return parseInt(v,16);
      }
      if (/^(0x)?(0{53})([0-9a-fA-F]{11})$/.test(v) && // timestamp 0xDC6ACFAC00 = 946684800000 (1 Jan 2000) | 0x1941F297C00 = 1735689600000 (1 Jan 2025)  [length: 10-11]
      (parseInt(v.slice(53), 16) > 946684800000 &&
       parseInt(v.slice(53), 16) < 1735689600000) &&
       hints.includes('timestamp')) {
         return new Date(parseInt(v.slice(54), 16));
       }
       if (/^(0x)?(0{40})([0-9a-fA-F]{24})$/.test(v) && // ether value E8D4A51000 = 10^12 , 10^24 [length: 10-20]
            parseInt(v.slice(44), 16) >= 10000000000 &&
            parseInt(v.slice(44), 16) <= 1000000000000000000000000) {
         return <InlineBalance value={v} />;
       }
       if (/^(0x)?([a-fA-F0-9]{40})$/.test(v)){ // Address [length: 40-42]
         return <InlineAccount address={v} />;
       }
      if (/(0x)?([a-fA-F0-9]{64})/.test(v)) { // Hash [length: 64-66]
        return <Hash value={v} />
      };
    }
  }
  if (/(0x)?([0-9]+)/.test(v)) {
    return formatToExponential(v,4);
    // return `${/0x/.test(v) ? parseInt(v.substr(2,4),16) : v.substr(0,4)} e^${/0x/.test(v) ? v.length-6 : v.length-4}`
  }
  return v; // `Could not interpret the value: ${v} !` ~> String
}
