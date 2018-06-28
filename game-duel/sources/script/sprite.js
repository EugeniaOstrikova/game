class CharacterSprite{
    constructor(posSx, posSy, size, part, posDX, posDY, url){
        this.positionInSourceX = posSx;
        this.positionInSourceY = posSy;
        this.positionInDestinationX = posDX;
        this.positionInDestinationY = posDY;
        this.size = size;
        this.typeOfPart = part;
        this.url = url;
    }
    draw(ctx, pos){
        ctx.drawImage(resources.get(this.url),
            this.positionInSourceX,
            this.positionInSourceY,
            this.size[0], this.size[1],
            this.positionInDestinationX,
            pos || this.positionInDestinationY,
            (this.size[0])/2, (this.size[1])/2)
    }
}

class spellSprite{
    constructor([posSx, posSy, sizeS, sizeD, posDX, posDY, url, dir, end]) {
        this.positionInSourceX = posSx;
        this.positionInSourceY = posSy;
        this.positionInDestinationX = posDX;
        this.positionInDestinationY = posDY;
        this.sizeInSource = sizeS;
        this.sizeInDestination = sizeD;
        this.url = url;
        this.direction = dir;
        this.endPosition = end;
    }
    draw(ctx, posDX, posDY, posSX, posSY){
        ctx.drawImage(resources.get(this.url),
            posSX || this.positionInSourceX,
            posSY || this.positionInSourceY,
            this.sizeInSource[0], this.sizeInSource[1],
            posDX || this.positionInDestinationX,
            posDY || this.positionInDestinationY,
            this.sizeInDestination[0], this.sizeInDestination[1])
    }
}

function createSpellSprite() {
    for(let spell in data.spellsList){
        data.spellsList[spell].sprite = new spellSprite(data.spellsList[spell].dataSprite);
        if(data.spellsList[spell].sprite.direction === "row"){
            data.spellsList[spell].sprite.positionInDestinationX = Math.floor(data.canvasFight.width* 0.25 - data.spellsList[spell].sprite.sizeInSource[0]/2);
            data.spellsList[spell].sprite.positionInDestinationY = Math.floor(data.canvasFight.height * 0.7 - data.spellsList[spell].sprite.sizeInSource[1]/2);
            data.spellsList[spell].sprite.endPosition = Math.floor(data.canvasFight.width - data.canvasFight.width * 0.1 - data.spellsList[spell].sprite.sizeInSource[0]);
            data.spellsList[spell].distance = Math.floor((data.spellsList[spell].sprite.endPosition - data.spellsList[spell].sprite.positionInDestinationX)/data.spellsList[spell].numberOfFrames)
        }
        else{
            data.spellsList[spell].sprite.positionInDestinationX = Math.floor(data.canvasFight.width - data.canvasFight.width * 0.1 - data.spellsList[spell].sprite.sizeInSource[0]*2);
        }
    }
}
// data.fireBall = new spellSprite(512, 0, [512, 512], data.canvasFight.width* 0.25 - 250, data.canvasFight.height * 0.7 - 200, "sources/images/spell/fire-ball.png", "row", data.canvasFight.width - data.canvasFight.width * 0.1 - 600);
// data.fireBallDistance = (data.fireBall.endPosition - data.fireBall.positionInDestinationX)/22;
//
// data.lightning = new spellSprite(0, 0, [34, 512], data.canvasFight.width - data.canvasFight.width * 0.1 - 100, 0, "sources/images/spell/lighting.png");
// data.energyRain = new spellSprite(0, 0, [114, 262], data.canvasFight.width - data.canvasFight.width * 0.1 - 200, -50, "sources/images/spell/energy-rain.png");
//
// data.shuriken = new spellSprite(0, 0, [255, 255], data.canvasFight.width* 0.2, data.canvasFight.height * 0.7 - 150, "sources/images/spell/shuriken.png", "row", data.canvasFight.width - data.canvasFight.width * 0.1 - 250);
// data.shurikenDistance = (data.shuriken.endPosition - data.shuriken.positionInDestinationX)/60;
//