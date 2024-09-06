const products = [
    // camperas
    {
        id: "campera-01",
        titulo: " Campera 01",
        image: "./assets/productos/camperas/campera-1.webp",
        categoria: {
            nombre: "Jackets & Coats",
            id: "jacket-and-coats"
        },
        precio: "1000"
    },
    {
        id: "campera-02",
        titulo: " Campera 02",
        image: "./assets/productos/camperas/campera-2.webp",
        categoria: {
            nombre: "Jackets & Coats",
            id: "jacket-and-coats"
        },
        precio: "1000"
    },
    {
        id: "campera-03",
        titulo: " Campera 03",
        image: "./assets/productos/camperas/campera-3.webp",
        categoria: {
            nombre: "Jackets & Coats",
            id: "jacket-and-coats"
        },
        precio: "1000"
    },
    {
        id: "campera-04",
        titulo: " Campera 04",
        image: "./assets/productos/camperas/campera-4.webp",
        categoria: {
            nombre: "Jackets & Coats",
            id: "jacket-and-coats"
        },
        precio: "1000"
    },

    // remeras
    {
        id: "remera-01",
        titulo: " Remera 01",
        image: "./assets/productos/remeras/remera-1.webp",
        categoria: {
            nombre: "T-Shirts",
            id: "tshirts"
        },
        precio: "500"
    },
    {
        id: "remera-02",
        titulo: " Remera 02",
        image: "./assets/productos/remeras/remera-2.webp",
        categoria: {
            nombre: "T-Shirts",
            id: "tshirts"
        },
        precio: "500"
    },
    {
        id: "remera-03",
        titulo: " Remera 03",
        image: "./assets/productos/remeras/remera-3.webp",
        categoria: {
            nombre: "T-Shirts",
            id: "tshirts"
        },
        precio: "500"
    },
    {
        id: "remera-04",
        titulo: " Remera 04",
        image: "./assets/productos/remeras/remera-4.webp",
        categoria: {
            nombre: "T-Shirt",
            id: "tshirts"
        },
        precio: "500"
    },

    //pantalones
    {
        id: "pantalon-01",
        titulo: " Pantalon 01",
        image: "./assets/productos/pantalones/pantalon-1.webp",
        categoria: {
            nombre: "Pants & Jeans",
            id: "pants-and-jeans"
        },
        precio: "850"
    },
    {
        id: "pantalon-02",
        titulo: " Pantalon 02",
        image: "./assets/productos/pantalones/pantalon-2.webp",
        categoria: {
            nombre: "Pants & Jeans",
            id: "pants-and-jeans"
        },
        precio: "850"
    },
    {
        id: "pantalon-03",
        titulo: " Pantalon 03",
        image: "./assets/productos/pantalones/pantalon-3.webp",
        categoria: {
            nombre: "Pants & Jeans",
            id: "pants-and-jeans"
        },
        precio: "850"
    },
    {
        id: "pantalon-04",
        titulo: " Pantalon 04",
        image: "./assets/productos/pantalones/pantalon-4.webp",
        categoria: {
            nombre: "Pantalones",
            id: "pants-and-jeans"
        },
        precio: "850"
    },
];


const containerProducts = document.querySelector("#products-container");
const catBtn = document.querySelectorAll(".cat-btn");
const catTitle = document.querySelector("#main-title");
const counterInd = document.querySelector("#counter");
let addCartBtn = document.querySelectorAll(".card-button");



function loadProducts(targetCateg){
    containerProducts.innerHTML = '';

    targetCateg.forEach( product => {
        let div = document.createElement('div');
        div.classList.add("card");

        div.innerHTML = `
            <a href="/${product.image}" class="card-link"> 
            <img src="${product.image}" alt="${product.titulo}" class="card-img">
            </a>
            <div class="card-body">
                <h2 class="card-title"><a href="/${product.categoria.id}/${product.id}">${product.titulo}</a></h2>
                <p class="card-price">$${product.precio}</p>
                <p class="card-description">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <button class="card-button" onclick="" id="${product.id}">Añadir al carrito</button>
            </div>
        `;
        containerProducts.appendChild(div)
    })

    updateAddCartBtn()


};

loadProducts(products);

catBtn.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        catBtn.forEach(button => {button.classList.remove("active")});
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id !=  "all-prod"){

            const catValue = products.find(product => product.categoria.id === e.currentTarget.id)
            catTitle.innerText = catValue.categoria.nombre;

            const targetBtn = products.filter(product => product.categoria.id === e.currentTarget.id)
            loadProducts(targetBtn);

        }else{

            catTitle.innerText = 'All products'
            loadProducts(products);

        }

    });
    
});

function updateAddCartBtn() {
    addCartBtn = document.querySelectorAll(".card-button");
    
    addCartBtn.forEach(btn => {
        btn.addEventListener('click', addToCart)
        
    });
}

const onCart = JSON.parse(localStorage.getItem("current-oncart"));
const onCartLS = onCart;
let onCartProducts;

if(onCartLS){
    onCartProducts =  onCartLS;
    updateCounter()

}else{
    onCartProducts = [];
}

function addToCart(e) {
    const idBtn = e.currentTarget.id;
    const addedProd = products.find(product => product.id === idBtn);
    if(onCartProducts.some(product => product.id === idBtn)){
        const index = onCartProducts.findIndex(product => product.id === idBtn);
        onCartProducts[index].quantity++;
    }else{
        addedProd.quantity = 1;
        onCartProducts.push(addedProd)
    }
    localStorage.setItem("current-oncart", JSON.stringify(onCartProducts))
    updateCounter()
}

function updateCounter(){
    let upCount = onCartProducts.reduce((acc, prod)=> acc + prod.quantity, 0);
    counterInd.innerText = upCount;
    if(upCount > 0){
        counterInd.style.backgroundColor = '#f00';
        counterInd.style.color = '#fff';

    }
}

