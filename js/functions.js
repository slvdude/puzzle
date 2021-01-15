function setBoard() {
    boardParts = new Array(tileCount);
    for (var i = 0; i < tileCount; ++i) {
        boardParts[i] = new Array(tileCount);
        for (var j = 0; j < tileCount; ++j) {
            boardParts[i][j] = new Object;
            boardParts[i][j].x = (tileCount - 1) - i;
            boardParts[i][j].y = (tileCount - 1) - j;
        }
    }
    emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
    emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
    solved = false;
}

function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function checkSolved() {
    var flag = true;
    for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
            if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
                flag = false;
            }
        }
    }
    solved = flag;
} 

function slideTile(toLoc, fromLoc) {
    if (!solved) {
        boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
        boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
        boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
        boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
        toLoc.x = fromLoc.x;
        toLoc.y = fromLoc.y;
        checkSolved();
    }
}

function drawTiles() {
    context.clearRect ( 0 , 0 , boardSize , boardSize );
    for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
            var x = boardParts[i][j].x;
            var y = boardParts[i][j].y;
            if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
                context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
                    i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }
}

const addInLocalStorage = (img) => {
    if (localStorage.length === 0) {    
        let elements = JSON.stringify([img]);
        localStorage.setItem("images", elements)
    } else {
        let elements = localStorage.getItem("images");
        let images = JSON.parse(elements);
        console.log(images);
        if (images.length === 5) {
            console.log(1);
            images.shift();
            images.push(img);
        } else {
            console.log(2);
            images.push(img);
        }
        localStorage.setItem("images", JSON.stringify(images));
    }
}


const takeFromLocalStorage = () => {
    if (localStorage['images']) {
        imgFromLS = JSON.parse(localStorage.getItem("images"));
    }
}


function previewImage(input) {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("preview").setAttribute("src", e.target.result);
        addInLocalStorage(e.target.result);
        takeFromLocalStorage();
        // localStorage.setItem('5', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
}

const setImageFromLS = (image) => {
    // let tagImg = document.createElement('img');
    // tagImg.src = img;
    // console.log(tagImg)
    // setBoard();
    // drawTiles();
    img.src = image;
    img.width = 480;
    img.height = 480;
    context.drawImage(img, 0, 0);
    setBoard();
    drawTiles();
    console.log(img.width, img.height);
}

function setImage() {
    console.log('worked');     
    img = document.getElementById("preview");
    context.canvas.width = 480;
    context.canvas.height = 480;
    context.drawImage(img, 0, 0, 480, 480);
    setBoard();
    drawTiles();
    console.log(img.width, img.height);
}

const printImage = (value) => {
    switch (value) {
        case '1': 
            setImageFromLS(imgFromLS[0]);
            break;
        case '2': 
            setImageFromLS(imgFromLS[1]);
            break;
        case '3': 
            setImageFromLS(imgFromLS[2]);
            break;
        case '4': 
            setImageFromLS(imgFromLS[3]);
            break;
        case '5': 
            setImageFromLS(imgFromLS[4]);
            break;
        default: 
            break;            
    }
}

function showWin_screen(){
    win_screen.style.display = 'block';
}

function hideWin_screen(){
    win_screen.style.display = 'none';
}


  