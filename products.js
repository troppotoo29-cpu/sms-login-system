//======================================
// PRODUCT MANAGEMENT
//======================================

function openProducts() {

    openPopup("📦 PRODUCT MANAGEMENT", `

        <div class="productMenu">

            <button id="btnAddProduct">➕ Add Product</button>

            <button id="btnImportProducts">📥 Import Products</button>

            <button id="btnBarcodeLabels">🏷 Barcode Labels</button>

        </div>

        <hr>

        <div id="productContent"></div>

    `);

    document.getElementById("btnAddProduct").onclick = showAddProduct;
    document.getElementById("btnImportProducts").onclick = showImportProducts;
    document.getElementById("btnBarcodeLabels").onclick = showBarcodeLabels;

    // Open Add Product first
    showAddProduct();

}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("productsBtn").onclick = openProducts;

});

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
//===========================
// PRODUCTS BUTTON
//===========================

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("productsBtn").onclick = openAddProduct;

});
