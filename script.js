
 //const medium = ["🐸️","🦭️","🐹️","🐭️","🐷️","🐣️","🦊️","🐮️","🐼️","🦝️","🐻️","🦁️","🐱️","🐵️","🐶️","🐨️" ];
 //const hard = ["🍎️","🍉️","🍊️","🥝️","🍋️","🍒️","🥑️","🍏️","🍍️","🥥️","🥩️",
 //,"🍕️","🧀️","🍔️","🍟️","🥮️","🍗️","🥗️","🍲️","🍙️","🌭️","🍘️","🌶️","🥖️"] ;
// Select The Start Game Button
//  const easy1 = ["😪️","🤩️","😎️","🥸️","🤓️","😈️"]
const easy = ["😪️","🤩️","😎️","🥸️","🤓️","😈️","🤑️","😛️","😇️","🤫️" ];
// creating the cards 
 for(let i = 0 ; i<easy.length*2; i++){
    const game_blocks = document.querySelector(".memory-game-blocks");
    const game = document.createElement("div");
    game.classList.add("game-block");
    const front = document.createElement("div");
    front.classList.add("face");
    front.classList.add("front");
    game.appendChild(front); 
    const back = document.createElement("div");
    back.classList.add("face");
    back.classList.add("back")
    const emoji = document.createElement("span");
    emoji.style = "font-size: 85px;"
    if(i >= easy.length){
        emoji.textContent = `${easy[i-easy.length]}`
    }else{
        emoji.textContent = `${easy[i]}`
    }
   
    back.appendChild(emoji);
    game.appendChild(back);
    game_blocks.appendChild(game)
 }
 // info phase  
 
 document.querySelector(".control-buttons span").onclick = function(){
    let yourName = prompt("Whats your Name?");
    !yourName? document.querySelector(".name span").innerHTML = "Unknown":
               document.querySelector(".name span").innerHTML = yourName;
    document.querySelector(".control-buttons").remove();
 }
 //playing phase 
 const  game_blocks = document.querySelector(".memory-game-blocks");
 const blocks = Array.from(game_blocks.children);
 const orderRange = [...Array(blocks.length).keys()];
 shuffle(orderRange);
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