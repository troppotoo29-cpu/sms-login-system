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

document.getElementById("addAnotherProduct").onclick = showAddProduct;

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


//======================================
// ADD PRODUCT
//======================================

function showAddProduct() {

    document.getElementById("productContent").innerHTML = `

        <label>Product Name</label>
        <input id="pProduct">

        <label>Category</label>
        <input id="pCategory">

        <label>Supplier</label>
        <input id="pSupplier">

        <label>Buying Price</label>
        <input id="pBuying" type="number">

        <label>Selling Price</label>
        <input id="pSelling" type="number">

        <label>Opening Stock</label>
        <input id="pStock" type="number">

        <label>Reorder Level</label>
        <input id="pReorder" type="number">

        <br><br>

        <button id="saveProductBtn">

            💾 SAVE PRODUCT

        </button>

        <div id="productMessage"></div>

    `;

    document.getElementById("saveProductBtn").onclick = saveProduct;

}
//======================================
// IMPORT PRODUCTS
//======================================

function showImportProducts(){

    document.getElementById("productContent").innerHTML=`

        <h3>📥 Import Products</h3>

        <input type="file" id="excelFile">

        <br><br>

        <button id="previewExcel">

            Preview Excel

        </button>

        <br><br>

        <button id="importProductsBtn">

            IMPORT PRODUCTS

        </button>

        <div id="previewArea"></div>

    `;

}
//======================================
// BARCODE LABELS
//======================================

function showBarcodeLabels(){

    document.getElementById("productContent").innerHTML=`

        <h3>🏷 Barcode Label Center</h3>

        <input id="labelSearch" placeholder="Search Product">

        <br><br>

        <select id="labelLayout">

            <option>21 Labels / A4</option>

            <option>30 Labels / A4</option>

            <option>40 Labels / A4</option>

        </select>

        <br><br>

        <button>

            🖨 PRINT LABELS

        </button>

        <button>

            💾 SAVE PDF

        </button>

    `;

}
