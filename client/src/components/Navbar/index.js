import React from 'react';
import './style.scss';

function Navbar() {
  return (
    <nav>
      <a href="/">
        <img src="/images/navbar-logo.png" alt="navbar-logo" />
      </a>
      <a href="/userId/books">My books</a>
      <a href="/userId">Profile</a>
      <a href="/login">Login</a>
      <div class="ui icon input">
        <input type="text" placeholder="Search..." />
        <i class="circular search link icon"></i>
      </div>
    </nav>
  );
}

export default Navbar;
