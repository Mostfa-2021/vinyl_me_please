//import { TokenFileWebIdentityCredentials } from "aws-sdk";

const productImages = document.querySelectorAll(".album-images img") ;
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0 ;

productImages.forEach((item,i) => {
    item.addEventListener('click',() => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`
        activeImageSlide= i;

    })
}) 

//toggle version buttons 
const versionBtns = document.querySelectorAll('.radio-version-btn');
let checkedbtn = 0; 

//let version;

versionBtns.forEach((item , i ) => {
    item.addEventListener('click', () => {
        versionBtns[checkedbtn].classList.remove('check');
        item.classList.add('check');
        checkedbtn=i;
        version=  item.innerHTML;

    })

})

const setData =(data) => {
    let title = document.querySelector('title') ;     
    //setup the images 
    productImages.forEach((img,i) => {
        if (!data.images[0]) {
            img.src = data.images[i] ; 
        }else {
            img.style.display ='none'
        }
    } )
    productImages[0].click();

    // setup version buttons
    versionBtns.forEach(item => {
        if(data.versions.includes(item.innerHTML)){
            item.style.display='none';
        }
    })

    // setting up texts 
    const name= document.querySelector('.album-name');
    const shortDes = document.querySelector('.album-short-des');
    const des= document.querySelector('.des');

    title.innerHTML +=  name.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    des.innerHTML = `{ STD : Standard , DLX : Delexe , LIV : Live , COV : Cover , DEM : Demo } <br> <br> ${data.des}` ;

    //princing 
    const sellPrice = document.querySelector('.album-price');
    const actualPrice = document.querySelector('.album-actual-price');
    const discount = document.querySelector('.album-discount');

    sellPrice.innerHTML = `$${data.sellPrice}`;
    actualPrice.innerHTML = `$${data.actualPrice}`;
    discount.innerHTML = `{${data.discount} % off }`;

   //wishlist and cart btn

    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click' , () => {
        wishlistBtn.innerHTML  = add_product_to_cart_or_wishlist('wishlist',data);
    })

    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click' , () => {
        cartBtn.innerHTML  = add_product_to_cart_or_wishlist('cart',data);
    })

}


//fetch data
const fetchProductData = () => {
    fetch('/get-products', {
        method : 'post',
        headers : new Headers ({"Content-Type" : "application/json"}),
        body: JSON.stringify({id: productId}) 
    })
    .then(res => res.json())
    .then(data => {
        setData(data);
        getProducts(data.tags[1]).then(data => createProductSlider(data,'.container-for-card-slider' , 'Similar Albums'))
    })
    .catch(err => {
        location.replace('/404');
    })

}
let productId = null ; 
if(location.pathname != '/products') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}       
