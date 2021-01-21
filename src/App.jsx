import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { RecipeApp } from './pages/RecipeApp/RecipeApp'
import { RecipeDetails } from './pages/RecipeDetails/RecipeDetails';
import "./assets/scss/global.scss";
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { HomePage } from './pages/HomePage/HomePage'
import { RecipeEdit } from './pages/RecipeEdit/RecipeEdit';
import { AppFooter } from './cmps/AppFooter/AppFooter'

export function App() {
  return (
    <div className="App main-container">
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/recipe/edit/:id?"  component={RecipeEdit} />
          <Route path="/recipe/:id"  component={RecipeDetails} />
          <Route path="/recipe"  component={RecipeApp} />
          <Route path="/"  component={HomePage} />
        </Switch>
        <AppFooter />
      </Router>
    </div>
  );
}