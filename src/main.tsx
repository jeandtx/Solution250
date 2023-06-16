import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { Welcome } from './screens/welcomepage/welcome';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Welcome />
    </React.StrictMode>
);
