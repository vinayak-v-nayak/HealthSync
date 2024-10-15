import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './Blog';
import HealthSync from './HealthSync';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="" component={HealthSync} />
            <Route path="/blog" component={Blog} />
        </Routes>
    </Router>
  );
}

export default App;
