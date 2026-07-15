const API_URL =
"https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec";

document
.getElementById("saveBtn")
.addEventListener("click",saveProduct);

async function saveProduct(){

const product={
product:
document.getElementById("product").value.trim(),

category:
document.getElementById("category").value.trim(),

supplier:
document.getElementById("supplier").value.trim(),

buying:
document.getElementById("buying").value,

selling:
document.getElementById("selling").value,

stock:
document.getElementById("stock").value,

reorder:
document.getElementById("reorder").value

};

const res=await fetch(
API_URL+"?action=addProduct",
{
method:"POST",
body:JSON.stringify(product)
});

const data=await res.json();

document.getElementById("msg").innerHTML=data.message;

if(data.success){

alert(
"Barcode Generated : "+data.barcode
);

}
}
