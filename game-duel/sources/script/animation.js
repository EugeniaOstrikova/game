function animateSpell(context, func, person, spell) {
    let sprite = data.spellsList[person];
    if(sprite[spell].direction === "col"){
        if(data.animationCount < sprite[spell].endPosition){
            sprite[spell].draw(context, null, data.animationCount);
            data.animationCount+= 10;
        }
        else{
            data.isAnimate = false;
            data.animationCount = 0;
            func()
        }
    }
    else if(sprite[spell].direction === "row" && person === "character"){
        if(sprite[spell].positionInDestinationX + data.animationCount < sprite[spell].endPosition){
            sprite[spell].draw(context, sprite[spell].positionInDestinationX + data.animationCount);
            data.animationCount+= 10;
        }
        else{
            data.isAnimate = false;
                data.animationCount = 0;
                func()
        }
    }
    else if(sprite[spell].direction === "row" && person === "monster"){
        if(sprite[spell].positionInDestinationX - data.animationCount > sprite[spell].endPosition){
            sprite[spell].draw(context, sprite[spell].positionInDestinationX - data.animationCount);
            data.animationCount+= 10;
        }
        else{
            data.isAnimate = false;
            data.animationCount = 0;
            func()
        }
    }
}
