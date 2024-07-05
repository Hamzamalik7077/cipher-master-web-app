import React, { useState } from 'react';
import { playfairCipher, railFenceCipher } from './ciphers';
import './App.css';
import keyLogo from './key.png'; // Assuming you have a key logo image

const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [isEncryption, setIsEncryption] = useState(true);
  const [key, setKey] = useState('');
  const [rails, setRails] = useState(3); // Default number of rails

  const handleEncryptDecrypt = () => {
    let result;
    switch (selectedAlgorithm) {
      case 'Playfair Cipher':
        result = isEncryption ? playfairCipher.encrypt(inputText, key) : playfairCipher.decrypt(inputText, key);
        break;
      case 'Rail Fence Cipher':
        result = isEncryption ? railFenceCipher.encrypt(inputText, rails) : railFenceCipher.decrypt(inputText, rails);
        break;
      default:
        result = 'Please select an algorithm';
    }
    setOutputText(result);
  };

  return (
    <div className="App">
      <div className="header">
        <img src={keyLogo} alt="Key Logo" className="key-logo" />
        <h1>Cipher Master</h1>
      </div>
      <textarea
        placeholder="Enter text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="Playfair Cipher"
            checked={selectedAlgorithm === 'Playfair Cipher'}
            onChange={() => setSelectedAlgorithm('Playfair Cipher')}
          />
          Playfair Cipher
        </label>
        <label>
          <input
            type="radio"
            value="Rail Fence Cipher"
            checked={selectedAlgorithm === 'Rail Fence Cipher'}
            onChange={() => setSelectedAlgorithm('Rail Fence Cipher')}
          />
          Rail Fence Cipher
        </label>
      </div>
      {selectedAlgorithm === 'Rail Fence Cipher' && (
        <div>
          <label>Number of Rails:</label>
          <input
            type="number"
            value={rails}
            onChange={(e) => setRails(parseInt(e.target.value))}
          />
        </div>
      )}
      {selectedAlgorithm === 'Playfair Cipher' && (
        <div>
          <input
            type="text"
            placeholder="Enter key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
      )}
      <div>
        <label>
          <input
            type="radio"
            value="encrypt"
            checked={isEncryption}
            onChange={() => setIsEncryption(true)}
          />
          Encrypt
        </label>
        <label>
          <input
            type="radio"
            value="decrypt"
            checked={!isEncryption}
            onChange={() => setIsEncryption(false)}
          />
          Decrypt
        </label>
      </div>
      <button onClick={handleEncryptDecrypt}>Submit</button>
      <textarea readOnly value={outputText} />
    </div>
  );
};

export default App;
