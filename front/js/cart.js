document.addEventListener("DOMContentLoaded", function () {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main() {

        let ProductStorageArray = getLocalStorageProduct();

        let ApiArray = [];

        for (let i = 0; i < ProductStorageArray.length; i++) {
            ApiArray.push(await GetApi(ProductStorageArray[i].id));
        }

        let Allproducts = FusionArray(ProductStorageArray, ApiArray);

        displayProduct(Allproducts);

        displayPrice(Allproducts);

        Listen(Allproducts);

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

    async function GetApi(productId) {
        return fetch("http://localhost:3000/api/products/" + productId)
            .then(function (data) {
                return data.json();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //------------------------Récupération du LocalStorage -----------------------//
    //-------------------------------------------------------------------------//
    class ProductClass {
        constructor(id, name, color, qty, alttxt, description, imageurl, price) {
            this.id = id;
            this.name = name;
            this.color = color;
            this.qty = qty;
            this.alttxt = alttxt;
            this.description = description;
            this.imageurl = imageurl;
            this.price = price;
        }
    }


    //----------------Concaténer localStorage et api -----------------------//
    //----------------------------------------------------------------------//
    function FusionArray(localStorageArray, ApiArray) {

        let AllProducts = [];

        for (let i = 0; i < localStorageArray.length; i++) {

            let ObjectProduct = new ProductClass(
                localStorageArray[i].id,
                localStorageArray[i].name,
                localStorageArray[i].color,
                localStorageArray[i].qty,
                ApiArray[i].altTxt,
                ApiArray[i].description,
                ApiArray[i].imageUrl,
                ApiArray[i].price,
            )

            AllProducts.push(ObjectProduct);
        }

        return AllProducts;
    }

    // fonction afficichage

    function displayProduct(Allproducts) {
        // Récupération du parent.
        const Dom = document.getElementById("cart__items");
        for (let product of Allproducts) {
            Dom.insertAdjacentHTML(
                "beforeend",
                `
                <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${product.imageurl}" alt="${product.alttxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
                `
            )
        }
    }



    function displayPrice(Allproducts) {

        let totalPrice = 0;
        let totalQty = 0;

        for (product of Allproducts) {
            totalPrice += parseInt(product.qty * product.price);
            totalQty += parseInt(product.qty);
        }

        const DtotalQty = document.getElementById("totalQuantity");
        const DtotalPrice = document.getElementById("totalPrice");

        DtotalQty.innerText = totalQty;
        DtotalPrice.innerText = totalPrice;
    }

    //-------------------Fonction principal d'écoute-------------------//
    //----------------------------------------------------------------//
    function Listen(AllProducts) {
        // Fonction si changement dans notre input quantity.
        ListenQuantity(AllProducts);
        // Fonction si on veux supprimer un éléments de la liste.
        ListenDelete(AllProducts);
    }

    //-------------------Fonction d'écoute de quantité-------------------//
    //-------------------------------------------------------------------//
    function ListenQuantity(AllProducts) {

        let DomInputQty = document.querySelectorAll(".itemQuantity");

        //DomInputQty.forEach(function (input) {
        //input.addEventListener("change", function (data) {

        // console.log(data);

        // let inputQty = data.target.value;

        //  console.log(inputQty);

        // console.log(product.qty)
        // console.log(product.id)
        // console.log(product.color)
        // console.log(product.qty); 


        // récuperer article en cours de modif dans local storage + update localstorage article qty

        for (let i = 0; i < DomInputQty.length; i++) {
            DomInputQty[i].addEventListener("change", (event) => {
                event.preventDefault();
                let newQty = DomInputQty[i].value;

                console.log(newQty);

                let findId = AllProducts[i].id;
                console.log(findId);

                let findColor = AllProducts[i].color;
                console.log(findColor);

                console.log(AllProducts);

                const updateStorage = AllProducts.find(element => element.id == findId && element.color == findColor);
                updateStorage.qty = newQty;

                localStorage.setItem(
                    AllProducts[i].name + " " + AllProducts[i].color,
                    JSON.stringify(updateStorage));
                displayPrice(AllProducts);

                //  window.location.href = "cart.html";
            })
        }

        // let LocalStorageProducts = getLocalStorageProduct();


        // update qty dans allproduct et re display

        let AllproductsUpdate = [];

        // displayPrice(AllproductsUpdate);

    }


    //-------------------Fonction ecoute produit supprmimé-------------------//
    //-----------------------------------------------------------------------//

    function ListenDelete(AllProducts) {

        let btnDelete = document.querySelectorAll(".deleteItem");

        for (let btn of Array.from(btnDelete)) {
            btn.addEventListener("click", function (e) {
                let productId = e.target.getAttribute("productId");
                let productColor = e.target.getAttribute("productColor");

            })
        }
    }

})