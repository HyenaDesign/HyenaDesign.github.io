window.onload = function() {
    var moneyElement = document.getElementById('money');
    var clickCount = document.getElementById('clicks');
    var clicks = 0;
    var worth = 196000000000;
    var jeff = document.getElementById('jeffImage');
    var currentWidth = jeff.offsetWidth; 
    var defaultJeffSrc = jeff.src; 

    document.addEventListener('keyup', function(event) {
        //main functies
        if(event.code === 'Space') {
            
            var decrementPerPress = currentWidth / (worth / 3211111);

            currentWidth -= decrementPerPress;

            worth -= 3211111;

            clicks += 1;

            currentWidth = Math.max(currentWidth, 0);
            worth = Math.max(worth, 0);

            jeff.src = 'images/sadJeff.png';

            jeff.style.width = currentWidth + 'px'; 
            jeff.classList.add('shaking');
            moneyElement.innerHTML = worth.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " USD"; 
            clickCount.innerHTML = clicks + " clicks";

            setTimeout(function(){
                jeff.classList.remove('shaking');
                jeff.src = defaultJeffSrc; 
            }, 500);

            // Mcdo Jeff
            if(clicks === 68){
                alert("You've unlocked Mcdo Jeff!");
            };

            if(clicks >= 68){
                jeff.src = 'images/mcdoJeff.png';
            }
        }
    });
};
