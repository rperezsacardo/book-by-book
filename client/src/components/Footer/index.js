import React from 'react';

function Footer() {
  return (
    <footer>
      <div>
        <h4>About</h4>
        <a href="/">
          <span>Who we are</span>
        </a>
        <a href="/">
          <span>Work with us</span>
        </a>
      </div>
      <div>
        <h4>Help</h4>
        <a href="/">
          <span>FAQ</span>
        </a>
        <a href="/">
          <span>Privacy</span>
        </a>
      </div>
      <div>
        <h4>Contact us</h4>
        <div>
          <span>Laís Monteiro</span>
          <a href="https://github.com/lmonteiro189">
            <img src="/images/GitHub-Mark-120px-plus.png" alt="logoGit" />
          </a>
          <a href="https://www.linkedin.com/in/laismonteiro/">
            <img src="/images/LI-In-Bug.png" alt="logoLinkedIn" />
          </a>
        </div>
        <div>
          <span>Ricardo Sacardo</span>
          <a href="https://github.com/rperezsacardo">
            <img src="/images/GitHub-Mark-120px-plus.png" alt="logoGit" />
          </a>
          <a href="https://www.linkedin.com/in/ricardosacardo/">
            <img src="/images/LI-In-Bug.png" alt="logoLinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
