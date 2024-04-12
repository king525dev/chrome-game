const character = document.getElementById("character");
const block = document.getElementById("block");
const centreText = document.getElementById("centre-text");
const characterImage = document.getElementById("charImg");
let state = false;

var counter = -1;
var tick = 3

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

// function storeHighScore(score){
//      if(localStorage.getItem("high-score"));
// }

function startGameplay(){
     centreText.innerText = "Click to Start";
     block.style.animation = "none";
     charImg.setAttribute("src", "./resources/active-day.png")
     document.addEventListener("click", () => {
          centreText.style.display = "none";
          midGame();
     });
}

function midGame(){
     state = true
     block.style.animation = `block ${tick}s infinite linear`;

     console.log(`iniTick: ${tick}`)
     console.log(`iniCounter: ${counter}`)

     charImg.setAttribute("src", "./resources/active-day.png")
     document.addEventListener("click", () => jump());

     setInterval(() => {
          const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
          const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
          if (blockLeft < 56 && blockLeft > 10 && characterTop >= 202) {
               document.removeEventListener("click", () => jump());
               block.style.animation = "none";
               block.style.left = `${blockLeft}px`;
               charImg.setAttribute("src", "./resources/dead-day.png");
               endGame();
          }
     }, 100)

     counter++;
     document.getElementById("score").innerHTML = counter;

     if(counter % 5  == 0 && counter != 0){
          tick = tick - 0.2;
          block.style.animationDuration = `${tick}s`;
     }

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

function endGame(){
     centreText.innerText = "Game Over";
     centreText.style.display = "block";
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