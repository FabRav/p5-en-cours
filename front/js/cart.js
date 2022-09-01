document.addEventListener("DOMContentLoaded", function () {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main() {

        let ProductStorageArray = getLocalStorageProduct();
        let ProductId = ProductStorageArray.id;
        let ProductIdApi = await getProduct(ProductId);
        let ProductFinalArray = [];


        console.log(ProductId)
        //console.log(ProductIdApi)
        //console.log(ProductStorageArray);

        for (let i = 0; i < ProductStorageArray.length; i++) {
            ProductFinalArray.push(ProductStorageArray[i]);
        }

        //console.log(ProductFinalArray);

    }

    main();

    function getLocalStorageProduct() {
        let ProductLocalStorage = [];

        // Boucle for à la longueur du localStorage avec récuperation des informations du localstorage.
        for (let i = 0; i < localStorage.length; i++) {
            ProductLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        return ProductLocalStorage;
    }

    async function getProduct(product) {
        return fetch("http://localhost:3000/api/products/" + ProductId)
            .then(function (data) {
                return data.json();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


})