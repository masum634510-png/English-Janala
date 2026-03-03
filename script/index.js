//--part >> 1 >> step >> 1
const loadLessone = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"; //promise of response
    fetch(url)
    .then((res) => res.json()) //promise of json data
    .then((data) => {
        displayLessone(data.data)

    })
}

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  })
}
//--part >> 2 >> step >> 1
const loadLevelWord = (id) => {
  const url1 = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url1)
  .then((res) => res.json())
  .then((data) => {
    removeActive();  // remove all active class
  const clickbtn = document.getElementById(`lesson-btn-${id}`);
        clickbtn.classList.add("active");  // only add active class
    displayLevelWord(data.data);

  });
};
//--part >> 2 >> step >> 2
 const displayLevelWord = (words) => {
 //   1. get the container empty
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";
    if (words.length == 0){
      wordContainer.innerHTML =`
        <div class="font-bangla text-center col-span-full rounded-xl py-10 space-y-6">
          <img class= "mx-auto" src="./assets/alert-error.png" alt="">
          <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
       </div>
      `
    }
//  2. get into every lessons
  words.forEach((word) => {
//  3. create element
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla font-bold text-xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি" }"</div>
            <div class="flex justify-between">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF25] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF25] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
  `;
//  4.  append into container
  wordContainer.append(card);  
 });

}; 

//--part >> 2 >> step >> end

//--part >> 1 >> step >> 2
const displayLessone = (lessones) => {
//   1. get the container empty
   const lavelContainer = document.getElementById("lavel-container");
   lavelContainer.innerHTML = "";
//  2. get into every lessons
  lessones.forEach((lesson) => {
//  3. create element
    const btndiv = document.createElement("div")
    btndiv.innerHTML = `
               <button id="lesson-btn-${lesson.level_no}" onclick ="loadLevelWord(${lesson.level_no})"
                class = "btn btn-outline btn-primary lesson-btn">
               <i class="fa-solid fa-book-open"></i>lesson- ${lesson.level_no}
               </button>       
    `;
  //  4.  append into container
    lavelContainer.append(btndiv)
   });  
};
loadLessone()  //function call 
//--part >> 1 >> step >> end