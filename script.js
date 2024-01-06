
 const challenge = ["🐸️","🦭️","🐹️","🐭️","🐷️","🐣️","🦊️","🐮️","🐼️","🦝️","🐻️","🦁️","🐱️","🐵️","🐶️","🐨️" ];
 const hard = ["🍎️","🍉️","🍊️","🥝️","🍋️","🍒️","🥑️","🍏️","🍍️","🥥️","🥩️","🍕️","🧀️","🍔️","🍟️","🥮️","🍗️","🥗️","🍲️","🍙️"] ;
 const easy = ["😪️","🤩️","😎️","🥸️","🤓️","😈️"]
const medium = ["😪️","🤩️","😎️","🥸️","🤓️","😈️","🤑️","😛️","😇️","🤫️" ];
// creating the cards 
// it should be controlled with radio buttons 
let level = changeTheLevel(easy)
// --------------------------------------
// creating the game blocks 
 for(let i = 0 ; i<level.length*2; i++){
    const game_blocks = document.querySelector(".memory-game-blocks");
    const game = document.createElement("div");
    game.classList.add("game-block");
    game.classList.add("has-match");
    const front = document.createElement("div");
    front.classList.add("face");
    front.classList.add("front");
    game.appendChild(front); 
    const back = document.createElement("div");
    back.classList.add("face");
    back.classList.add("back")
    const emoji = document.createElement("span");
    emoji.style = "font-size: 85px;"
    if(i >= level.length){
        emoji.textContent = `${level[i-level.length]}`
    }else{
        emoji.textContent = `${level[i]}`
    }
   
    back.appendChild(emoji);
    game.appendChild(back);
    game_blocks.appendChild(game)
 }
 // Start The Game 
StartTheGame(); 
 

 const  game_blocks = document.querySelector(".memory-game-blocks");
 const blocks = Array.from(game_blocks.children);
 const orderRange = [...Array(blocks.length).keys()];
 shuffle(orderRange);
 //playing phase 
blocks.forEach((block,index)=>{
    block.style.order= orderRange[index];
    block.addEventListener('click',function(){
        flipBlock(block);
        let Game_Finished = blocks.filter(flippedBlock=>flippedBlock.classList.contains("has-match"));
    if(Game_Finished.length === blocks.length){
        let controlDiv = document.createElement("div");
        controlDiv.classList.add("control-buttons");
        let spanElement = document.createElement("span");
        spanElement.textContent = "replay";
        controlDiv.appendChild(spanElement);
        let bodyElement = document.body ;
        bodyElement.insertBefore(controlDiv,bodyElement.firstChild);
       restart()
    }
    })
  
 
})
 
 
 //helpers 
 function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter(flippedBlock=>flippedBlock.classList.contains("is-flipped"));
    if(allFlippedBlocks.length === 2){
        stopClicking();
        let TriesNum = document.querySelector(".tries span");
        if(allFlippedBlocks[0].textContent === allFlippedBlocks[1].textContent){
            allFlippedBlocks.forEach((block)=>{
                block.classList.remove("is-flipped");
                block.classList.add("has-match") ;
            })
        }else{
            TriesNum.textContent = parseInt(TriesNum.textContent)+1;
            setTimeout(()=>{
                allFlippedBlocks[0].classList.remove("is-flipped");
                allFlippedBlocks[1].classList.remove("is-flipped");
            },1001)
        }
    }
    

 }
 function stopClicking(){
    game_blocks.classList.add('no-clicking');
    setTimeout(()=>{
        game_blocks.classList.remove('no-clicking');
    },1001)
 }
 function shuffle(arr){
    let current = arr.length ;
    let temp ;
    let random ;
    while(current>0){
        random= Math.floor(Math.random()*current);
        current-- ;
         temp = arr[current];
        arr[current]= arr[random];
        arr[random]= temp ;
    }
    return arr ;
}
function changeTheLevel(arr){
    let val ;
    if(arr.length < 16){
        val = "550px"
    }else {
        val = "974px"
    }
    document.querySelector(".memory-game-blocks").style.width = val 
    return arr ;
}
function restart(){
    document.querySelector(".control-buttons span").onclick = function(){
        location.reload();
     }
}
function StartTheGame(){
    document.querySelector(".control-buttons span").onclick = function(){
        let yourName = prompt("Whats your Name?");
        !yourName? document.querySelector(".name span").innerHTML = "Unknown":
                   document.querySelector(".name span").innerHTML = yourName;
        document.querySelector(".control-buttons").remove();
        setTimeout(()=>{
            blocks.forEach((block)=>{
                block.classList.remove("has-match")
            })
         },10000)
     }
}
