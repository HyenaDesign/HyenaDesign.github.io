window.onload = function () {
    var moneyElement = document.getElementById('money');
    var clickCount = document.getElementById('clicks');
    var jeff = document.getElementById('jeffImage');
    var defaultJeffSrc = jeff.src;

    // Function to save game state to local storage
    function saveGameState() {
        localStorage.setItem('clickerClicks', clicks);
        localStorage.setItem('clickerWorth', worth);
        localStorage.setItem('clickerCurrentWidth', currentWidth);
    }

    // Function to load game state from local storage
    function loadGameState() {
        clicks = parseInt(localStorage.getItem('clickerClicks')) || 0;
        worth = parseFloat(localStorage.getItem('clickerWorth')) || 196000000000;
        currentWidth = parseFloat(localStorage.getItem('clickerCurrentWidth')) || jeff.offsetWidth;
    }

    // Function to update the UI with the current game state
    function updateUI() {
        jeff.style.width = currentWidth + 'px';
        moneyElement.innerHTML = worth.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " USD";
        clickCount.innerHTML = clicks + " clicks";
    }

    // Function to handle clicks
    function handleClick() {
        var decrementPerPress = currentWidth / (worth / 3211111);
        currentWidth = Math.max(currentWidth - decrementPerPress, 0);
        worth = Math.max(worth - 3211111, 0);
        clicks += 1;

        jeff.src = 'images/sadJeff.png';
        jeff.classList.add('shaking');
        updateUI();

        setTimeout(function () {
            jeff.classList.remove('shaking');
            jeff.src = defaultJeffSrc;
        }, 500);

        // Mcdo Jeff
        if (clicks === 68) {
            alert("You've unlocked Mcdo Jeff!");
        }

        if (clicks >= 68) {
            jeff.src = 'images/mcdoJeff.png';
        }

        // Save the game state after each click
        saveGameState();
    }

    // Load the game state on page load
    loadGameState();
    updateUI();

    // Add click event listener
    document.addEventListener('click', handleClick);

    // Touch events
    var touchStartX = 0;
    var touchEndX = 0;
    var touchThreshold = 50;

    jeff.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
    });

    jeff.addEventListener('touchend', function (event) {
        touchEndX = event.changedTouches[0].clientX;
        if (touchEndX - touchStartX > touchThreshold) {
            handleClick();
        }
    });
};