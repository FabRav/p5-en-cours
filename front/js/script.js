document.addEventListener("DOMContentLoaded", function () {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main() {

        let products = await getProduct();

        displayProduct(products);

    }

    main();

    //-------------------Fonction d'intérrogation de notre api avec product-------------------//
    //-----------------------------------------------------------------------------------------//
    async function getProduct() {
        return fetch("http://localhost:3000/api/products")
            .then(function (data) {
                return data.json();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //-------------------Fonction d'affichage du produit-------------------//
    //---------------------------------------------------------------------//
    function displayProduct(products) {
        // Récupération du parent.
        const Dom = document.getElementById("items");
        for (let product of products) {
            Dom.insertAdjacentHTML(
                "beforeend",
                `
                <a href="./product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                    </article>
                </a>
                `
            )
        }
    }
});