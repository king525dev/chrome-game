const character = document.getElementById("character");
const block = document.getElementById("block");
const centreText = document.getElementById("centre-text");
const characterImage = document.getElementById("charImg");
const body = document.getElementsByTagName("body");
const style = document.querySelector("link#var");
let state = true;

var counter = -1;
var tick = 3

document.addEventListener('keydown', e => { 
     if (e.key == " ") {
          e.preventDefault();
          const clickEvent = new Event("click");
          document.dispatchEvent(clickEvent);
     }
});

function jump(){
     if(character.classList.contains("jump")){return}
     character.classList.add("jump");
     setTimeout(function(){
          character.classList.remove("jump");
     },500);
}

function reload(){
     location.reload();
}

function storeHighScore(score){
     if(localStorage.getItem("high-score") < score){
          localStorage.setItem("high-score", score)
     }else{
          return 
     }
}

function getHighScore(){
     return localStorage.getItem("high-score")
}

function startGameplay(){
     centreText.innerText = "Click to Start";
     block.style.animation = "none";
     document.getElementById("hi-score").innerHTML = getHighScore();
     if(state){
          charImg.setAttribute("src", "./resources/active-day.png");
     }else{
          charImg.setAttribute("src", "./resources/active-night.png");
     }
     document.addEventListener("click", () => {
          centreText.style.display = "none";
          midGame();
     });
}

function midGame(){
     document.getElementById("hi-score").innerHTML = getHighScore();
     block.style.animation =  `block ${tick}s infinite linear`

     charImg.setAttribute("src", "./resources/active-day.png")
     document.addEventListener("click", () => jump());

     const score = Math.round(counter/100);
     document.getElementById("score").innerHTML = score;

     setInterval(() => {
          const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
          const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
          if (blockLeft < 56 && blockLeft > 10 && characterTop >= 192) {
               document.removeEventListener("click", () => jump());
               block.style.animation = "none";
               block.style.left = `${blockLeft}px`;
               if(state){
                    charImg.setAttribute("src", "./resources/dead-day.png");
               }else{
                    charImg.setAttribute("src", "./resources/dead-night.png");
               }
               endGame(score);
          }else{
               counter++;
          }
     }, 100);

     // setInterval(() => {
     //      const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
     //      if(Math.round((counter/100)+11) % 5  == 0 && counter > 7 && blockLeft > 120){
     //           tick = (tick < 0.8)? tick: tick - 0.01;
     //           setTimeout(() => {
     //                block.style.animationDuration = `${tick}s`;
     //           },2000);
     //      }
     //      console.log(tick)
     // }, 4000);

     // const tickSpeed  = setInterval(() => {
     //      const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
     //      if(state && tick > 0.8 && blockLeft > 450){
     //                tick = tick - 0.1;
     //      }
     // }, 1000)

     // const scoreState = setInterval(() => {
     //      if(state){
     //           counter++;
     //           document.getElementById("score").innerHTML = counter;
     //           //console.log(`Counter: ${counter}`)
     //      }
     // }, 1000)
}

setInterval(() => {
     if(state){
          style.setAttribute("href", "./night.css")
          characterImage.setAttribute("src", "./resources/active-night.png")
          state = false;
     }else{
          style.setAttribute("href", "./style.css")
          characterImage.setAttribute("src", "./resources/active-day.png")
          state = true;
     }
}, 30000)

function endGame(score){
     centreText.innerText = "Game Over";
     centreText.style.display = "block";
     storeHighScore(score)
     counter = 0;
     tick = 3
}

// if(state){
//      const scoreInterval = tick*1000;

//      setInterval(() => {
//           if(tick > 0.8){
//                tick = tick - 0.1;
//           }
//           block.style.animation = `block ${tick}s infinite linear`;
//           console.log(block.style.animation)
//           console.log(`Tick: ${tick}`)
//           console.log(scoreInterval)
//      }, 10000)

//      setInterval(() => {
//           counter++;
//           document.getElementById("score").innerHTML = counter;
//           //console.log(`Counter: ${counter}`)
//      }, 1500)
// }