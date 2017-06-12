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

## Hacking

The best way to make sure `parity-reactive-ui` work in the final Dapp environment is to see it in action as you develop. To do so, follow these steps:

<details>
	<summary>Steps</summary>
	
Step 1:
Link `parity-react-ui`:

```
cd parity-react-ui
npm link
```

Step 2:
Clone the skeleton dapp into somewhere memorable:

```
gcl git@github.com:louisgv/parity-reactive-ui.git $HOME/some/memorable/dir
```

Step 3:
Link the parity-reactive-ui:

```
cd $HOME/some/memorable/dir
./init.sh
npm r -S parity-reactive-ui
npm link parity-reactive-ui
npm run build
```

Step 4:

Symlink its dist into your `dapps` directory (for more info checkout the [DAPP tutorial](https://github.com/paritytech/parity/wiki/Tutorial-Part-1)):

```
ln -s $HOME/some/memorable/dir/dist /path/to/your/parity/dapps/parity-reactive-ui-test
```

Step 5:
Edit the `/dist/manifest.json` to something relevant:

```
{
"id": "parity-reactive-ui-test",
"name": "PRUIT",
"description": "A skeleton dapp to test parity-reactive-ui",
"version": "0.1",
"author": "Parity Technologies Ltd",
"iconUrl": "title.png"
}
```

Step 6:
Add a watch job into the `scripts` property of `package.json`:

```
"scripts": {
...,
"watch": "webpack --watch",
}
```

Step 7:
Run watch on both project, restart purity, then import the desired `purity-reactive-ui` component into skeleton to test.

```
npm run watch
```

</details>


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.2 Fix issue with Balance.
* 0.1.1 Initial release
