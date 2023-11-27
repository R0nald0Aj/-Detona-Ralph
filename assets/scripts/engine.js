  
  const state ={
    view : {
      square : document.querySelectorAll(".square"),
      enemy : document.querySelector(".enemy"),
      timeLeft : document.querySelector("#time-left"),
      score : document.querySelector("#score")
    },
    values:{
       timerId : null,    
       gameVelocity : 1000,
       hitPosition :0,
       result : 0,
       lives :3,
       curremtTime: 60
    },
    actions:{
        countDownTimerId:setInterval(countDown,1000),
    }
  }
  

  function countDown(){
    state.values.curremtTime--;
    state.view.timeLeft.textContent =state.values.curremtTime

    if(state.values.curremtTime <= 0){
         clearInterval(state.actions.countDownTimerId);
         clearInterval(state.values.gameVelocity)
        alert(`Game Over!!  o Seu resultado foi: ${state.values.result}`)
    }
  }

  function randomSquare(){
    state.view.square.forEach((square) =>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);

    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
  }

  function moveEnemy(){
      state.values.timerId =setInterval(randomSquare,state.values.gameVelocity);
  }
  
  function playSound(audioSrc){
    let audio = new Audio(`../assets/audio/${audioSrc}.m4a`);
     audio.volume = 0.2;
     audio.play()
  }
   
  function addListenerHitBox(){
    state.view.square.forEach((square) =>{
        square.addEventListener("mousedown",()=>{
                if(square.id === state.values.hitPosition){
                       state.values.result++
                       state.view.score.textContent =state.values.result
                       state.values.hitPosition =null
                       playSound("hit");
                }
        });

     });
  }
  function initialize(){
     moveEnemy()
     addListenerHitBox();
   }

  initialize( );