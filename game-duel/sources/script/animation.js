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

function fireBall(ctx, func) {
    data.fireBall.draw(ctx, data.fireBall.positionInDestinationX + data.fireBallCount, null, data.fireBallPos[0], data.fireBallPos[1]);
    if(data.fireBallPos[0] < 512*8){
        if(data.fireBallPos[1] < 512){
            if(data.fireBallCadr < 3){
                data.fireBallCadr +=1
            }
            else{
                data.fireBallCadr =0;
                data.fireBallPos[0] += 512;
            }
            data.fireBallCount += data.fireBallDistance;
        }
        else {
            data.fireBallPos[0] += 512;

        }
    }
    else{
        if(data.fireBallPos[1] < 512*8){
            data.fireBallPos[0] = 0;
            data.fireBallPos[1] += 512;
        }
        else {
            data.isAnimate = false;
            data.fireBallCount = 0;
            func()
        }
    }
}

function lighting(ctx, func) {

    if(data.lightningCadr < 5){
        if(data.lightningCount < 512){
            data.lightning.draw(ctx, null, null, data.lightningCount);
            data.lightningCount += 140;
        }
        else{
            data.lightning.draw(ctx, null, null, data.lightningCount);
            data.lightningCount = 0;
            data.lightningCadr ++;
        }
    }
    else{
        data.isAnimate = false;
        data.lightningCount = 0;
        data.lightningCadr = 0;
        func()
    }

}

function shuriken(ctx, func) {
    if(data.shurikenCadr < 11){
        if(data.shurikenPos < 1530){
            data.shuriken.draw(ctx, data.shuriken.positionInDestinationX + data.shurikenCount, null, data.shurikenPos);
            data.shurikenPos += 255;
            data.shurikenCount += data.shurikenDistance

        }
        else{
            data.shuriken.draw(ctx, data.shurikenCount, null, data.shurikenPos);
            data.shurikenPos = 0;
            data.shurikenCadr ++;
        }
    }
    else{
        data.isAnimate = false;
        data.shurikenPos = 0;
        data.shurikenCadr = 0;
        data.shurikenCount = 0;
        func()
    }
}

function energyRain(ctx, func) {
    if(data.energyRainCadr < 4){
        if(data.energyRainPos[0]<912){
            data.energyRain.draw(ctx, null, null, data.energyRainPos[0]);
            data.energyRainPos[0] += 114;
        }
        else{
            if(data.energyRainPos[1]<262){
                data.energyRain.draw(ctx, null, null, data.energyRainPos[0]);
                data.energyRainPos[0] =0 ;
                data.energyRainPos[1] +=262 ;
            }
            else{
                data.energyRain.draw(ctx, null, null, data.energyRainPos[0]);
                data.energyRainPos[0] =0 ;
                data.energyRainPos[1] =0 ;
                data.energyRainCadr ++
            }
        }

    }
    else{
        data.isAnimate = false;
        data.energyRainPos[0] =0 ;
        data.energyRainPos[1] =0 ;
        data.energyRainCadr = 0;
        func()
    }

}
