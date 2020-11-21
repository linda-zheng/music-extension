function parsePage() {
  const stopWords = ["", "a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thick", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];

  console.log('run script');
  const regex = /(?:\[.*?\]|\W)+/;
  const pElements = document.querySelectorAll('p');
  const textArray = Array.from(pElements)
    .flatMap(
      p => p.textContent.split(regex)
        .map(s => s.toLowerCase())
        .filter(s => !stopWords.includes(s) && s.length > 1)
    );

  const frequency = {};
  for (const word of textArray) {
    if (frequency[word]) {
      frequency[word]++;
    } else {
      frequency[word] = 1;
    }
  }

  let sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

  let searchString = sorted.slice(0, 3).map(([key, freq]) => key).join('+');

  console.log(searchString);
  const options = {
    // mode: 'no-cors',
    headers: {
      Origin: 'X-Requested-With'
    }
  };

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // fetch(`https://www.lyricfinder.org/search/lyrics/${searchString}`).then(res => {/search?searchtype=lyrics&query=
  fetch(`${proxyurl}https://www.lyricfinder.org/search/lyrics/${searchString}`, options)
    .then(res => res.text())
    .then((res) => {
      // console.log(res);
      var el = document.createElement( 'html' );
      el.innerHTML = res;

      // let container = el.querySelectorAll('.container'); // Live NodeList of your anchor elements
      let listSongs = el.querySelectorAll('.song-title-link');
      listSongs = Array.from(listSongs).slice(0, 5).map(item => item.textContent.trim());
      let listArtists = el.querySelectorAll('.artist-link');
      listArtists = Array.from(listArtists).slice(0, 5).map(item => item.textContent.trim());

      console.log(listSongs, listArtists);
    }
  )
}

parsePage()

// code for declaratively injecting content script
// console.log('injected contentScript');
// chrome.runtime.onMessage.addListener(
//   function(message, sender, callback) {
//     console.log(`contentScript: ${JSON.stringify(message)}, ${JSON.stringify(sender)}, ${JSON.stringify(callback)}`);
//     // example sender: {"id":"hligmjmffggjjpbnilddcnmmpecgpglc","origin":"null"}
//     if (message.event == 'parsePage'){
//       parsePage();
//     }
//  }
// );

// add this to manifest.json
// "content_scripts": [
//   {
//     "matches": ["*://*/*"],
//     "run_at": "document_end",
//     "js": ["contentScript.js"]
//   }
// ],
// and swap activeTab to tabs in the permissions
