(function(open) {
	// Origin: http://verboselogging.com/2010/02/20/hijack-ajax-requests-like-a-terrorist
  XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
    // Intercept and ignore request to RPC server
		if (url=== 'http://localhost:8545/') {
			XMLHttpRequest.prototype.abort();
			return;
		}
		open.call(this, method, url, async, user, pass);
  };
})(XMLHttpRequest.prototype.open);


import React from 'react';
import {render} from 'react-dom';
import {App} from './app.jsx'

render(<App/>, document.getElementById('app'));
