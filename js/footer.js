const creatfooter =  () => {
        let footer = document.querySelector('footer');

footer.innerHTML = `
<div class="footer-content">
            <img src="../images/Try1.png" class="logo" alt="">
            <div class="footer-ul-container">
                <ul class="category">
                    <li class="category-title">Genres</li>
                    <li><a href="#" class="footer-link">hip-hop</a></li>
                    <li><a href="#" class="footer-link">pop</a></li>
                    <li><a href="#" class="footer-link">alternative</a></li>
                    <li><a href="#" class="footer-link">rock</a></li>
                    <li><a href="#" class="footer-link">country</a></li> 
                </ul>

                <ul class="category">
                    <li class="category-title">Best Selling</li>
                    <li><a href="#" class="footer-link">my beautiful dark fantasy</a></li>
                    <li><a href="#" class="footer-link">The dark side of the moon</a></li>
                    <li><a href="#" class="footer-link">lemonade</a></li>
                    <li><a href="#" class="footer-link">chemtrails of the country club</a></li>
                    <li><a href="#" class="footer-link">25</a></li> 
                </ul>

            </div>
        </div>
            <p class="footer-title">about company</p>
            <p class="info">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita harum dolor voluptatum veniam accusamus dolores cupiditate cumque quas officiis exercitationem iste illum itaque earum facere, laborum voluptates rerum commodi. Autem!</p>
            <p class="info"> support emails - help@VMP.com, 
                customersupport@VMP.com
            </p>
            <p class="info"> telephone - 27110710,188 00 00 002</p>
            <div class="footer-social-container">
                <div>
                    <a href="#" class="social-link">terms & services</a>
                    <a href="#" class="social-link">privacy page</a>
                </div>
                <div>
                    <a href="#" class="social-link">instagram</a>
                    <a href="#" class="social-link">facebook</a>
                    <a href="#" class="social-link">twitter</a>

                </div>
            </div>
            <p class="footer-credit">The Best Records Online Store</p>

`
}
creatfooter();