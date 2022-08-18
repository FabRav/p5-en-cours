document.addEventListener("DOMContentLoaded", function () {



    function main() {

    }

    main();

    let michel = "";    
    let michel2 = 2;
    let michel3 = true;
    let michel4 = ["tomate", "avocat", "salade"];
    let michel5 = {};
    let michel6 = document.getElementById("items")


    for (let i = 0; i < michel4.length; i++) {

    }

    for (const product of michel4) {
        michel6.insertAdjacentHTML(
            "beforeend",
            `
            <a href="./product.html?id=42">
                <article>
                    <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                    <h3 class="productName">Kanap name1</h3>
                    <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                </article>
            </a>
            `
        )
    }

    michel4.forEach(element => {
        console.log(element);
    });

    //michel6.innerText = "bonjour"

});