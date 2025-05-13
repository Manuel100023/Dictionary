
window.onload = function () {
    const searchBtn = document.getElementById("searchBtn");
    const wordInput = document.getElementById("wordInput");
    const resultBox = document.getElementById("resultBox");
  
    // On button click
    searchBtn.addEventListener("click", () => {
      const word = wordInput.value.trim();
  
      if (!word) {
        resultBox.innerHTML = "<p>Please enter a word.</p>";
        return;
      }
  
      resultBox.innerHTML = "<p>Searching...</p>";
  
      // Free Dictionary API
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
          if (data.title === "No Definitions Found") {
            resultBox.innerHTML = `<p>No definition found for "<strong>${word}</strong>".</p>`;
          } else {
            const entry = data[0];
            const phonetic = entry.phonetics[0]?.text || "Not available";
            const meaning = entry.meanings[0];
            const definition = meaning.definitions[0].definition;
            const partOfSpeech = meaning.partOfSpeech;
            const example = meaning.definitions[0].example || "No example provided.";
  
            resultBox.innerHTML = `
              <h2>${entry.word}</h2>
              <p><strong>Phonetic:</strong> ${phonetic}</p>
              <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
              <p><strong>Definition:</strong> ${definition}</p>
              <p><strong>Example:</strong> ${example}</p>
            `;
          }
        })
        .catch(error => {
          console.error(error);
          resultBox.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        });
    });
  };
  