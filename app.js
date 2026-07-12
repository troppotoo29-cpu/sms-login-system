// ================================
// SUPERMARKET POS PRO
// APP.JS
// ================================

// CHANGE THIS ONLY IF YOUR WEB APP URL CHANGES
const API_URL =
"https://script.google.com/macros/s/AKfycbzePx5cuuwA7rwCluReda04d2W_hduXcOSCa_30x1XRFtqVwSj2vw76x3qMUl2txysk/exec";

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
