import React from 'react';

function Navbar() {
  return (
    <header className="navbar">
      <a href="/"><div className="logo">Paisaa Vasool</div></a>
      <nav>
        <a href="#">Solutions</a>
        <a href="#">Industries</a>
        <a href="#">Fees</a>
        <a href="#">About Rareblocks</a>
      </nav>
      <div className="auth-buttons">
        <a href="/signin">Sign in</a>
        <a href="/signup">Create account</a>
      </div>
    </header>
  );
}

export default Navbar;
