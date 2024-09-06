let onCartProducts = JSON.parse(localStorage.getItem("current-oncart"));

const emptyCart = document.querySelector("#empty-cart");

const onCartProductsContainer = document.querySelector("#oncart-products");

const onCartActions = document.querySelector("#oncart-actions");

const totalInCart = document.querySelector("#total-in-cart");

const voidCartBtn = document.querySelector("#cart-action-empty");

const buyCartBtn = document.querySelector("#cart-action-buy");

let onCartItemRemove = document.querySelectorAll(".cart-item-remove");

const buyedCart = document.querySelector("#buyed-cart");


function globalLoadCart() {

    if(onCartProducts && onCartProducts.length > 0){

        emptyCart.classList.add('disabled');
        onCartProductsContainer.classList.remove('disabled');
        onCartActions.classList.remove('disabled');
        buyedCart.classList.add('disabled');

        onCartProductsContainer.innerHTML = '';

        onCartProducts.forEach(product => {

            div = document.createElement("div");
            div.classList.add("product");

            div.innerHTML = ` 
                <img class="cart-item-img" src="${product.image}" alt="="${product.titulo}">
                <div class="cart-item-title">
                    <small>Product Name</small>
                    <h3>${product.titulo}</h3>
                </div>
                <div class="cart-item-quantity">
                    <small>Quantity</small>
                    <p>${product.quantity}</p>
                </div>
                <div class="cart-item-price">
                    <small>Unit Price</small>
                    <p>$${product.precio}</p>
                </div>
                <div class="cart-item-total">
                    <small>Total Price</small>
                    <p>$${product.precio * product.quantity}</p>
                </div>
                <button class="cart-item-remove" id="${product.id}"><i class="bi bi-trash-fill"></i></button`

            onCartProductsContainer.appendChild(div)

        });

        
    }else{
        emptyCart.classList.remove('disabled');
        onCartProductsContainer.classList.add('disabled');
        onCartActions.classList.add('disabled');
        buyedCart.classList.add('disabled');
    }

    updateItemRemoveBtn();
    updateTotalCart();
};

globalLoadCart();

function updateItemRemoveBtn() {
    removeItemBtn = document.querySelectorAll(".cart-item-remove");
    
    removeItemBtn.forEach(btn => {
        btn.addEventListener('click', onCartDelete)
        
    });
}
function onCartDelete(e){
    let idItemBtn =  e.currentTarget.id;
    const targetIndexDelet = onCartProducts.findIndex(product => product.id === idItemBtn);
    onCartProducts.splice(targetIndexDelet, 1);

    globalLoadCart();

    localStorage.setItem("current-oncart", JSON.stringify(onCartProducts))

}


voidCartBtn.addEventListener('click', voidCart)

function voidCart(){
    onCartProducts = 0;
    localStorage.setItem("current-oncart", JSON.stringify(onCartProducts));
    globalLoadCart();
    
}

function updateTotalCart() {
    const totalCalc = onCartProducts.reduce((acc, product)=> acc + (product.precio * product.quantity), 0);
    totalInCart.innerText =`$ ${totalCalc}`;
}

buyCartBtn.addEventListener('click', buyCart)
function buyCart(){
    onCartProducts.length = 0;
    localStorage.setItem("current-oncart", JSON.stringify(onCartProducts));

    emptyCart.classList.add('disabled');
    onCartProductsContainer.classList.add('disabled');
    onCartActions.classList.add('disabled');
    buyedCart.classList.remove('disabled');
    
}