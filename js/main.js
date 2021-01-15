var canvas = document.getElementById("puzzle");
var context = canvas.getContext("2d");

var selectImg = document.getElementById('select');

var img = new Image();
img.src = 'https://mcdn.wallpapersafari.com/medium/77/72/wDx4Au.jpg';
img.addEventListener('load', drawTiles, false);

var boardSize = document.getElementById('puzzle').width;
var tileCount = 3;

// высчитываем размеры плиток = размеры окна канвас / количетсво этих плиток
var tileSize = boardSize / tileCount;

var clickLoc = {
  x: 0,
  y: 0
}

var emptyLoc = {
  x: 0,
  y: 0
}

var solved = false; // решено или нет

var boardParts = new Object;

var imgFromLS = null;

takeFromLocalStorage();

setBoard();

document.getElementById('puzzle').onmousemove = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};

document.getElementById('puzzle').onclick = function() {
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
      setTimeout(showWin_screen(), 500);
  }
};

document.addEventListener("DOMContentLoaded", () => {
    // const recentImageDataUrl = localStorage.getItem("5");

    let elements = localStorage.getItem("images");
    let recentImageDataUrl = null;
    if (elements) {
      let images = JSON.parse(elements);
      recentImageDataUrl = images[images.length-1];
    }

    if(recentImageDataUrl){
        document.querySelector("#preview").setAttribute("src", recentImageDataUrl);
    }

});




selectImg.addEventListener('click', (e) => {
  printImage(e.target.value);
})

var win_screen = document.getElementById("winscreen");


