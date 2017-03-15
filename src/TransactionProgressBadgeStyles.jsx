let styles = {};

styles.top = {
  fontFamily: 'sans-serif',
  fontSize: 'small'
};

styles.left = {
  background: '#666',
  color: 'white',
  textShadow: '0 1pt 2pt black',
  border: '1px #333 solid',
  borderRight: 'none',
  padding: '0.1em 0.3em',
  borderTopLeftRadius: '0.3em',
  borderBottomLeftRadius: '0.3em'
};

styles.right = {
  border: '1px #333 solid',
  color: 'rgba(0,0,0,0.75)',
  borderLeft: 'none',
  padding: '0.1em 0.3em',
  borderTopRightRadius: '0.3em',
  borderBottomRightRadius: '0.3em',
  boxShadow: 'inset 0px 0.25pt 1.5pt 0px rgba(0,0,0,0.75)',
  fontWeight: 'bold'
};

function rightWith(x) {
    Object.keys(styles.right).forEach(k => { x[k] = styles.right[k]; });
    return x;
}

styles.estimating = rightWith({
	background: '#ddf'
});

styles.cancelled = rightWith({
	background: '#ddd'
});

styles.signing = rightWith({
	background: '#ddf'
});

styles.finalising = rightWith({
	background: '#ffd'
});

styles.finalised = rightWith({
	background: '#dfd'
});

export {styles};
