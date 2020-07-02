import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSearchView from './views/HomeSearchView';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeSearchView />
      <Footer />
    </div>
  );
}

export default App;
