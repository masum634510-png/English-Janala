const loadLessone = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"; //promise of response
    fetch(url)
    .then((res) => res.json()) //promise of json data
    .then((data) => {
        //console.log(data);
        displayLessone(data.data)

    })
}

//--part >> 2 >> step >> 2
const loadLevelWord = (id) => {
  const url1 = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url1)
  .then((res) => res.json())
  .then((data) => {
    //console.log(data)
    displayLevelWord(data.data)

  })
}

 const displayLevelWord = (words) => {
    console.log(words)
    const wordContainer = document.getElementById("word-container")
    //wordContainer.innerHTML = "";
 words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
         <p>cat</p>
  `;

  wordContainer.append(card);  
 });

}; 

loadLevelWord();


const displayLessone = (lessones) => {

    //   1. get the container empty
   const lavelContainer = document.getElementById("lavel-container");
   lavelContainer.innerHTML = "";
   
   //  2. get into every lessons
  lessones.forEach((lesson) => {

    //  3. create element
    const btndiv = document.createElement("div")
    btndiv.innerHTML = `
               <button onclick ="loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary">
               <i class="fa-solid fa-book-open"></i>lesson- ${lesson.level_no}
               </button>       
    `;
  //  4.  append into container
    lavelContainer.append(btndiv)
   });

   
}
loadLessone()