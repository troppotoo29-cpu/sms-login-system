// ================================
// SUPERMARKET POS PRO
// APP.JS
// ================================

// CHANGE THIS ONLY IF YOUR WEB APP URL CHANGES
const API_URL =
"https://script.google.com/macros/s/AKfycbwimogYFQ6VVKHnnm6qs62r3I53jUT5QHa7LvMd2aByO6DI8rRPCYJoBE9oz0inazYX/exec";

document.addEventListener("DOMContentLoaded", function () {

    document
        .getElementById("loginBtn")
        .addEventListener("click", login);

});

async function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (username == "" || password == "") {

        document.getElementById("loginMsg").innerHTML =
            "Enter Username and Password";

        return;

    }

    document.getElementById("loginMsg").innerHTML =
        "Logging in...";

    try {

        const response = await fetch(

            API_URL +

            "?action=login" +

            "&username=" + encodeURIComponent(username) +

            "&password=" + encodeURIComponent(password)

        );

        const data = await response.json();

        if (data.success) {

            document.getElementById("cashierName").innerHTML =
                data.fullname;

            document.getElementById("loginPage").style.display =
                "none";

            document.getElementById("dashboard").style.display =
                "flex";

        } else {

            document.getElementById("loginMsg").innerHTML =
                data.message;

        }

    } catch (err) {

        document.getElementById("loginMsg").innerHTML =
            "Cannot connect to server";

        console.log(err);

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
