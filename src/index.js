import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
    render() {
        return <h1>Hello, world!</h1>;
    }
}

const element = document.getElementById('hello-world');

ReactDOM.render(<HelloWorld />, element);
