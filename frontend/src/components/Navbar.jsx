import React from 'react';

function Navbar() {
  return (
    <header className="navbar">
      <a href="/"><div className="logo">RideShaw</div></a>
      <nav>
        <a href="#a">Solutions</a>
        <a href="#a">Industries</a>
        <a href="#a">Fees</a>
        <a href="#a">About RideShaw</a>
      </nav>
      {/* Make darker on hover */}
      <div className="auth-buttons">
      {
        document.cookie.split('; ').some(cookie => cookie.split('=')[0] === 'token') 
        ? (
          <a href='/profile'><i class="bi bi-person-fill text-dark fs-5"></i></a>
        ) : (
          <>
          <a href="/signin">Sign in</a>
          <a href="/signup">Create account</a>
          </>
        )
      }
      </div>

    </header>
  );
}

export default Navbar;
