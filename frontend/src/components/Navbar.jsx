import React from 'react';

function Navbar() {
  return (
    <header className="navbar">
      <a href="/"><div className="logo">RideShaw</div></a>
      <nav>
        <a href="#a">Solutions</a>
        <a href="#a">Industries</a>
        <a href="#a">Fees</a>
        <a href="#a">About Rareblocks</a>
      </nav>
      {/* Make darker on hover */}
      <div className="auth-buttons" >
        <a href="/signin" >Sign in</a>
        <a href="/signup" >Create account</a>
      </div>
    </header>
  );
}

export default Navbar;
