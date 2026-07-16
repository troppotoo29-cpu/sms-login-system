//=========================================
// SUPERMARKET POS PRO
// ADMIN.JS
//=========================================

// Administrator password
// Later we shall verify from USERS sheet

const ADMIN_PASSWORD = "1234";

let adminLoggedIn = false;

//===============================
// Build Administration Menu
//===============================

document.addEventListener("DOMContentLoaded", () => {

    const panel = document.querySelector(".adminPanel");

    if (!panel) return;

    showAdminLogin();

});

//===============================
// ADMIN LOGIN SCREEN
//===============================

function showAdminLogin(){

const panel=document.querySelector(".adminPanel");

panel.innerHTML=`

<h2>🔒 ADMINISTRATION</h2>

<button class="adminButton" id="adminLoginBtn">

Administrator Login

</button>

`;

document
.getElementById("adminLoginBtn")
.onclick=openAdminLogin;

}

//===============================
// PASSWORD POPUP
//===============================

function openAdminLogin(){

const pass=prompt("Enter Administrator Password");

if(pass===null) return;

if(pass===ADMIN_PASSWORD){

adminLoggedIn=true;

showAdminMenu();

}else{

alert("Wrong Administrator Password");

}

}

//===============================
// ADMIN MENU
//===============================

function showAdminMenu(){

const panel=document.querySelector(".adminPanel");

panel.innerHTML=`

<h2>⚙ ADMINISTRATION</h2>

<button class="adminButton" id="productsMenu">

📦 Products >

</button>

<button class="adminButton" id="reportsMenu">

📈 Reports >

</button>

<button class="adminButton" id="usersMenu">

👥 Users >

</button>

<button class="adminButton" id="settingsMenu">

⚙ Settings >

</button>

<button class="adminButton" id="backupMenu">

💾 Backup

</button>

<button class="adminButton" id="restoreMenu">

📂 Restore

</button>

<button class="adminButton" id="backMain">

⬅ Exit Administration

</button>

`;

document
.getElementById("productsMenu")
.onclick=showProductsMenu;

document
.getElementById("reportsMenu")
.onclick=showReportsMenu;

document
.getElementById("usersMenu")
.onclick=showUsersMenu;

document
.getElementById("backMain")
.onclick=showAdminLogin;

}

//================================
// Temporary placeholders
//================================
function showProductsMenu(){

const panel=document.querySelector(".adminPanel");

panel.innerHTML=`

<h2>📦 PRODUCTS</h2>

<button class="adminButton" id="addProductBtn">

➕ Add Product

</button>

<button class="adminButton" id="importProductBtn">

📥 Import Products

</button>

<button class="adminButton" id="barcodeBtn">

🏷 Barcode Labels

</button>

<button class="adminButton" id="viewProductsBtn">

📋 View Products

</button>

<button class="adminButton" id="logoutBtn">

🚪 Logout

</button>

<hr>

<button class="adminButton" id="backAdminBtn">

⬅ Back

</button>

`;

document.getElementById("addProductBtn").onclick=openAddProduct;

document.getElementById("importProductBtn").onclick=openImportProducts;

document.getElementById("barcodeBtn").onclick=openBarcodeCenter;

document.getElementById("viewProductsBtn").onclick=openViewProducts;

document.getElementById("logoutBtn").onclick=function(){

location.reload();

};

document.getElementById("backAdminBtn").onclick=showAdminMenu;

}

function showReportsMenu(){

alert("Reports Menu Coming Next");

}

function showUsersMenu(){

alert("Users Menu Coming Next");

}
//====================================
// PRODUCT MODULES
//====================================

function openImportProducts(){

alert("📥 Import Products");

}

function openBarcodeCenter(){

alert("🏷 Barcode Labels");

}

function openViewProducts(){

alert("📋 View Products");

}
