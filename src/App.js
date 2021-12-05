import './App.css';
import './index.css';
import Navigation from './components/Navigation';
import Container from './views/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Main View
 * @returns JSX
 */
function App() {
  return (
    <div className="App">
      <div className="row m-0 p-0">
        <div className="col-md-12">
          <Navigation />
        </div>
        <div className="col-md-12 p-0">
          <Container />
        </div>
      </div>
    </div>
  );
}

export default App;
