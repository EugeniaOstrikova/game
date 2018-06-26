resources.load(data.imageList);

const character = {
   legs2: {
        pos: [0, 785],
        width: 66,
        type: 'leg2',
        countOfChoose: 0,
        sprite: new CharacterSprite(0, 785, [66, 87], 'leg2', 227/2, 370/2, "sources/images/heroes-sprite.png"),
       dataSprite: [0, 785, [66, 87], 'leg2', 227/2, 370/2, "sources/images/heroes-sprite.png"]
}, hands2: {
        pos: [0, 686],
        width: 71,
        type: 'hand3',
        countOfChoose: 0,
        sprite: new CharacterSprite(0, 686, [71, 99], 'hand2', 257/2, 211/2, "sources/images/heroes-sprite.png"),
        dataSprite: [0, 686, [71, 99], 'hand2', 257/2, 211/2, "sources/images/heroes-sprite.png"]
}, body: {
        pos: [0, 498],
        width: 302,
        type: 'body',
        countOfChoose: 0,
        sprite: new CharacterSprite(0, 498, [302, 188], 'body', 0/2, 208/2, "sources/images/heroes-sprite.png"),
        dataSprite: [0, 498, [302, 188], 'body', 0, 208/2, "sources/images/heroes-sprite.png"]
}, legs1: {
        pos: [0, 365],
        width: 90,
        type: 'leg1',
        countOfChoose: 0,
        sprite: new CharacterSprite(0, 365, [90, 133], 'leg1', 130/2, 348/2, "sources/images/heroes-sprite.png"),
        dataSprite: [0, 365, [90, 133], 'leg1', 130/2, 348/2, "sources/images/heroes-sprite.png"]
}, hands1: {
        pos: [0, 224],
        width: 112,
        type: 'hand1',
        countOfChoose: 0,
        sprite: new CharacterSprite(0, 224, [112, 141], 'hand1', 60/2, 212/2, "sources/images/heroes-sprite.png"),
        dataSprite: [0, 224, [112, 141], 'hand1', 60/2, 212/2, "sources/images/heroes-sprite.png"]
}, head: {
        pos: [0, 0],
        width: 227,
        type: 'head',
        countOfChoose: 0,
        sprite: new CharacterSprite(0, 0, [227, 224], 'head', 105/2, 0,"sources/images/heroes-sprite.png"),
        dataSprite: [0, 0, [227, 224], 'head', 105/2, 0, "sources/images/heroes-sprite.png"]
}};


function choosePartOfCharacter() {
    let characterData = document.querySelector("#create-character-page_character-data");
    let characterDataList = Array.from(characterData.children).map(item => item.children[1]);
    characterDataList.forEach(item => item.addEventListener("click", changePartOfCharacter))
}

function changePartOfCharacter(e) {
    if(e.target.localName == "li"){
        Array.from(e.currentTarget.children).forEach(item => item.classList.remove("character-data_item_selected"));
        e.target.classList.add("character-data_item_selected");
        let typeOfPart = (Array.from(e.target.classList).filter(a => a.search(/list/) > 0))[0].substring(20);
        let arrTypeOfPart = typeOfPart.split("-");
        if(character[arrTypeOfPart[0]]){
            character[arrTypeOfPart[0]].countOfChoose = arrTypeOfPart[1];
            character[arrTypeOfPart[0]].sprite.positionInSourceX = character[arrTypeOfPart[0]].countOfChoose * character[arrTypeOfPart[0]].width;
            character[arrTypeOfPart[0]].dataSprite[0] = character[arrTypeOfPart[0]].countOfChoose * character[arrTypeOfPart[0]].width
        }
        else{
            character[arrTypeOfPart[0] + 1].countOfChoose = arrTypeOfPart[1];
            character[arrTypeOfPart[0] + 1].dataSprite[0] = character[arrTypeOfPart[0] + 1].countOfChoose * character[arrTypeOfPart[0] + 1].width;
            character[arrTypeOfPart[0] + 1].sprite.positionInSourceX = character[arrTypeOfPart[0] + 1].countOfChoose * character[arrTypeOfPart[0] + 1].width;
            character[arrTypeOfPart[0] + 2].countOfChoose = arrTypeOfPart[1];
            character[arrTypeOfPart[0] + 2].dataSprite[0] = character[arrTypeOfPart[0] + 2].countOfChoose * character[arrTypeOfPart[0] + 2].width;
            character[arrTypeOfPart[0] + 2].sprite.positionInSourceX = character[arrTypeOfPart[0] + 2].countOfChoose * character[arrTypeOfPart[0] + 2].width;

        }
        render()
    }
}

function render() {
    data.ctx.clearRect(0, 0, 300, 400);
    for(let part in character){
        character[part].sprite.draw(data.ctx)
    }
}

function init() {
    data.ctx = data.canvas.getContext("2d");
    data.canvas.width = 200;
    data.canvas.height = 300;
    render();
    choosePartOfCharacter();
}

resources.onReady(init);

const createCharacterButton = document.querySelector("#create-character-button");

function saveCharacter(e) {
    e.preventDefault();
    let nameOfCharacter = document.querySelector("#name-of-character");

    let dataSave = {};
    dataSave.name = nameOfCharacter.value;
    let arr = [];
    for(let key in character){
        arr.push(character[key].dataSprite)
    }
    data.character = arr;
    dataSave.character = arr;
    localStorage.setItem("person", JSON.stringify(dataSave));
    document.location.href = "fight-view.html";
}



createCharacterButton.addEventListener("click", saveCharacter);

