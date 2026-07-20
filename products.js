
//=================================
// PRODUCTS.JS
//=================================

//===============================
// UNIVERSAL POPUP
//===============================

function openPopup(title, html){

    document.getElementById("popupTitle").innerHTML = title;
    document.getElementById("popupBody").innerHTML = html;
    document.getElementById("popupOverlay").style.display = "flex";

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

<br><br>

<div id="productMessage"></div>

`);

document.getElementById("saveProductBtn").onclick=saveProduct;

}

//===========================
// SAVE PRODUCT
//===========================

function saveProduct(){

const product={

product:document.getElementById("pProduct").value,

category:document.getElementById("pCategory").value,

supplier:document.getElementById("pSupplier").value,

buying:Number(document.getElementById("pBuying").value),

selling:Number(document.getElementById("pSelling").value),

stock:Number(document.getElementById("pStock").value),

reorder:Number(document.getElementById("pReorder").value)

};

google.script.run

.withSuccessHandler(function(res){

document.getElementById("productMessage").innerHTML=`

<div style="background:#e8f5e9;padding:15px;border-radius:8px;">

<h3>✔ Product Saved Successfully</h3>

<p><b>Barcode:</b> ${res.barcode}</p>

<p><b>Product:</b> ${res.product}</p>

<p><b>Selling Price:</b> KSh ${res.selling}</p>

<br>

<button id="printNewLabel">

🖨 Print Label

</button>

<button id="addAnotherProduct">

➕ Add Another

</button>

</div>

`;

document.getElementById("printNewLabel").onclick=function(){

alert("Barcode printing will be connected next.");

};

document.getElementById("addAnotherProduct").onclick=openAddProduct;

})

.withFailureHandler(function(err){

document.getElementById("productMessage").innerHTML=

"<span style='color:red;'>"+err+"</span>";

})

.addProduct(product);

}
//===========================
// PRODUCT MANAGEMENT MENU
//===========================

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("productsBtn").onclick = function () {

        openPopup("📦 PRODUCT MANAGEMENT", `

            <div style="display:flex;gap:10px;flex-wrap:wrap;">

                <button id="menuAddProduct">➕ Add Product</button>

                <button id="menuImportProducts">📥 Import Products</button>

                <button id="menuBarcodeLabels">🏷 Barcode Labels</button>

            </div>

            <hr>

            <div id="productWorkArea">

                <p>Select an option above.</p>

            </div>

        `);

        document.getElementById("menuAddProduct").onclick = openAddProduct;

        document.getElementById("menuImportProducts").onclick = function () {

            alert("Import Products module coming next.");

        };

        document.getElementById("menuBarcodeLabels").onclick = function () {

            alert("Barcode Labels module coming next.");

        };

    };

});
