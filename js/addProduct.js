let user = JSON.parse(sessionStorage.user || null) ;
let loader = document.querySelector('.loader');

//checking user is logged in or not 
/*
window.onload = () => {
    if (user) {
        if(!compareToken(user.authToken, user.email)) {
            location.replace('/login');
        }
    }else{
        location.replace('/login');
    }
}*/

//price inputs 

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice= document.querySelector('#sell-price');


discountPercentage.addEventListener('input' , () => {
    if(discountPercentage.value > 100) {
        discountPercentage.value = 90;
    }else {
        let discount = actualPrice.value * discountPercentage.value / 100 ;
        sellingPrice.value = actualPrice.value - discount ; 
    }
})

sellingPrice.addEventListener('input' , () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
})
/*

// upload image handle 

let uploadImages = document.querySelector('.fileupload');*/
let imagesPaths = [] ; // will store all uploaded images paths ;
/*

uploadImages.forEach((fileupload, index ) =>  {
    fileupload.addEventListener('change' , () => {
        const file = fileupload.files[0] ; 
        let imageUrl ; 

        if (file.type.includes('image')) {
            //means user uploaded an image 

            fetch ('/s3url').then(res => res.json())
            .then(url => {
                fetch(url,{
                    method:'PUT',
                    headers:new Headers({'content-type' : 'multipart/form-data'}),
                    body: file
                }) .then(res => {
                    imageUrl = url.split("?")[0];
                    imagesPaths[index] = imageUrl;
                    let label = document.querySelector(`label[for=${fileupload.id}]`);
                    label.style.backgroundImage = `url(${imageUrl})`;
                    let productImage = document.querySelector('.poduct-image');
                    productImage.style.backgroundImage = `url(${imageUrl})`;
                })
            })
        } else {
            showAlert('upload Image only');
        }
    })
}) */
//form submission

const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

let versions = [] // will store all the versinos 


const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

//buttons 
const addProductBtn = document.querySelector('#add-btn') ; 
const saveDraft = document.querySelector('#save-btn');

//store version function
const storeversions = () => {
    versions = [] ;
    let sizeCheckBox = document.querySelectorAll('.version-checkbox') ;
    sizeCheckBox.forEach(item => {
        if(item.checked) {
            versions.push(item.value);
        }
    })
}

const validateForm = () => {
    if (!productName.value.length) {
        return showAlert('enter Product name');
    } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
        return showAlert('short description must be between 10 to 100 letters long');
    } else if (!des.value.length) {
        return showAlert('enter detail description about the product');
    } //else if (!imagesPaths.length) { //image link array
      //  return showAlert('upload atleast one product image');} 
      else if (!versions.length) { //version array
        return showAlert('select at least one version');
    } else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length) {
        return showAlert('you must add pricings');
    } else if (stock.value < 1000 ) {
        return showAlert('you should have at least 1000 items in stock');
    } else if (!tags.value.length) {
        return showAlert('enter few tags to help ranking your product in search');
    }else if (!tac.checked) {
        return showAlert('you must agree to our terms and conditions');
    }
    return true ; 
}

const productData = () => {
    let tagArr = tags.value.split(',');
    tagArr.forEach((item,i) => tagArr[i] = tagArr[i].trim());
    return data = {
        name : productName.value , 
        shortDes : shortLine.value,
        des : des.value,
        images : imagesPaths,
        versions : versions , 
        actualPrice : actualPrice.value,
        discount: discountPercentage.value,
        sellPrice : sellingPrice.value,
        stock : stock.value,
        tags : tagArr,
        tac  : tac.checked,
        email : user.email
    }
}

addProductBtn.addEventListener('click',() => {
    storeversions();
   // valide form 
    if (validateForm()) {  //validateForm return true or false while doing validation
        loader.style.display = 'block' ;    
        let data = productData() ; 
        if(productId) {
            data.id = productId;
        }
        sendData('/add-product' , data ) ; 

    }
})

//save draft btn 

saveDraft.addEventListener('click' ,() => {
    // store versions
    storeversions();
    //check for product name
    if (!productName.value.length){
        showAlert('enter product name');
    }else{ //don't validate the data
        let data = productData();
        data.draft = true;
        if(productId) {
            data.id = productId;
        }
        sendData('/add-product' , data ) ; 

    }
})

//existing product detail handle 

const setFormsData=(data) => {
    productName.value=data.name;
    shortLine.Value=data.shortDes;
    des.value=data.des;
    actualPrice.value=data.actualPrice;
    discountPercentage.value=data.discount;
    sellingPrice.value=data.sellPrice;
    stock.value=data.stock;
    tags.value=data.tags;
/*
    // set  up images 
    imagePaths = data.images;
    imagesPaths.forEach((url,i) => {
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`);
        label.style.backgroundImage = `url(${url})`;
        let productImage = document.querySelector('.poduct-image');
        productImage.style.backgroundImage = `url(${url})`;
    })
*/

    //setup versions 
    versions = data.versions;

    let versionCheckbox = document.querySelectorAll('.version-checkbox');
    versionCheckbox.forEach(item => {
        if(versions.includes(item.value)){
            item.setAttribute('checked' , '');
        }
    })
}


const fetchProductData = () => {
    fetch('/get-products', {
        method : 'post' , 
        headers : new Headers({'Content-Type' : 'application/json'}),
        body : JSON.stringify({email:user.email, id:productId})
    })
    .then((res) => res.json())
    .then(data=> {
        setFormsData(data);
    })
    .catch(err => {
        location.replace('/seller');
    })

}


let productId = null ; 
console.log(location.pathname);

if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
        fetchProductData() ; 
}

