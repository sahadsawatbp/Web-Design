// 1.1. Select Calculate button
const calBtn = document.querySelector('#calculateBtn');

// 1.2. Create a function handleCalculateBtn() which will 
// be fired when the button is clicked
// 1.2.1 Modify the code in handleCalculateBtn to calculate X+Y
function handleCalculateBtn(){
    console.log('calculation is clicked.');
    let numX = parseFloat(document.querySelector('#inputX').value);
    let numY = parseFloat(document.querySelector('#inputY').value);

    document.querySelector('#resultXY').value = numX+numY;
}
// 1.3. Bind the click event with the Calucate button
calBtn.addEventListener('click', handleCalculateBtn);

// (Alternative) 1.4. Bind the click event with anonymous function
function anonyMous(){
    let numX = parseFloat(document.querySelector('#inputX').value);
    let numY = parseFloat(document.querySelector('#inputY').value);
    console.log(numX+numY)
}
calBtn.addEventListener('click', anonyMous);

// 2.1 Select ALL buy buttons
const buyItemBtns = document.querySelectorAll('.buyBtn');
// 2.2 Create a function handleClick()
function handleClick(event){
    const price = event.currentTarget.dataset.price;
    console.log(price);
}

// 2.3 Create a function to bind the object to the event
for (i=0; i<buyItemBtns.length; i++){
    buyItemBtns[i].addEventListener('click', handleClick);
}

// 2.4 For each btn, call the bindBuyItemEvent()


// 3.1 cancle buttons
const cancelBtns = document.querySelectorAll('.btn-danger');
cancelBtns.forEach(function (singleBtn){
    singleBtn.addEventListener('click', handleCancelBtns);
});
function handleCancelBtns(event){
    event.stopPropagation();
    console.log(event.currentTarget);
}

// 3.2 news items
const newsItems = document.querySelectorAll('.news-items');
newsItems.forEach(function (singleBtn){
    singleBtn.addEventListener('click', handleNews);
});
function handleNews(event){
    // event.stopPropagation();
    console.log(event.currentTarget);
}

// 4. Display warning message for user to confirm their click on external URL
const exURL = document.querySelector('[name="externalURL"]');
exURL.addEventListener('click', function(event){
    const confirmMSG = confirm("The external URL could be malware! Do you want to continue?")
    if(!confirmMSG){
        event.preventDefault();
    }
    console.log('clicked external URLs');
})