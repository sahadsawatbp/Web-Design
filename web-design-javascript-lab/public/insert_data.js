const userListRef = firebase.database().ref("UserList");
const gameUserListRef = firebase.database().ref("GameList");
let addList = () => {
    var title = document.getElementById('toDoInput').value;
    const currentUser = firebase.auth().currentUser;
    userListRef.child(currentUser.uid).push({
        title: title,
    })
    
    alert("Add list complete!");
    document.getElementById("toDoInput").value = "";
}

let addList2 = () => {
    var username = document.getElementById('toDoInput2').value;
    var score = document.getElementById('toDoInput3').value;

    const currentUser2 = firebase.auth().currentUser;
    gameUserListRef.child(currentUser2.uid).push({
        username: username,
        score: score
    })

    alert("Add player complete!");
    document.getElementById("toDoInput2").value = "";
    document.getElementById("toDoInput3").value = "";
}