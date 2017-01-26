oo7-react
=========

A small library to provide oo7 (Joint Asynchronous Mapping Expression System)
`Bond`-based Reactive components for Ethereum and Parity.

The reactive components provided are:
- `Balance` (display the reactive prop `value`);
- `BlockNumber` (display the reactive prop `value`);
- `AccountIcon` (display the account icon for the reactive prop `address`);
- `Account` (display the account icon and name for the reactive prop `address`);
- `RichAccount` (display the account icon, name and balance for the reactive
	prop `address`);
- `TransactionProgress` (display the progress of a transaction; reactive prop is
	`request` and should be of type `Transaction`);

## Installation

```sh
  npm install parity-reactive-ui --save
```

## Usage

```javascript
  // Assume React is already required.
  var pru = require('parity-reactive-ui'),
      Account = pru.Account,
	  oo7parity = require('oo7-parity'),
	  setupBonds = oo7parity.setupBonds;

  // We assume parity has been polluted into the global namespace.
  parity.bonds = setupBonds(parity.api);

  class App extends React.Component {
	  render() {
		  return (<div>
			  Your coinbase is <Account address={parity.bonds.coinbase} />
			</div>);
	  }
  }
```

## Tests

```sh
  npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.2 Fix issue with Balance.
* 0.1.1 Initial release
