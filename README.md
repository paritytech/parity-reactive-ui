oo7-react
=========

A small library to provide oo7 (Joint Asynchronous Mapping Expression System)
`Bond`-based Reactive components for Ethereum and Parity.

The reactive components provided are:
- `AccountIcon` (an identicon image for a given account);
- `AccountLabel` (a full Semantic UI label for a given account);
- `InlineAccount` (a simple display component for an account designed to flow in text);
- `SigningButton` (a button which completes a message-signing operation when clicked and displays the progress to the user);
- `SigningProgressLabel` (a full Semantic UI label for displaying the progress of a signing a message);
- `TransactButton` (a button which posts a transaction when clicked and displays the progress to the user);
- `TransactionProgressLabel` (a full Semantic UI label for displaying the progress of a transaction);

- `BButton` (a Semantic UI derived `Button` that accepts Bonds for certain props);
- `InputBond` (a Semantic UI derived `Input` component that accepts a Bond for its output);
- `AddressInputBond` (an `InputBond`-like component for addresses);
- `HashBond` (an `InputBond`-like component for 32 byte hashes);
- `URLBond` (an `InputBond`-like component for URLs).

## Installation

```sh
  npm install parity-reactive-ui --save
```

## Usage

```javascript
  // Assume React is already required.
  var pru = require('parity-reactive-ui'),
      InlineAccount = pru.InlineAccount,
	  oo7parity = require('oo7-parity'),
	  setupBonds = oo7parity.setupBonds;

  // We assume parity has been polluted into the global namespace.
  parity.bonds = setupBonds(parity.api);

  class App extends React.Component {
	  render() {
		  return (<div>
			  Your current address is <InlineAccount address={parity.bonds.me} />.
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
