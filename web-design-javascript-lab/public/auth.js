
const signupForm = document.querySelector("#signup-form")
signupForm.addEventListener("submit", createUser);
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginUser);
const btnSignup = document.querySelector("#btnSignUp")
const btnLogin = document.querySelector("#btnLogin")
const btnLogout = document.querySelector("#btnLogout");
const loginFeedback = document.querySelector("#feedback-msg-login");
const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"));
const signupFeedback = document.querySelector("#feedback-msg-signup");
const signupModal = new bootstrap.Modal(document.querySelector("#modal-signup"));


function createUser(event){
    event.preventDefault();
    const email = signupForm["input-email-signup"].value;
    const password = signupForm["input-password-signup"].value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() =>{
        signupFeedback.style = "color:green";
        signupFeedback.innerHTML="<i class='bi bi-check-circle-fill'></i> Signup completed.";
        setTimeout(()=>{
            signupModal.hide();
        }, 1000)
        signupForm.reset();
        createScore()
    })
    .catch((error)=>{
        signupFeedback.style="color:crimson";
        signupFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
        signupFeedback.reset();
    })
    
}

const btnCancels = document.querySelectorAll(".btn-cancel");
btnCancels.forEach((btn) =>{
    btn.addEventListener("click",()=>{
        signupForm.reset();
        signupFeedback.innerHTML = "";
        loginForm.reset();
        loginFeedback.innerHTML = "";
    })
})
var score
firebase.auth().onAuthStateChanged((user) =>{
    userListRef.once("value", (snapshot)=>{
        snapshot.forEach((data)=>{
            if(user.uid == data.key && user){
                if(data.val().score != null){
                    score = data.val().score
                    console.log("It has")
                }
            }
        })
    
    })
    setupUI(user)
})

function createScore(){
    const currentUser = firebase.auth().currentUser;
    userListRef.child(currentUser.uid).update({
        score:0
    })
}


btnLogout.addEventListener("click", function(e){
    e.preventDefault();
    firebase.auth().signOut();
    console.log("Logout completed.")
})



function loginUser(event){
    event.preventDefault();
    const email = loginForm["input-email-login"].value;
    const password = loginForm["input-password-login"].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
        loginFeedback.style = "color:green";
        loginFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Login succeed!.";
        setTimeout(()=>{
            loginModal.hide();
        }, 1000)
        loginForm.reset();
        
    }).catch((error)=>{
        loginFeedback.style = "color:crimson";
        loginFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`;
        loginForm.reset();
    })
}

