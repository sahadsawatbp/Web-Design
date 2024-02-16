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
    }
}