import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';

import App from "./components/App";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <App />
            <DevTools />
        </div>
    </BrowserRouter>,
    document.getElementById("app")
)
