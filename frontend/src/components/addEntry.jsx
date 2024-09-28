// src/components/CityTimeForm.js

import React from 'react';
import '../form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEntry = () => {
  const [data, setData] = React.useState({ city_name: "Anand", time: "Morning" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const response = await fetch("http://localhost:3001/api/entry/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (response.error) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);
      
      // Show success toast
      toast.success('Entry added successfully!');
    } catch (error) {
      console.error(error);
      // Show error toast
      toast.error('Failed to add entry. Please try again.');
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="form-section">
      <form className="city-time-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="city_name">Where to go?</label>
          <select id="city" name="city_name" value={data.city_name} onChange={handleChange}>
            <option value="Anand">Anand</option>
            <option value="Nadiad">Nadiad</option>
            <option value="Vadtal">Vadtal</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="time">When to go?</label>
          <select id="time" name="time" value={data.time} onChange={handleChange}>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {/* ToastContainer to render the toast notifications */}
      <ToastContainer />
    </section>
  );
};

export default AddEntry;
