const result = document.getElementById("result");
const voice = document.getElementById("sound");
const searchBtn = document.getElementById("btn");
var word = document.getElementById("word");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function playSound() {
    voice.play();
}

function fetchDefinition(word)  {
    fetch(`${url}${word}`).then((response) => response.json()).then((data) => {
            result.innerHTML = `
                <div class="word">
                    <h3>${word}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
         voice.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">OOPS, Couldn't find The Word !</h3>`;
            console.clear();
        });
}

// Event listener (for click and keypress)

function EventForKeyPress(event) {
    if (event.keyCode === 13) {
        fetchDefinition(word.value);
    }
  }

searchBtn.addEventListener("click", () => {
    fetchDefinition(word.value);
});

word.addEventListener("keypress", EventForKeyPress);