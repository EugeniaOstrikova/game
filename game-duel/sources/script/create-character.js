resources.load(data.imageList);

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
        if(data.character[arrTypeOfPart[0]]){
            data.character[arrTypeOfPart[0]].numberOfPart = arrTypeOfPart[1];
            data.character[arrTypeOfPart[0]].sprite.positionInSourceX = data.character[arrTypeOfPart[0]].numberOfPart * data.character[arrTypeOfPart[0]].width;
            data.character[arrTypeOfPart[0]].dataSprite[0] = data.character[arrTypeOfPart[0]].numberOfPart * data.character[arrTypeOfPart[0]].width
        }
        else{
            data.character[arrTypeOfPart[0] + 1].numberOfPart = arrTypeOfPart[1];
            data.character[arrTypeOfPart[0] + 1].dataSprite[0] = data.character[arrTypeOfPart[0] + 1].numberOfPart * data.character[arrTypeOfPart[0] + 1].width;
            data.character[arrTypeOfPart[0] + 1].sprite.positionInSourceX = data.character[arrTypeOfPart[0] + 1].numberOfPart * data.character[arrTypeOfPart[0] + 1].width;
            data.character[arrTypeOfPart[0] + 2].numberOfPart = arrTypeOfPart[1];
            data.character[arrTypeOfPart[0] + 2].dataSprite[0] = data.character[arrTypeOfPart[0] + 2].numberOfPart * data.character[arrTypeOfPart[0] + 2].width;
            data.character[arrTypeOfPart[0] + 2].sprite.positionInSourceX = data.character[arrTypeOfPart[0] + 2].numberOfPart * data.character[arrTypeOfPart[0] + 2].width;

        }
        render()
    }
}

function render() {
    data.ctxCreateCharacter.clearRect(0, 0, 300, 400);
    for(let part in data.character){
        data.character[part].sprite.draw(data.ctxCreateCharacter)
    }
}

function init() {
    data.ctxCreateCharacter = data.canvasCreateCharacter.getContext("2d");
    data.canvasCreateCharacter.width = 200;
    data.canvasCreateCharacter.height = 300;
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
    for(let key in data.character){
        arr.push(data.character[key].dataSprite)
    }
    dataSave.character = arr;
    localStorage.setItem("person", JSON.stringify(dataSave));
    document.location.href = "fight-view.html";
}



createCharacterButton.addEventListener("click", saveCharacter);

