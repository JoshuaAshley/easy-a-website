import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeleteAccount = async () => {
    setError(''); // Reset previous error messages
    setSuccessMessage(''); // Reset previous success messages
  
    try {
      // Create a FormData object to hold the form data
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('reason', reason); // If you want to send the reason as well
  
      const response = await fetch('https://easy-a-api-dbfghva5hkaqgsdc.southafricanorth-01.azurewebsites.net/api/User/delete-account', {
        method: 'DELETE',
        body: formData, // Send FormData instead of JSON
        credentials: 'include', // Include credentials if necessary
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete account');
      }
  
      const data = await response.json();
      setSuccessMessage(data.message); // Show success message
      console.log("Account deletion successful:", data.message);
  
      // Optionally, reset the form or redirect the user
      setEmail('');
      setPassword('');
      setReason('');
    } catch (error) {
      setError(error.message); // Display error message
      console.error("Error deleting account:", error);
    }
  };  

  return (
    <div className="delete-account-container">
      <img 
        src={`/easy_a_logo_light.png`} 
        alt="Easy A Logo" 
        className="title-image"
      />

      <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
        required
      />

      <textarea
        type="text"
        placeholder="Please let us know what we can improve on..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="input-field input-area"
      />
      
      <button className="delete-button" onClick={handleDeleteAccount}>
        Delete My Account
      </button>

      {/* Display success or error messages */}
      {error && <div className="error-message">{"Error deleting account"}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <p className="small-text">
        For help, email:
        <a href="mailto:proactive255@gmail.com" className="email-link"> proactive255@gmail.com</a>.
      </p>

    </div>
  );
};

export default App;