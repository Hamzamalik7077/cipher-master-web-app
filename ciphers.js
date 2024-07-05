// src/ciphers.js

// Playfair Cipher
export const playfairCipher = {
    generateKeySquare: (key) => {
      key = key.toLowerCase().replace(/[^a-z]/g, '').replace(/j/g, 'i');
      let alphabet = 'abcdefghiklmnopqrstuvwxyz'; // Note: 'j' is omitted
      let keySquare = '';
      for (let char of key) {
        if (!keySquare.includes(char)) {
          keySquare += char;
        }
      }
      for (let char of alphabet) {
        if (!keySquare.includes(char)) {
          keySquare += char;
        }
      }
      return keySquare.match(/.{1,5}/g); // Create 5x5 key square
    },
    processDigraphs: (text) => {
      text = text.toLowerCase().replace(/[^a-z]/g, '').replace(/j/g, 'i');
      if (text.length % 2 !== 0) {
        text += 'x'; // Padding
      }
      let digraphs = [];
      for (let i = 0; i < text.length; i += 2) {
        let a = text[i];
        let b = text[i + 1];
        if (a === b) {
          b = 'x'; // Padding
        }
        digraphs.push([a, b]);
      }
      return digraphs;
    },
    encrypt: (text, key) => {
      let keySquare = playfairCipher.generateKeySquare(key);
      let digraphs = playfairCipher.processDigraphs(text);
      let encryptedText = '';
  
      digraphs.forEach(([a, b]) => {
        let aRow, aCol, bRow, bCol;
        keySquare.forEach((row, rowIndex) => {
          row.split('').forEach((char, colIndex) => {
            if (char === a) {
              aRow = rowIndex;
              aCol = colIndex;
            }
            if (char === b) {
              bRow = rowIndex;
              bCol = colIndex;
            }
          });
        });
  
        if (aRow === bRow) {
          encryptedText += keySquare[aRow][(aCol + 1) % 5];
          encryptedText += keySquare[bRow][(bCol + 1) % 5];
        } else if (aCol === bCol) {
          encryptedText += keySquare[(aRow + 1) % 5][aCol];
          encryptedText += keySquare[(bRow + 1) % 5][bCol];
        } else {
          encryptedText += keySquare[aRow][bCol];
          encryptedText += keySquare[bRow][aCol];
        }
      });
  
      return encryptedText;
    },
    decrypt: (text, key) => {
      let keySquare = playfairCipher.generateKeySquare(key);
      let digraphs = playfairCipher.processDigraphs(text);
      let decryptedText = '';
  
      digraphs.forEach(([a, b]) => {
        let aRow, aCol, bRow, bCol;
        keySquare.forEach((row, rowIndex) => {
          row.split('').forEach((char, colIndex) => {
            if (char === a) {
              aRow = rowIndex;
              aCol = colIndex;
            }
            if (char === b) {
              bRow = rowIndex;
              bCol = colIndex;
            }
          });
        });
  
        if (aRow === bRow) {
          decryptedText += keySquare[aRow][(aCol + 4) % 5];
          decryptedText += keySquare[bRow][(bCol + 4) % 5];
        } else if (aCol === bCol) {
          decryptedText += keySquare[(aRow + 4) % 5][aCol];
          decryptedText += keySquare[(bRow + 4) % 5][bCol];
        } else {
          decryptedText += keySquare[aRow][bCol];
          decryptedText += keySquare[bRow][aCol];
        }
      });
  
      return decryptedText;
    },
  };

  
 // Rail Fence Cipher
export const railFenceCipher = {
    encrypt: (text, numRails = 3) => {
      if (numRails === 1) return text; // If there's only one rail, return the text as is
  
      // Create an array to hold the rails
      let rail = Array(numRails).fill('');
      let direction = 1; // Start by going down the rails
      let railIndex = 0;
  
      // Iterate over each character in the text
      for (let char of text) {
        rail[railIndex] += char;
        railIndex += direction;
        if (railIndex === numRails - 1 || railIndex === 0) direction *= -1;
      }
  
      // Join all rails to form the ciphertext
      return rail.join('');
    },
  
    decrypt: (text, numRails = 3) => {
      if (numRails === 1) return text; // If there's only one rail, return the text as is
  
      // Create an array to hold the rails
      let rail = Array(numRails).fill('').map(() => Array(text.length).fill(''));
  
      let index = 0;
      let direction = 1; // Start by going down the rails
      let railIndex = 0;
  
      // Mark the zigzag pattern
      for (let i = 0; i < text.length; i++) {
        rail[railIndex][i] = '*';
        railIndex += direction;
        if (railIndex === numRails - 1 || railIndex === 0) direction *= -1;
      }
  
      // Fill the zigzag pattern with the ciphertext
      let currentIndex = 0;
      for (let i = 0; i < numRails; i++) {
        for (let j = 0; j < text.length; j++) {
          if (rail[i][j] === '*') {
            rail[i][j] = text[currentIndex];
            currentIndex++;
          }
        }
      }
  
      // Read the zigzag pattern to get the plaintext
      railIndex = 0;
      direction = 1;
      let decrypted = '';
      for (let i = 0; i < text.length; i++) {
        decrypted += rail[railIndex][i];
        railIndex += direction;
        if (railIndex === numRails - 1 || railIndex === 0) direction *= -1;
      }
  
      return decrypted;
    },
  };