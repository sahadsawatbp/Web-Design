const gameRef = firebase.database().ref("Game");
const btnJoins = document.querySelectorAll(".btn-join");
btnJoins.forEach((btnJoins) => btnJoins.addEventListener("click", joinGame));
const textShowing = document.getElementById('text-show');
function joinGame(event){
    const currentUser = firebase.auth().currentUser;
    console.log("[Join] Current user", currentUser);
    if(currentUser){
        const btnJoinID = event.currentTarget.getAttribute("id");
        const player = btnJoinID[btnJoinID.length-1];
        const playerForm = document.getElementById(`inputPlayer-${player}`);
        if(playerForm.value == ""){
            // Add Player into database
            let tmpID = `user_${player}_id`;
            let tmpEmail = `user_${player}_email`;
            gameRef.child("game-1").update({
                [tmpID]: currentUser.uid,
                [tmpEmail]:currentUser.email
            });
            console.log(currentUser.email + " added.");
            event.currentTarget.disabled = true;
        }
        if("inputPlayer-x"){
            document.querySelector("#btnJoin-o").disabled = true;
        }
        if("inputPlayer-o"){
            document.querySelector("#btnJoin-x").disabled = true;
        };
    };
};

gameRef.on("value", (snapshot) =>{
    getGameInfo(snapshot);
});
const box = document.querySelectorAll(".table-col");

function getGameInfo(snapshot){
    document.getElementById("inputPlayer-x").value = "";
    document.getElementById("inputPlayer-o").value = "";
    document.querySelector("#btnJoin-o").disabled = false;
    document.querySelector("#btnJoin-x").disabled = false;
    document.querySelector("#btnStartGame").disabled = true;
    document.querySelector("#btnTerminateGame").disabled = true;
    const btnCancel = document.querySelectorAll(".btn-cancel-join-game");
    btnCancel.forEach((btn) => {
        btn.disabled = false;
    });
    box.forEach((item) => {
        item.removeEventListener("click", conBox);
    });
    let nowStart = false;
    snapshot.forEach((data) => {
        const gameInfo = data.val();
        Object.keys(gameInfo).forEach((key)=>{
            switch(key){
                case "user_x_email":
                    document.getElementById("inputPlayer-x").value = gameInfo[key];
                    document.querySelector("#btnJoin-x").disabled = true;
                    break;
                case "user_o_email":
                    document.getElementById("inputPlayer-o").value = gameInfo[key];
                    document.querySelector("#btnJoin-o").disabled = true;
                    break;
                case "status":
                    nowStart = true;
                    document.querySelector("#btnStartGame").disabled = true;
                    document.querySelector("#btnTerminateGame").disabled = false;
                    box.forEach((item) => {
                        item.addEventListener("click", conBox);
                    });
                    btnCancel.forEach((btn) => {
                        btn.disabled = true;
                    });
                    break;
            };
        });
    });
    const x = document.getElementById(`inputPlayer-x`).value;
    const o = document.getElementById(`inputPlayer-o`).value;
    console.log(nowStart)
    if (x != "" && o != "" && !nowStart) {
        document.querySelector("#btnStartGame").disabled = false;
        textShowing.innerHTML = 'Click START GAME';
    }
    snapshot.forEach((data)=>{
        if(x != "" && o != "" && nowStart){
            textShowing.innerHTML = `Turn: ${data.val().turn.toUpperCase()}`;
        }
    })
    

   

};



const btnCancelJoins = document.querySelectorAll(".btn-cancel-join-game");
btnCancelJoins.forEach((btnCancel) => btnCancel.addEventListener("click", cancelJoin));

function cancelJoin(event){
    const currentUser = firebase.auth().currentUser;
    console.log("[Cancel] Current user: ", currentUser);
    if(currentUser){
        const btnCancelID = event.currentTarget.getAttribute("id");
        const player = btnCancelID[btnCancelID.length-1];
        const playerForm = document.getElementById(`inputPlayer-${player}`);
        if(playerForm.value && playerForm.value === currentUser.email){
            let tmpID = `user_${player}_id`;
            let tmpEmail = `user_${player}_email`;
            gameRef.child("game-1").child(tmpID).remove();
            gameRef.child("game-1").child(tmpEmail).remove();
            console.log(`delete on id: ${currentUser.uid}`);
            document.querySelector(`#btnJoin-${player}`).disabled = false;
        };
        if("inputPlayer-x"){
            document.querySelector("#btnJoin-o").disabled = false;
            
        };
        if("inputPlayer-o"){
            document.querySelector("#btnJoin-x").disabled = false;
            
        };
    };
};



const btnStart = document.querySelector("#btnStartGame");
btnStart.addEventListener("click", startGame);
function startGame(e) {
    gameRef.child("game-1").update({
        ["status"]: "start",
    });
};

const playerXCombos = [];
const playerOCombos = [];
var turns = 0;
const winningCombos = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"], 
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"]
];
function conBox(e) {
    const currentUser = firebase.auth().currentUser;
    gameRef.once("value", (snapshot) =>{
        snapshot.forEach((data)=>{
            if(currentUser.email == data.val().user_x_email){
                if(data.val().turn == "x"){
                    e.currentTarget.childNodes[1].innerHTML = "X";
                    textShowing.innerHTML = 'Turn: O';
                    gameRef.child("game-1").update({
                        ["turn"]: "o",
                    });
                    // playerXCombos.push(e.currentTarget.childNodes[1].getAttribute("data-symbol"));
                    gameRef.child("game-1/playerXCombos").push(e.currentTarget.childNodes[1].getAttribute("data-symbol"));
                    // gameRef.child("game-1/playerXCombos").push(playerXCombos);
                    e.currentTarget.childNodes[1].setAttribute("data-symbol","x")
                }
            }
            if(currentUser.email == data.val().user_o_email){
                if(data.val().turn == "o"){
                    e.currentTarget.childNodes[1].innerHTML = "O";
                    textShowing.innerHTML = 'Turn: X';
                    gameRef.child("game-1").update({
                        ["turn"]: "x",
                    });
                    // playerOCombos.push(e.currentTarget.childNodes[1].getAttribute("data-symbol"));
                    gameRef.child("game-1/playerOCombos").push(e.currentTarget.childNodes[1].getAttribute("data-symbol"));
                    e.currentTarget.childNodes[1].setAttribute("data-symbol","o")
                }
            }
            
        })
    });
    checkDraw();
    checkWinnerX();
    checkWinnerO();
    turns++;
};

function loadGameScreen(){
    gameRef.child("game-1").once("value", (snapshot) =>{
        snapshot.forEach((data)=>{
            data.forEach((d)=>{
                console.log(d.val())
                playerXCombos.push(d.val())
                console.log(playerXCombos)
            })
        })
    })
}
function checkWinnerX(){
    playerXCombos.sort()
    const currentUser = firebase.auth().currentUser;
    for(let i = 0;i<winningCombos.length;i++){
        if(playerXCombos.indexOf(winningCombos[i][0])>=0){
            if(playerXCombos.indexOf(winningCombos[i][1])>=0){
                if(playerXCombos.indexOf(winningCombos[i][2])>=0){
                    textShowing.innerHTML = 'Winner: X';
                    console.log("Winner X")
                    userListRef.child(currentUser.uid).update({
                        score:score+3
                    })
                    return true;
                }
            }
        }
    }
}
function checkWinnerO(){
    playerOCombos.sort()
    const currentUser = firebase.auth().currentUser;
    for(let i = 0;i<winningCombos.length;i++){
        if(playerOCombos.indexOf(winningCombos[i][0])>=0){
            if(playerOCombos.indexOf(winningCombos[i][1])>=0){
                if(playerOCombos.indexOf(winningCombos[i][2])>=0){
                    textShowing.innerHTML = 'Winner: O';
                    console.log("Winner O")
                    userListRef.child(currentUser.uid).update({
                        score:score+3
                    })
                    return true;
                }
            }
        }
    }
}



function checkDraw(){
    const currentUser = firebase.auth().currentUser;
    if(turns == 8 && !checkWinnerO() && !checkWinnerX()){
        console.log("Draw")
        userListRef.child(currentUser.uid).update({
            score:score+1
        })
        return true;
    }
}

const btnEnd = document.querySelector("#btnTerminateGame");
btnEnd.addEventListener("click", endGame);
function endGame(e) {
    gameRef.child("game-1").child("status").remove();
};