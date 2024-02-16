
var table = document.createElement('table');
var tbody = document.createElement('tbody');
table.setAttribute('id','temp');
table.classList.add('table','table-striped');

tbody.setAttribute('id','ttemp');
table.append(tbody)
var array_book = [];
var order_summary = document.querySelector(".order-summary");
var book = document.getElementsByClassName("book-title");
var price = document.getElementsByClassName("input-group-text book-price");
order_summary.parentNode.insertBefore(table, order_summary.nextSibling);
function calSummary(){
    console.log('Summary button is clicked.');  
    var quantity_of_book = 0;
    var books_prices = 0;
    var transport_price = 0;
    var discout_price = 0;
    var temp_table = document.querySelector('#temp');
    var temp_tbody = document.querySelector('#ttemp');
    temp_tbody.innerHTML = "";
    array_book = [];
    for(let i = 1;i< 8;i++){
        var quantity = document.querySelector("#book"+ i +"-quantity");
        quantity_of_book += parseInt(quantity.value);
        array_book.push(parseInt(quantity.value));
    }
    for(let i = 0;i < 10;i++){
        var row = document.createElement('tr');
            for(let j = 0;j < 3;j++){
                var cell = document.createElement('td');
                if(i < 7){
                    if(j == 0){
                        cell.innerHTML = book[i].innerHTML;
                    }else if(j == 1){
                        cell.innerHTML = "("+parseFloat(price[i].innerHTML)+"x"+array_book[i]+")";
                    }else{
                        books_prices += price[i].innerHTML * array_book[i];
                        cell.innerHTML = price[i].innerHTML * array_book[i];
                    }
                }else if(i == 7){
                    if(j == 0){
                        cell.innerHTML = "ส่วนลดค่าหนังสือ:";
                    }else if(j == 1){
                        cell.innerHTML = "";
                    }else{
                        if(quantity_of_book >= 3 && quantity_of_book < 5){
                            discout_price = 0.1;
                        }else if(quantity_of_book >= 5){
                            discout_price = 0.15;
                        }
                        cell.innerHTML = discout_price*100 + "%";
                    }
                }else if(i == 8){
                    if(j == 0){
                        cell.innerHTML = "ค่าจัดส่ง:";
                    }else if(j == 1){
                        cell.innerHTML = "("+quantity_of_book+"x"+"5)";
                    }else{
                        if(books_prices >= 500){
                            transport_price = 0
                            cell.innerHTML = 0;
                        }else{
                            transport_price = quantity_of_book*5
                            cell.innerHTML = quantity_of_book*5;
                        }
                    }
                }else{
                    if(j == 0){cell.innerHTML = "ราคารวม(ค่าหนังสือหลังหักส่วนลด + ค่าจัดส่ง):";}
                    else if(j == 1){cell.innerHTML = "";}
                    else{cell.innerHTML = ((books_prices*(1-discout_price))+transport_price).toFixed(2);}
                }
                row.appendChild(cell);
            }
        
        
        temp_tbody.appendChild(row);
    }
    
    temp_table.appendChild(temp_tbody);
}

const btnSummary = document.querySelector('#btnSummary');
btnSummary.addEventListener('click', calSummary);

// Reset button handler
function clearSummary(){
    var temp_tbody = document.querySelector('#ttemp');
    console.log('Reset button is clicked.');
    temp_tbody.innerHTML = ""
    for(let i = 1;i<8;i++){
        reset=document.querySelector("#book"+i+"-quantity");
        reset.value = 0;
    }
}

const btnReset = document.querySelector('#btnReset');
btnReset.addEventListener('click', clearSummary);