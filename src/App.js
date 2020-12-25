import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Home from 'views/HomeView';
import Movies from './views/MoviesVeiw';
import FullInfo from './views/FullInfoView';
import { ToastContainer } from 'react-toastify';
// import NotFound from 'views/NotFoundView';
// import SearchBar from './components/SearchBar/SearchBar';

export default function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/movies" exact>
          <Movies />
        </Route>

        <Route path="/movies/:movieId">
          <FullInfo />
        </Route>
        <ToastContainer autoClose={3700} />
      </Switch>
    </Container>
  );
}
