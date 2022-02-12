import './App.css';
import Home from './Home';
import UserEdit from './UserEdit';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/:id" component={UserEdit} />
            </Switch>
        </Router>
  );
}

export default App;
