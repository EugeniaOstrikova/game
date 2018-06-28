const data = {
    canvasCreateCharacter: document.querySelector("#create-character_view-character"),
    canvasFight: document.querySelector("#fight-view"),

    isGamePlay: true,
    isAnimate: false,
    arr: [0, 0.5, 1, 1.5, 2, 2.5, 2.5, 2, 1.5, 1, 0.5, 0],
    pos: 0,
    characterHealth: 1000,
    monsterHealth: 1000,
    nowStep: "character",

    tasks:{},
    animationCount: 0,
    spellNumber: 0,
    spellsNameList: ["lighting", "energyRain", "fireBall", "throwingStar"],
    answer: 0,

    monsterName: [["Hungry", "Evil", "Harmful", "Sad", "Alone"],["Dragon", "Monster", "Bird"]],

    mathSigns: ["+", "-", "*", "/"],
    worldsList: [
        {world: "yellow",
            translate: ["оранжевый", "желтый", "синий", "розовый"],
            trueTranslate: 1},
        {world: "grey",
            translate: ["белый", "розовый", "серый", "оранжевый"],
            trueTranslate: 2},
        {world: "blue",
            translate: ["синий", "оранжевый", "красный", "серый"],
            trueTranslate: 0},
        {world: "white",
            translate: ["розовый", "синий", "зеленый", "белый"],
            trueTranslate: 3},
        {world: "orange",
            translate: ["оранжевый", "серый", "красный", "зеленый"],
            trueTranslate: 0}],

    spellsList: {
        fireBall: {
            posSourceXInAnim: 512,
            posSourceYInAnim: 0,
            maxPosSourceXInAnim: 512*8,
            maxPosSourceYInAnim: 512*8,
            countRepeatFrame: 0,
            maxCountRepeatFrame: 3,
            countRepeatCycle: 0,
            maxCountRepeatCycle: 1,
            posDestinationXChangeCount: 0,
            numberOfFrames: 22,
            dataSprite: [512, 0, [512, 512], [512, 512], 0, 0, "sources/images/spell/fire-ball.png", "row", 0]
        },
        lighting: {
            posSourceXInAnim: 0,
            posSourceYInAnim: null,
            maxPosSourceXInAnim: 510,
            maxPosSourceYInAnim: null,
            countRepeatFrame: null,
            maxCountRepeatFrame: null,
            countRepeatCycle: 0,
            maxCountRepeatCycle: 5,
            posDestinationXChangeCount: null,
            dataSprite: [0, 0, [34, 512], [34, 512], 0, 0, "sources/images/spell/lighting.png"]
        },
        energyRain: {
            posSourceXInAnim: 0,
            posSourceYInAnim: 0,
            maxPosSourceXInAnim: 912,
            maxPosSourceYInAnim: 262,
            countRepeatFrame: null,
            maxCountRepeatFrame: null,
            countRepeatCycle: 0,
            maxCountRepeatCycle: 4,
            posDestinationXChangeCount: null,
            dataSprite: [0, 0, [114, 262], [114*2, 262*2], 0, -50, "sources/images/spell/energy-rain.png"]
        },
        throwingStar: {
            posSourceXInAnim: 0,
            posSourceYInAnim: null,
            maxPosSourceXInAnim: 1530,
            maxPosSourceYInAnim: null,
            countRepeatFrame: null,
            maxCountRepeatFrame: null,
            countRepeatCycle: 0,
            maxCountRepeatCycle: 11,
            posDestinationXChangeCount: 0,
            numberOfFrames: 60,
            dataSprite: [0, 0, [255, 255], [255, 255], 0, 0, "sources/images/spell/throwingStar.png", "row"]
        }
    },

    monster: [
        [0, 932, [77, 81], 'leg2', 66/2, 395/2, "sources/images/monster-sprite.png"],
        [0, 787, [89, 145], 'hand2', 18/2, 226/2, "sources/images/monster-sprite.png"],
        [0, 568, [305, 219], 'body', 58/2, 205/2, "sources/images/monster-sprite.png"],
        [0, 432, [100, 136], 'leg1', 130/2, 370/2, "sources/images/monster-sprite.png"],
        [0, 242, [101, 190], 'hand1', 192/2, 227/2, "sources/images/monster-sprite.png"],
        [0, 0, [291, 242], 'head', 0, 0, "sources/images/monster-sprite.png"]
    ],
    character : {
        legs2: {
            width: 66,
            numberOfPart: 0,
            sprite: new CharacterSprite(0, 785, [66, 87], 'leg2', 227/2, 370/2, "sources/images/heroes-sprite.png"),
            dataSprite: [0, 785, [66, 87], 'leg2', 227/2, 370/2, "sources/images/heroes-sprite.png"]
        }, hands2: {
            width: 71,
            numberOfPart: 0,
            sprite: new CharacterSprite(0, 686, [71, 99], 'hand2', 257/2, 211/2, "sources/images/heroes-sprite.png"),
            dataSprite: [0, 686, [71, 99], 'hand2', 257/2, 211/2, "sources/images/heroes-sprite.png"]
        }, body: {
            width: 302,
            numberOfPart: 0,
            sprite: new CharacterSprite(0, 498, [302, 188], 'body', 0/2, 208/2, "sources/images/heroes-sprite.png"),
            dataSprite: [0, 498, [302, 188], 'body', 0, 208/2, "sources/images/heroes-sprite.png"]
        }, legs1: {
            width: 90,
            numberOfPart: 0,
            sprite: new CharacterSprite(0, 365, [90, 133], 'leg1', 130/2, 348/2, "sources/images/heroes-sprite.png"),
            dataSprite: [0, 365, [90, 133], 'leg1', 130/2, 348/2, "sources/images/heroes-sprite.png"]
        }, hands1: {
            width: 112,
            numberOfPart: 0,
            sprite: new CharacterSprite(0, 224, [112, 141], 'hand1', 60/2, 212/2, "sources/images/heroes-sprite.png"),
            dataSprite: [0, 224, [112, 141], 'hand1', 60/2, 212/2, "sources/images/heroes-sprite.png"]
        }, head: {
            width: 227,
            numberOfPart: 0,
            sprite: new CharacterSprite(0, 0, [227, 224], 'head', 105/2, 0,"sources/images/heroes-sprite.png"),
            dataSprite: [0, 0, [227, 224], 'head', 105/2, 0, "sources/images/heroes-sprite.png"]
        }},
    imageList: ["sources/images/heroes-part/body-cat.png",
        "sources/images/heroes-part/body-dog.png",
        "sources/images/heroes-part/body-panda.png",
        "sources/images/heroes-part/hand1-cat.png",
        "sources/images/heroes-part/hand1-dog.png",
        "sources/images/heroes-part/hand1-panda.png",
        "sources/images/heroes-part/head-cat.png",
        "sources/images/heroes-part/head-dog.png",
        "sources/images/heroes-part/head-panda.png",
        "sources/images/heroes-part/hand2-cat.png",
        "sources/images/heroes-part/hand2-dog.png",
        "sources/images/heroes-part/hand2-panda.png",
        "sources/images/heroes-part/leg1-cat.png",
        "sources/images/heroes-part/leg1-dog.png",
        "sources/images/heroes-part/leg1-panda.png",
        "sources/images/heroes-part/leg2-cat.png",
        "sources/images/heroes-part/leg2-dog.png",
        "sources/images/heroes-part/leg2-panda.png",
        "sources/images/heroes-sprite.png",
        "sources/images/monster-sprite.png",
        "sources/images/pentagon.png",
        "sources/images/spells-sprite.png",
        "sources/images/game-bg.png",
        "sources/images/spell/fire-ball.png",
        "sources/images/spell/lighting.png",
        "sources/images/spell/throwingStar.png",
        "sources/images/spell/energy-rain.png"]
};
