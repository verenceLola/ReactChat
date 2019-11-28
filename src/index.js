import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { render } from 'frint-react';

const app = new App();
render(app, document.getElementById('root'));

serviceWorker.unregister();