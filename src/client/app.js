import React from 'react'
import Navbar from './components/navbar';

class App extends React.Component{
  render() {
    <div>
      <Navbar />

      <Router>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/blogs">Blog Articles</Link>
        </div>
        <div>
          <Link to="/contact">Contact Me</Link>
        </div>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </Router>
    </div>
  }
}

export default App;

