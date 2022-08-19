document.addEventListener("DOMContentLoaded", function () {

    async function main() {
        // On Récupére l'Url.
        const url = new URL(window.location.href);
        // productId = à Id récupérer en paramètre de notre Url
        let productId = url.searchParams.get("id");

        let product = await getProduct(productId);
        console.log(product);
        displayProduct(product);
    }

    main();

    //-------------------Fonction d'intérrogation de notre api avec product-------------------//
    //-----------------------------------------------------------------------------------------//

    async function getProduct(productId) {
        return fetch("http://localhost:3000/api/products/" + productId)
            .then(function (data) {
                return data.json();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //-------------------Fonction d'affichage des produits-------------------//
    //---------------------------------------------------------------------//

    function displayProduct(product) {
        const title = document.getElementsByTagName("title")[0];
        const parentImg = document.getElementsByClassName("item__img");
        const parentName = document.getElementById("title");
        const parentPrice = document.getElementById("price");
        const parentDescription = document.getElementById("description");


        // Création de notre balise image avec les attributs.
        const productImg = document.createElement("img");
        productImg.setAttribute("src", product.imageUrl);
        productImg.setAttribute("alt", product.altTxt);
        // Push après notre balise à la fin de la liste.
        parentImg[0].appendChild(productImg);

        title.innerHTML = product.name;
        parentName.innerText = product.name;
        parentPrice.innerText = product.price;
        parentDescription.innerText = product.description;

        // select colors

        const DomColors = document.getElementById("colors");
        let colors = product.colors;

        for (let color of colors) {
            DomColors.insertAdjacentHTML(
                "beforeend",
                `
                <option value="${color}">${color}</option>
                `
            )
        }
    }
})