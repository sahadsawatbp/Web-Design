const gameRef = firebase.database().ref("Game");

const btnJoins = document.querySelectorAll(".btn-join");
btnJoins.forEach((btnJoins) => btnJoins.addEventListener("click", joinGame));

function joinGame(event){
    const currentUser = firebase.auth().currentUser;
    console.log("[Join] Current user", currentUser);
    if(currentUser){
        const btnJoinID = event.currentTarget.getAttribute("id");
        const player = btnJoinID[btnJoinID.length-1];

        const playerForm = document.getElementById(`inputPlayer-${player}`);
        if(playerForm.value == ""){
            // Add Player into database
            let tmpID = `user-${player}-id`;
            let tmpEmail = `user-${player}-email`;
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
                case "user-x-email":
                    document.getElementById("inputPlayer-x").value = gameInfo[key];
                    document.querySelector("#btnJoin-x").disabled = true;
                    break;
                case "user-o-email":
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
    if (x != "" && o != "" && !nowStart) {
        document.querySelector("#btnStartGame").disabled = false;
    };
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
            let tmpID = `user-${player}-id`;
            let tmpEmail = `user-${player}-email`;
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

function conBox(e) {
    console.log(e.currentTarget.id);
};

const btnEnd = document.querySelector("#btnTerminateGame");
btnEnd.addEventListener("click", endGame);
function endGame(e) {
    gameRef.child("game-1").child("status").remove();
};