import React, { Component } from 'react';
import {BigNumber} from 'bignumber.js'
import {ReactiveComponent} from 'oo7-react';
//keeps balance of ether up to date
export class EtherBalance extends ReactiveComponent{
  constructor(){super(['balance'])}

  render(){
    if(typeof this.state.balance == "undefined") return (<span>-</span>);
    let ethdiv = new BigNumber('1e+18');
    let ethVal = this.state.balance.div(ethdiv);
    return (<span>{ethVal.toFormat(5)} ETH</span>)
  }
}
