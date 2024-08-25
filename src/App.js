import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [getResponse, setGetResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('https://backend-bajaj-t63b.onrender.com/bfhl', parsedInput, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponseData(response.data);
      setError('');
    } catch (err) {
      console.error('POST request error:', err);
      setError('Invalid JSON or failed to connect to API');
    }
  };

  useEffect(() => {
    const fetchGetResponse = async () => {
      try {
        const response = await axios.get('https://backend-bajaj-t63b.onrender.com/bfhl');
        setGetResponse(response.data);
        setError('');
      } catch (err) {
        console.error('GET request error:', err);
        setError('Failed to connect to API for GET request');
      }
    };

    fetchGetResponse();
  }, []);

  const handleOptionChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    return (
      <div>
        {selectedOptions.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
        {selectedOptions.includes('Highest lowercase alphabet') && <div>Highest lowercase alphabet: {highest_lowercase_alphabet.join(', ')}</div>}
      </div>
    );
  };

  return (
    <div>
      <h1>21BCE0379</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON input"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h2>POST Response Data:</h2>
          <p>User ID: {responseData.user_id}</p>
          <p>Email: {responseData.email}</p>
          <p>Roll Number: {responseData.roll_number}</p>
          <p>Numbers: {responseData.numbers.join(', ')}</p>
          <p>Alphabets: {responseData.alphabets.join(', ')}</p>
          <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>
        </div>
      )}

      {getResponse && (
        <div>
          <h2>GET Response Data:</h2>
          <p>Operation Code: {getResponse.operation_code}</p>
        </div>
      )}

      <select multiple={true} onChange={handleOptionChange}>
        <option value='Alphabets'>Alphabets</option>
        <option value='Numbers'>Numbers</option>
        <option value='Highest lowercase alphabet'>Highest lowercase alphabet</option>
      </select>

      {renderResponse()}
    </div>
  );
};

export default App;