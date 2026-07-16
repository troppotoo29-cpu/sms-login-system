//=================================
// PRODUCTS.JS
//=================================

function openPopup(title, html){

document.getElementById("popupTitle").innerHTML=title;

document.getElementById("popupBody").innerHTML=html;

document.getElementById("popupOverlay").style.display="flex";

}

document.addEventListener("DOMContentLoaded",()=>{

const close=document.getElementById("popupClose");

if(close){

close.onclick=function(){

document.getElementById("popupOverlay").style.display="none";

};

}

});

//===========================
// ADD PRODUCT
//===========================

function openAddProduct(){

openPopup("➕ ADD PRODUCT",`

<label>Product Name</label>

<input id="pProduct">

<br><br>

<label>Category</label>

<input id="pCategory">

<br><br>

<label>Supplier</label>

<input id="pSupplier">

<br><br>

<label>Buying Price</label>

<input id="pBuying" type="number">

<br><br>

<label>Selling Price</label>

<input id="pSelling" type="number">

<br><br>

<label>Opening Stock</label>

<input id="pStock" type="number">

<br><br>

<label>Reorder Level</label>

<input id="pReorder" type="number">

<br><br>

<button id="saveProductBtn">

💾 SAVE PRODUCT

</button>

`);

}
