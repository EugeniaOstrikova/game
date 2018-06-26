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
    constructor(posSx, posSy, size, posDX, posDY, url, dir, end) {
        this.positionInSourceX = posSx;
        this.positionInSourceY = posSy;
        this.positionInDestinationX = posDX;
        this.positionInDestinationY = posDY;
        this.size = size;
        this.url = url;
        this.direction = dir;
        this.endPosition = end;
    }
    draw(ctx, posX, posY){
        ctx.drawImage(resources.get(this.url),
            this.positionInSourceX,
            this.positionInSourceY,
            this.size[0], this.size[1],
            posX || this.positionInDestinationX,
            posY || this.positionInDestinationY,
            this.size[0], this.size[1])
    }
}
