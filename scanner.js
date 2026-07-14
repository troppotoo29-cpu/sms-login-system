// ======================================
// SUPERMARKET POS SCANNER
// ======================================

window.addEventListener("message", function(event){

    if(!event.data) return;

    if(event.data.type !== "POS_BARCODE") return;

    const barcode = String(event.data.barcode).trim();

    console.log("Scanned:", barcode);

    // Add product directly to cart
    addProduct(barcode);

});
