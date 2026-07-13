// ================================
// SUPERMARKET POS PRO
// APP.JS
// ================================

// CHANGE THIS ONLY IF YOUR WEB APP URL CHANGES
const API_URL =
"https://script.google.com/macros/s/AKfycbz7nMIXMfRZIFPM7h-J-E06hDgQ3mQB3ncLffMpitFEMRHLaQOn7e6cK_t2K0AZKp6J/exec";
document.addEventListener("DOMContentLoaded", function () {

    const loginButton =
    document.getElementById("loginBtn");

    if(loginButton){

        loginButton.addEventListener(
            "click",
            login
        );

    }


    const saleButton =
    document.getElementById("completeSale");

    if(saleButton){

        saleButton.addEventListener(
            "click",
            completeSale
        );

    }

});
async function login(){

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();


    if(username=="" || password==""){

        document.getElementById("loginMsg").innerHTML =
        "Enter Username and Password";

        return;

    }


    document.getElementById("loginMsg").innerHTML =
    "Logging in...";


    try{


        const url =
        API_URL +
        "?action=login" +
        "&username=" +
        encodeURIComponent(username) +
        "&password=" +
        encodeURIComponent(password);


        console.log("LOGIN URL:",url);


        const response = await fetch(url);


        const text = await response.text();


        console.log("SERVER RESPONSE:",text);


        const data = JSON.parse(text);



        if(data.success){


            document.getElementById("cashierName").innerHTML =
            data.fullname;


            document.getElementById("loginPage").style.display =
            "none";


            document.getElementById("dashboard").style.display =
            "flex";


        }
        else{


            document.getElementById("loginMsg").innerHTML =
            data.message;


        }


    }
    catch(err){


        console.log(err);


        document.getElementById("loginMsg").innerHTML =
        "Cannot connect to server";


    }

}
//===============================
// LIVE PRODUCT SEARCH
//===============================

document.addEventListener("DOMContentLoaded",()=>{

const txt=document.getElementById("search");

if(txt){

txt.addEventListener("keyup",searchProducts);

}

});

async function searchProducts(){

const keyword=document.getElementById("search").value.trim();

if(keyword==""){

document.getElementById("results").innerHTML="";

return;

}

const res=await fetch(

API_URL+

"?action=search&search="+

encodeURIComponent(keyword)

);

const products=await res.json();

showProducts(products);

}

function showProducts(products){

let html="";

if(products.length==0){

html="<div style='padding:10px'>No products found</div>";

}else{

products.forEach(p=>{

html+=`

<div class="productItem"

style="padding:10px;
border-bottom:1px solid #ddd;
cursor:pointer;"

onclick="addProduct('${p.barcode}')">

<b>${p.product}</b><br>

Barcode : ${p.barcode}<br>

Price : KSh ${p.selling}<br>

Stock : ${p.stock}

</div>

`;

});

}

document.getElementById("results").innerHTML=html;

}
//===============================
// SHOPPING CART
//===============================

let cart=[];

async function addProduct(barcode){

const res=await fetch(

API_URL+

"?action=getProduct&barcode="+barcode

);

const p=await res.json();

if(!p){

alert("Product not found");

return;

}

let item=cart.find(x=>x.barcode==p.barcode);

if(item){

item.qty++;

}else{

cart.push({

barcode:p.barcode,

product:p.product,

price:Number(p.selling),

qty:1

});

}

drawCart();

document.getElementById("results").innerHTML="";

document.getElementById("search").value="";

}

function drawCart(){

const tbody=document.getElementById("cart");

tbody.innerHTML="";

let total=0;

cart.forEach(item=>{

const line=item.qty*item.price;

total+=line;

tbody.innerHTML+=`

<tr>

<td>${item.product}</td>

<td>${item.qty}</td>

<td>${item.price}</td>

<td>${line}</td>

<td>

<button onclick="removeItem('${item.barcode}')">

X

</button>

</td>

</tr>

`;

});

if(cart.length==0){

tbody.innerHTML="<tr><td colspan='5'>No Items</td></tr>";

}

document.getElementById("grandTotal").innerHTML=

total.toFixed(2);
  calculateBalance();

}

function removeItem(barcode){

cart=cart.filter(x=>x.barcode!=barcode);

drawCart();

}
//===============================
// PAYMENT
//===============================

document.addEventListener("DOMContentLoaded",()=>{

const paid=document.getElementById("amountPaid");

if(paid){

paid.addEventListener("keyup",calculateBalance);

paid.addEventListener("change",calculateBalance);

}

});

function calculateBalance(){

const total=Number(

document.getElementById("grandTotal").innerHTML

);

const paid=Number(

document.getElementById("amountPaid").value

);

const balance=paid-total;

if(isNaN(paid)){

document.getElementById("change").value="";

return;

}

if(balance<0){

document.getElementById("change").value=

"Balance Due: KSh "+Math.abs(balance).toFixed(2);

}else{

document.getElementById("change").value=

"KSh "+balance.toFixed(2);

}

}
//=================================
// COMPLETE SALE
//=================================

async function completeSale(){

    if(cart.length==0){

        alert("Cart is empty.");

        return;

    }

    const paid = Number(
        document.getElementById("amountPaid").value
    );

    const total = Number(
        document.getElementById("grandTotal").innerHTML
    );

    if(paid < total){

        alert("Amount paid is less than total.");

        return;

    }

    const payment =
        document.getElementById("paymentMethod").value;

    const balance = paid-total;

    // add buying price for every item
    for(let i=0;i<cart.length;i++){

        const r = await fetch(
            API_URL+
            "?action=getProduct&barcode="+
            cart[i].barcode
        );

        const p = await r.json();

        cart[i].buying = p.buying;

    }

    const sale={

        cashier:
        document.getElementById("cashierName").innerHTML,

        total:total,

        paid:paid,

        balance:balance,

        payment:payment,

        items:cart

    };
const res = await fetch(
    API_URL + "?action=completeSale",
    {
        method:"POST",
        body:JSON.stringify(sale)
    }
);
const result = await res.json();

if(result.success){

    alert("Sale Completed Successfully");

    // Print receipt only if the function exists
    if(typeof printReceipt === "function"){
        printReceipt(sale);
    }

    // Clear cart
    cart = [];
    drawCart();

    // Clear payment
    document.getElementById("amountPaid").value = "";
    document.getElementById("change").value = "";

    // Clear search
    document.getElementById("search").value = "";
    document.getElementById("results").innerHTML = "";

    // Reset total display
    calculateBalance();

    // Ready for next customer
    document.getElementById("search").focus();

}else{

    alert(result.message);

}
