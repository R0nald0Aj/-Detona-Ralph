const state ={
    view : {
      square : $(".square").get(),
      enemy :  $(".enemy").get(),
      timeLeft :$("#time-left").get(),
      score : $("#score").get()
    },
    values:{
       gameVelocity : 1000,
       hitPosition :0,
       result : 0,
       lives :3,
       curremtTime: 60
    },
    actions:{
        countDownTimerId : null,
        timerId : null,  
    }
  }

$(function(){
    state.actions.timerId =updateView(decressedTime,state.values.gameVelocity);
    state.actions.countDownTimerId = updateView(randomEnemyPosition,state.values.gameVelocity);
    verifyClick();
});

function randomEnemyPosition() {
    $(".square").removeClass("enemy") 
    let randomNumber = Math.floor(Math.random() * 9);
    var  radn = $(".square")[randomNumber].id;
    $(`.square:eq(${radn})`).addClass("enemy");
    state.values.hitPosition = radn
}

function updateView(fun,time) {
    return setInterval(fun,time);
}

function playSound(audioSrc){
    let audio = new Audio(`../assets/audio/${audioSrc}.m4a`);
     audio.volume = 0.2;
     audio.play()
  }


 function decressedTime(){
    var currePositionTimer = state.values.curremtTime--;
     $("#time-left").text(`${currePositionTimer}`)
    
     if(currePositionTimer <=10){
        $("#time-left").css({"color":"red"}).fadeOut().fadeIn()
     }

     if(currePositionTimer <= 0){
           gameOver();
     }
      
 } 

 
 function gameOver() {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    alert(`Game Over!!  o Seu resultado foi: ${state.values.result}`);
}

function verifyClick(){
    $(".square").click(function(){
       
        if (this.id === state.values.hitPosition) {
               let result  = state.values.result +=1
               $("#score").text(`${result}`).fadeOut().fadeIn()
               state.values.hitPosition =null
               playSound("hit");
        }else{
          if( state.values.lives === 1){
            $("#live_actual").text(`x0`)
             gameOver();
          }else{
            let lifeActual =  state.values.lives -=1
            console.log(state.values.lives);
            $("#live_actual").text(`x${lifeActual}`)
          }
          
        }
      
    });
}
function countDown(){}