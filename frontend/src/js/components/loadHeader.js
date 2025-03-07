//ajoutes la navbar depuis /src/components/header.html 


document.addEventListener("DOMContentLoaded", () => {
    fetch("./components/header.html")
        .then(response => response.text())
        .then(data => {
            const headerElement = document.getElementById("header");
            if (headerElement) {
                headerElement.innerHTML = data;  // ✅ Replace instead of append
            } else {
                console.error("❌ Error: Cannot find element with id='header'");
            }
        })
        .catch(error => console.error("❌ Error loading header:", error));
});



   
    