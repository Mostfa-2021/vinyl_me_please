const createNAV = () => {
let nav = document.querySelector('.navbar') ;

nav.innerHTML = `
<div class="nav">
            <img src="../images/vinyl_me_please_logo_grey.png" class="brand-logo" alt="">
            <div class="nav-items">
                <div class="search"> 
                    <input type="text" class="search-box" placeholder="Search Artist,Album...">
                    <button class="search-btn">search</button>
                </div>
                <a >
                <img src="../images/user.png" id ="user-img" alt="">
                <div class="login-logout-popup hide">
                    <p class="acount-info">Log in as, name </p>
                    <button class="btn" id="user-btn">Log out</button>
                </div>
                </a>
                <a href="/cart"><img src="../images/cart.png" alt=""></a>


            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="/" class="link">Home</a></li>
            <li class="link-item"><a href="/seller" class="link">Seller Dashbord</a></li>


        </ul>  

`;
}
createNAV();

//nav popup

const userImageButton = document.querySelector('#user-img');
const userPopup=document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.acount-info');
const actionBtn = document.querySelector('.btn');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload=() =>{
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null) { //means user is logged in 
        popuptext.innerHTML=`<strong>Log In As :</strong> ${user.name}`;
        actionBtn.innerHTML=`Log Out`;
        actionBtn.addEventListener('click' , ()=> {
            sessionStorage.clear();
            location.reload();
        })
    } else {
        //user is logged out
        popuptext.innerHTML='Log In To Place Order' ;
        actionBtn.innerHTML='log in';
        actionBtn.addEventListener('click' , () => {
            location.href = '/login' ; 
        })
    }

}

//search box
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click' , () => {
    if(searchBox.value.length){
        location.href=`/Search/${searchBox.value}`
    }
})