const createElement = (arr) => {
    const htmlElement = arr.map((el) => `<span class= "btn">${el}</span>`);
    return htmlElement.join(" ")
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
  }
  else{
     document.getElementById("word-container").classList.remove("hidden");
     document.getElementById("spinner").classList.add("hidden")
  }
}


//--part >> 1 >> step >> 1
const loadLessone = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all"; //promise of response
  fetch(url)
    .then((res) => res.json()) //promise of json data
    .then((data) => {
      displayLessone(data.data);
    });
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};
//--part >> 2 >> step >> 1
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url1 = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickbtn = document.getElementById(`lesson-btn-${id}`);
      clickbtn.classList.add("active"); // only add active class
      displayLevelWord(data.data);
    });
};
//------------part------------03--------------
const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      //console.log(json)
      displayWordDetail(json.data);
    });
};

const displayWordDetail = (word) => {
  //console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
             <div class="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonym</h2>
                    <div class="">${createElement(word.synonyms)}</div>
                </div>

 `;
  document.getElementById("word_modal").showModal();
};
//--part >> 2 >> step >> 2
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="font-bangla text-center col-span-full rounded-xl py-10 space-y-6">
          <img class= "mx-auto" src="./assets/alert-error.png" alt="">
          <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
       </div>
      `;
      manageSpinner(false)
      return
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 border">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla font-bold text-xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF25] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF25] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
  `;
    wordContainer.append(card);
  });
  manageSpinner(false)
};

//--part >> 2 >> step >> end

//--part >> 1 >> step >> 2
const displayLessone = (lessones) => {
  const lavelContainer = document.getElementById("lavel-container");
  lavelContainer.innerHTML = "";
  lessones.forEach((lesson) => {
    const btndiv = document.createElement("div");
    btndiv.innerHTML = `
               <button id="lesson-btn-${lesson.level_no}" onclick ="loadLevelWord(${lesson.level_no})"
                class = "btn btn-outline btn-primary lesson-btn">
               <i class="fa-solid fa-book-open"></i>lesson- ${lesson.level_no}
               </button>       
    `;
    lavelContainer.append(btndiv);
  });
};
loadLessone(); //function call
//--part >> 1 >> step >> end

document.getElementById("btn-search").addEventListener("click", ()=>{
  removeActive()
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((res) => res.json())
  .then((data) => {
      const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
       displayLevelWord(filterWords)
  });
 
});
