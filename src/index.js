import './index.css';
import * as serviceWorker from './serviceWorker';
import { render } from 'frint-react';
import RootApp from './App/App'

const app = new RootApp();

render(app, document.getElementById('root'));

serviceWorker.unregister();