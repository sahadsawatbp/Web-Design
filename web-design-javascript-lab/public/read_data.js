var ref = firebase.database().ref("MyList");
let readList = (snapshot) => {
    
    document.getElementById('main-content').innerHTML = "";
    // const currentUser = firebase.auth().currentUser;
    // userListRef.child(currentUser.uid).once("value").then((snapshot) => {
        snapshot.forEach((data) => {
            
                var id = data.key;
                var title = snapshot.child(id).child("title").val();
                const newDiv = `
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input">
                        <label class="form-check-label">${title}</label>
                        <span>
                            <button type="button" class="btn btn-outline-danger btn-delete" data-id="${id}">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </span>
                    <div>
                `;
                const newElement = document.createRange().createContextualFragment(newDiv);
                document.getElementById("main-content").appendChild(newElement);
                document.querySelectorAll("button.btn-delete").forEach((btn)=>{
                    btn.addEventListener("click", deleteList);
                });
            
        });
    // })
    console.log("Success");
};

let deleteList = (event) =>{
    const id = event.currentTarget.getAttribute('data-id');
    const currentUser = firebase.auth().currentUser;
    userListRef.child(currentUser.uid).child(id).remove();
    console.log(`delete on id: ${id}`);
}
let readList2 = () => {
    var ref = firebase.database().ref("Scores");
    document.getElementById('main-content2').innerHTML = "";
    const currentUser2 = firebase.auth().currentUser;
    gameUserListRef.child(currentUser2.uid).once("value").then((snapshot) => {
    snapshot.forEach((data) => {
            var id = data.key;
            let username = snapshot.child(id).child("username").val();
            let score = snapshot.child(id).child("score").val();

            const newDiv2 = `
                <div class="form-check">
                    <input type="checkbox" class="form-check-input">
                    <label class="form-check-label">${username}</label>
                    <label class="form-check-label"> -> score ${score}</label>
                <div>
            `
            const newElement2 = document.createRange().createContextualFragment(newDiv2);
            document.getElementById("main-content2").appendChild(newElement2);
        
        });
    });
}
let getList = (user) =>{
    if(user){
        userListRef.child(user.uid).on("value",(snapshot)=>{
            readList(snapshot);
            readList2();
        });
    };
};

const logoutItems = document.querySelectorAll(".logged-out");
const loginItems = document.querySelectorAll(".logged-in");
let setupUI = (user) =>{
    if(user){
        document.querySelector("#user-profile-name").innerHTML= user.email;
        loginItems.forEach((item)=>(item.style.display = "inline-block"));
        logoutItems.forEach((item)=>(item.style.display = "none"));
    }else{
        loginItems.forEach((item)=>(item.style.display = "none"));
        logoutItems.forEach((item)=>(item.style.display = "inline-block"));
    };
};