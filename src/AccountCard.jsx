import React from 'react';
import PropTypes from 'prop-types';
import { ReactiveComponent, Rspan } from 'oo7-react';
import { AccountIcon, Hash, InlineBalance, QrCode } from './';
import { bonds } from 'oo7-parity';

import { Card, List, Divider, Container, Label } from 'semantic-ui-react';


export class AccountCard extends ReactiveComponent {
  constructor () {
    super(['account', 'className', 'disabled', 'hideName']);
  }

  componentWillMount () {
    super.componentWillMount();
    this.balance = bonds.balance(this.props.account.address);
    this.txCount = bonds.nonce(this.props.account.address);
  }

  render () {
    const { account, className, disabled, hideName } = this.state;

    if (!account) {
      return null;
    }

    const { address, name, uuid } = account;
    const meta = account.meta || {};

    return (
          <Card fluid className={className} color={disabled ? 'red' : null} link>
            <Card.Content>
              <Card.Description>
                <List divided verticalAlign='middle'>
                  <List.Item>
                    <AccountIcon address={address}/>
                    <List.Content>
                        {hideName ? null :  <Rspan style={{fontSize:'large'}}>{name.toUpperCase()}</Rspan>} <br />
                        <Hash value={address} style={{color:'grey'}}/>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated='right'>
                      <QrCode value={address}></QrCode>
                    </List.Content>
                    <List.Content>
                        {meta.vault ? <Label>{meta.vault}</Label> : null}
                        <div style={{opacity: 0.35, margin: '15px'}}>
                          uuid: {uuid} <br />
                          {meta.description} <br />
                        </div>
                    </List.Content>
                    <List.Content>
                      <Rspan>{this.txCount.map(v => v.toString())}</Rspan> outgoing transactions <br />
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <List divided verticalAlign='middle'>
                <List.Item>
                  <List.Content floated='right'>
                    <InlineBalance value={this.balance} />
                  </List.Content>
                  <List.Content>
                    {meta.tags ? meta.tags.map((t,i) => {
                      return <Label key={i}>{t}</Label>
                    }) : null}
                  </List.Content>
                </List.Item>
              </List>
            </Card.Content>
          </Card>
    );
  }

}

AccountCard.propTypes = {
  account: PropTypes.instanceof(Bond) || PropTypes.object,
  className: PropTypes.instanceof(Bond) || PropTypes.string,
  disabled: PropTypes.instanceof(Bond) || PropTypes.bool,
  hideName: PropTypes.instanceof(Bond) || PropTypes.bool,
};

AccountCard.defaultProps = {
  className: '',
  hideName: false,
  disabled: false
};
