import React from 'react'

const Home = () => {

  return (
    <section className="container">
        <div className="left-section">
            <h1>Travelling Alone?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.</p>
            <div className="email-form">
                <input type="email" placeholder="Enter email address"/>
                <button id="get-card-button">Get Free Card</button>
            </div>
            <div className="stats">
                <div><strong>2943</strong> Cards Delivered</div>
                <div><strong>$1M+</strong> Transaction Completed</div>
            </div>
        </div>
        <div className="right-section">
            <img src="https://via.placeholder.com/300" alt="Credit Card Image"/>
        </div>
    </section>

  )
}

export default Home;
