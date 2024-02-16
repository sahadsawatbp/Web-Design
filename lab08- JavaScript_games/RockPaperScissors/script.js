var userShape = '';
var compShape = '';
var userScore = 0;
var compScore = 0;
var tieGames = 0;

var comp_rock = document.getElementById("comp_rockImg")
var comp_paper = document.getElementById("comp_paperImg")
var comp_scissor =  document.getElementById("comp_scissorsImg")
var user_rock = document.getElementById("user_rockImg")
var user_paper = document.getElementById("user_paperImg")
var user_scissor =  document.getElementById("user_scissorsImg")
var startBtn = document.getElementById("startButton")

var output = document.getElementById('stage');
output.style.fontSize = '3em'

function startGame(){    
    randomShape(); 
    checkResult();
    updateScores();
}

function resetGame(){    
    var images = document.getElementsByTagName('img')
    for (var im of images){
        im.style.opacity = 1;
        if(im == user_rock || im == user_paper || im == user_scissor){
            im.setAttribute("onclick","selectedShape(this)")
        }
    }
    userShape = '';
    compShape = '';
    userScore = 0;
    compScore = 0;    
    output.innerText = ''

    document.getElementsByTagName('th')[0].innerText = `Game #${userScore+compScore+tieGames+1}`
    document.getElementById('userScore').innerText = `#Game win: ${userScore}`
    document.getElementById('compScore').innerText = `#Game win: ${compScore}`    
    document.getElementById('resetButton').disabled = true;    

   // 5. If the game end, user MUST click reset before start the new game
}


function selectedShape(obj){    
    
    // 5. If the game end, user MUST click reset before start the new game

    output.innerText = ''
    document.getElementsByTagName('th')[0].innerText = `Game #${userScore+compScore+tieGames+1}`
    
    comp_rock.style.opacity = 1;
    comp_paper.style.opacity = 1;
    comp_scissor.style.opacity = 1;
    
    // 1. Write some code here to specify the userShape based on the image they clicked.
    userShape = obj
    user_rock.style.opacity = 0.2;
    user_paper.style.opacity = 0.2;
    user_scissor.style.opacity = 0.2;
    userShape.style.opacity = 1
    // After user selected their shape, the start button will be activated.
    document.getElementById('startButton').disabled = false;    
}

function randomShape(){
    // 2. Write some code here to specify the compShape randomly.
    var temp_compShape = []
    temp_compShape.push(comp_rock,comp_paper,comp_scissor)
    compShape = temp_compShape[Math.floor(Math.random() * 3)]
    comp_rock.style.opacity = 0.2;
    comp_paper.style.opacity = 0.2;
    comp_scissor.style.opacity = 0.2;
    compShape.style.opacity = 1
}

function checkResult(){
    // 3. Write some code here to compute the result of each game, and update
    let result_user = userShape.alt.replace('u','')
    let result_comp = compShape.alt.replace('c','')
    let result = [  {user:"rock", comp:"paper", score:"comp"},
                    {user:"rock", comp:"scissors", score:"user"},
                    {user:"rock", comp:"rock", score:"tie"},
                    {user:"paper", comp:"scissors", score:"comp"},
                    {user:"paper", comp:"paper", score:"tie"},
                    {user:"paper", comp:"rock", score:"user"},
                    {user:"scissors", comp:"scissor", score:"tie"},
                    {user:"scissors", comp:"paper", score:"user"},
                    {user:"scissors", comp:"rock", score:"comp"},
                ]
    for(let i = 0;i < 9;i++){
        if(result[i].user == result_user && result[i].comp == result_comp){
            if(result[i].score == "comp"){
                compScore += 1;
            }
            else if(result[i].score == "user"){
                userScore += 1;
            }
        }
    }
    console.log(userScore +" "+compScore)
    startBtn.disabled = true;
    // userScore and compScore
    // After check the result of the current match, the start button will be deactivated.    
}

function updateScores(){
    // 4. Write some code here to update the scores of the whole game. 
    document.getElementById('userScore').innerText = `#Game win: ${userScore}`
    document.getElementById('compScore').innerText = `#Game win: ${compScore}`    
    var images = document.getElementsByTagName('img')
    // If there exist a player with more than 3 scores, the game end.
    var winner = "Congratulation, You WIN!!!"
    var loser = "Sorry, You Lose."
    if(userScore >= 3){
        output.innerText = winner;
        document.getElementById('resetButton').disabled = false;
        for(var im of images){
            im.removeAttribute("onclick")
        }
    }
    if(compScore >= 3){
        output.innerText = loser;
        document.getElementById('resetButton').disabled = false;
        for(var im of images){
            im.removeAttribute("onclick")
        }
    }

}