/*import version = require("nodemon/lib/version");*/

const setupSlidingEffect = () => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nextBtn = [...document.querySelectorAll(('.next-btn'))];
    const preBtn = [...document.querySelectorAll(('.pre-btn'))] ;

productContainers.forEach((item, i) => {

    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nextBtn[i].addEventListener('click',() => {
        item.scrollLeft += containerWidth ; 
    })

    preBtn[i].addEventListener('click',() => {
        item.scrollLeft -= containerWidth ; 
    })
})
}
//fetch product cards 
const getProducts = (tag) => {
    return fetch('/get-products' , {
        method : "post",
        headers : new Headers ({"Content-Type" : "application/json"}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
        return data ; 
    })
}

//Create product slider 
const createProductSlider = (data , parent, title) => {
    let slideContainer = document.querySelector(`${parent}`);


    slideContainer.innerHTML += ` 
    <section class="product">
    <h2 class="product-category">${title}</h2>
    <button class="pre-btn"> <img src="../images/arrow.png" alt=""></button>
    <button class="next-btn"> <img src="../images/arrow.png" alt=""></button> 
    ${createProductCards(data)}
    </section>  `

    setupSlidingEffect();
}


const createProductCards = (data,parent) => {
    //here parent is for search product
    let start = '<div class="product-container">';
    let middle = '' ; // this will contain card html
    let end = '</div>';

    for (let i = 0 ; i < data.length; i++) {
        if (data[i].id != decodeURI(location.pathname.split('/').pop()))  {

            middle += `
            <div class="product-card">
                    <div class="product-image">
                        <span class="discount-tag">${data[i].discount}% off</span>
                        <img src="${data[i].images}" class="product-thumb" alt="">
                    </div>
                    <div>
                        <div class="product-info" onclick="location.href='/products/${data[i].id}'">
                            <h2 class="product-artist">${data[i].name}</h2>
                            <p class="product-genre">${data[i].shortDes}</p>
                            <span class="price">$${data[i].sellPrice}</span><span class="actual-price">$${data[i].actualPrice}</span>
                        </div>
                    </div>
                </div>
            
            `

        }}
    
    if(parent) {
            let cardContainer = document.querySelector(parent);
            cardContainer.innerHTML = start + middle + end ; 
    } 
    else{
    return start + middle + end ; 
    }
}


const add_product_to_cart_or_wishlist = (type,album) => {
    let data = JSON.parse(localStorage.getItem(type));
    if (data == null ) {
        data = [] ; 
    }
    album = {
        item : 1 , 
        name : album.name ,
        sellPrice: album.sellPrice,
        version : album.version || null,
        shortDes : album.shortDes,
        image : album.images[0]
    }

    data.push(album);
    localStorage.setItem(type, JSON.stringify(data));
    return 'added';

}