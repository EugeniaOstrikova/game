let requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame;

function init() {
    data.canvasFight.width = document.querySelector("body").clientWidth - 10;
    data.canvasFight.height = document.querySelector("body").clientHeight - 10;
    data.ctx = data.canvasFight.getContext("2d");
    data.ctx.fillStyle = "#4e7082";
    data.ctx.fillRect(0, 0, data.canvasFight.width, data.canvasFight.height);

    data.spellsList = {};
    data.spellsList.monster = [
        new spellSprite(86, 0, [86, 50], data.canvasFight.width - data.canvasFight.width * 0.1 - 200,data.canvasFight.height * 0.7, "sources/images/spells-sprite.png", "row", data.canvasFight.width* 0.25),
        new spellSprite(0, 50, [75, 50], data.canvasFight.width* 0.1 + 70, 0, "sources/images/spells-sprite.png", "col", data.canvasFight.height * 0.55),
        new spellSprite(0,100, [43, 38], data.canvasFight.width - data.canvasFight.width * 0.1 - 200, data.canvasFight.height * 0.7, "sources/images/spells-sprite.png", "row", data.canvasFight.width* 0.25),
        new spellSprite(0, 138, [44, 38], data.canvasFight.width* 0.1 + 70, 0, "sources/images/spells-sprite.png", "col", data.canvasFight.height * 0.55)
    ];
    data.spellsList.character = [
        new spellSprite(0,0, [86, 50], data.canvasFight.width* 0.25, data.canvasFight.height * 0.7, "sources/images/spells-sprite.png", "row", data.canvasFight.width - data.canvasFight.width * 0.1 - 200),
        new spellSprite(0, 50, [75, 50], data.canvasFight.width - data.canvasFight.width * 0.1 - 100, 0, "sources/images/spells-sprite.png", "col", data.canvasFight.height * 0.55),
        new spellSprite(0,100, [43, 38], data.canvasFight.width* 0.25, data.canvasFight.height * 0.7, "sources/images/spells-sprite.png", "row", data.canvasFight.width - data.canvasFight.width * 0.1 - 200),
        new spellSprite(0, 138, [44, 38], data.canvasFight.width - data.canvasFight.width * 0.1 - 100, 0, "sources/images/spells-sprite.png", "col", data.canvasFight.height * 0.55)
    ];

    data.taskList= [createTask1, createTask2, createTask3, createTask4];
    data.timeCharacter = Date.now();
    data.characterPart = [];
    let characterArray = JSON.parse(localStorage.getItem("person")).character;
    characterArray.forEach(item =>
    {   item[4] = item[4] + (data.canvasFight.width * 0.1);
        item[5] = item[5] + (data.canvasFight.height * 0.55);
        let part = new CharacterSprite(item[0], item[1], item[2], item[3], item[4], item[5], item[6]);
        data.characterPart.push(part)
    });
    data.monsterPart = [];
    data.monster.forEach(item =>
    {   let count = Math.floor(Math.random() * 3);
        if(item[3] === 'head'){
            data.monsterHeadName = count;
        }
        item[0] = count * item[2][0];
        item[4] = item[4] + (data.canvasFight.width - (data.canvasFight.width * 0.1) - 305/2) ;
        item[5] = item[5] + (data.canvasFight.height * 0.55);
        let part = new CharacterSprite(item[0], item[1], item[2], item[3], item[4], item[5], item[6]);
        data.monsterPart.push(part);
        part.draw(data.ctx) });
    data.monsterAdjName = data.monsterName[0][Math.floor(Math.random() * 5)];
    main();
}

function main() {

    if(data.isGamePlay){
        data.ctx.clearRect(0, 0, data.canvasFight.width, data.canvasFight.height);
        let gradient = data.ctx.createRadialGradient(data.canvasFight.width/2, data.canvasFight.height/2, data.canvasFight.width/1.5, data.canvasFight.width/2 , data.canvasFight.height /2, data.canvasFight.width/6);
        gradient.addColorStop(0, '#1F2529');
        gradient.addColorStop(1, '#4e7082');
        data.ctx.fillStyle = gradient;
        data.ctx.fillRect(0, 0, data.canvasFight.width, data.canvasFight.height);

        renderCharacter();
        renderFon();
        if(data.isAnimate){
            animateSpell(data.ctx, castSpell, data.nowStep, data.spellCount);
        }

        data.firstRender = false;
        requestAnimFrame(main)
    }
    else {
        stopGame()
    }
}

function stopGame() {
    if(!data.isGamePlay){
        data.ctx.clearRect(0, 0, data.canvasFight.width, data.canvasFight.height);
        data.ctx.fillStyle = "#4e7082";
        data.ctx.fillRect(0, 0, data.canvasFight.width, data.canvasFight.height);

        renderCharacter();
        renderFon();

        if(data.youWin){
            data.ctx.fillStyle = "rgba(242, 245, 250, 0.7)";
            data.ctx.fillRect(0, data.canvasFight.height * 0.3, data.canvasFight.width, data.canvasFight.height * 0.4);
            data.ctx.font = "54px serif";
            data.ctx.fillStyle = "#4e7082";
            data.ctx.fillText("You win!", data.canvasFight.width * 0.5 - 100, data.canvasFight.height * 0.5);
        }
        else {
            data.ctx.fillStyle = "rgba(242, 245, 250, 0.7)";
            data.ctx.fillRect(0, data.canvasFight.height * 0.3, data.canvasFight.width, data.canvasFight.height * 0.4);
            data.ctx.font = "54px serif";
            data.ctx.fillStyle = "#4e7082";
            data.ctx.fillText("You Loss!", data.canvasFight.width * 0.5 - 100, data.canvasFight.height * 0.5);
        }
        let buttonNewGame = document.querySelector("#new-game-button");
        buttonNewGame.classList.remove("hidden");
        buttonNewGame.addEventListener("click", createNewGame);
        requestAnimFrame(stopGame)
    }
}

function renderCharacter() {
    if(14*(Date.now()- data.timeCharacter)/1000 >1){
        if(data.pos < data.arr.length){
            render(data.characterPart, data.arr[data.pos]);
            render(data.monsterPart, data.arr[data.pos]);
            data.pos++;
        }
        else{
            render(data.characterPart, data.arr[data.pos]);
            render(data.monsterPart, data.arr[data.pos]);
            data.pos = 0;
        }
        data.timeCharacter = Date.now();
    }
    else {
        render(data.characterPart, data.arr[data.pos]);
        render(data.monsterPart, data.arr[data.pos]);
    }
}

function render(arr, path) {
    arr.forEach(item => item.typeOfPart !== "leg1" && item.typeOfPart !== "leg2" ? item.draw(data.ctx, item.positionInDestinationY + path) : item.draw(data.ctx))
}

function renderFon() {
    data.ctx.drawImage(resources.get("sources/images/pentagon.png"), 0, 0, 440, 419, data.canvasFight.width * 0.01, data.canvasFight.height * 0.01, 440/3, 419/3);
    data.ctx.font = "24px serif";
    data.ctx.fillStyle = "#fff";
    data.ctx.fillText(data.characterHealth + "/1000", data.canvasFight.width * 0.01  + 440/3, data.canvasFight.height * 0.01 + 70);
    let dataSave = JSON.parse(localStorage.getItem("person"));
    data.ctx.font = "24px serif";
    data.ctx.fillStyle = "#fff";
    data.ctx.fillText(dataSave.name, data.canvasFight.width * 0.01  + 440/3, data.canvasFight.height * 0.01 + 40);
    data.ctx.drawImage(resources.get("sources/images/heroes-sprite.png"), dataSave.character[5][0], 0, 227, 224, data.canvasFight.width * 0.01 + 440/6 - 227/6, data.canvasFight.height * 0.01 + 419/6 - 224/6, 227/3, 224/3);
    data.ctx.drawImage(resources.get("sources/images/pentagon.png"), 450, 0, 440, 419, data.canvasFight.width - (data.canvasFight.width * 0.01) - 440/3, data.canvasFight.height * 0.01, 440/3, 419/3);
    data.ctx.font = "24px serif";
    data.ctx.fillStyle = "#fff";
    data.ctx.fillText(data.monsterHealth + "/1000", data.canvasFight.width - data.canvasFight.width * 0.01  - 440/3 - 110, data.canvasFight.height * 0.01 + 70);
    data.ctx.font = "24px serif";
    data.ctx.fillStyle = "#fff";
    data.ctx.textAlign = "right";
    data.ctx.fillText(data.monsterAdjName + " " + data.monsterName[1][data.monsterHeadName], data.canvasFight.width - data.canvasFight.width * 0.01  - 440/3 , data.canvasFight.height * 0.01 + 40);
    data.ctx.textAlign = "left";
    data.ctx.drawImage(resources.get("sources/images/monster-sprite.png"), data.monster[5][0], 0, 291, 242, (data.canvasFight.width - (data.canvasFight.width * 0.01) - 440/3) + 440/6 - 291/6, data.canvasFight.height * 0.01 + 419/6 - 242/6, 291/3, 242/3);
}

function createNewGame() {
    data.nowStep = "character";
    data.characterHealth = 1000;
    data.monsterHealth = 1000;
    data.isGamePlay = true;
    let buttonNewGame = document.querySelector("#new-game-button");
    buttonNewGame.classList.add("hidden");
    main();
    startStep()
}

resources.load(data.imageList);
resources.onReady(init);
