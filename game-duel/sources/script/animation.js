function animateSpell(spell, ctx, func, person) {
    if(spell < 2){
        if(person === "character"){
            castStaticSpell(data.spellsList[data.spellsNameList[spell]], ctx, func, null)
        }
        else {
            castStaticSpell(data.spellsList[data.spellsNameList[spell]], ctx, func, data.canvasFight.width* 0.25 - data.spellsList[data.spellsNameList[spell]].sprite.sizeInSource[0] *2)
        }
    }
    else if(spell == 2){
        castFireBall(data.spellsList[data.spellsNameList[spell]], ctx, func)
    }
    else if(spell == 3){
        castThrowingStar(data.spellsList[data.spellsNameList[spell]], ctx, func)
    }

}

function castFireBall(spell, ctx, func) {
    spell.sprite.draw(ctx, spell.sprite.positionInDestinationX + spell.posDestinationXChangeCount, null, spell.posSourceXInAnim, spell.posSourceYInAnim);
    if(spell.countRepeatCycle < spell.maxCountRepeatCycle){
        if(spell.posSourceXInAnim < spell.maxPosSourceXInAnim){
            if(spell.posSourceYInAnim < spell.sprite.sizeInSource[1]){
                if(spell.countRepeatFrame < spell.maxCountRepeatFrame){
                    spell.countRepeatFrame++
                }
                else {
                    spell.countRepeatFrame =0;
                    spell.posSourceXInAnim += spell.sprite.sizeInSource[0]
                }
                spell.posDestinationXChangeCount += spell.distance
            }
            else {
                spell.posSourceXInAnim += spell.sprite.sizeInSource[0]
            }
        }
        else{
            if(spell.posSourceYInAnim < spell.maxPosSourceYInAnim){
                spell.posSourceXInAnim = 0;
                spell.posSourceYInAnim += spell.sprite.sizeInSource[1]
            }
            else{
                data.isAnimate = false;
                spell.posDestinationXChangeCount = 0;
                func()
            }
        }
    }

    else{
        data.isAnimate = false;
        spell.posDestinationXChangeCount = 0;
        func()
    }
}

function castThrowingStar(spell, ctx, func) {
    spell.sprite.draw(ctx, spell.sprite.positionInDestinationX + spell.posDestinationXChangeCount, null, spell.posSourceXInAnim);
    if(spell.countRepeatCycle < spell.maxCountRepeatCycle){
        if(spell.posSourceXInAnim < spell.maxPosSourceXInAnim){
            spell.posSourceXInAnim += spell.sprite.sizeInSource[0];
            spell.posDestinationXChangeCount += spell.distance
        }
        else {
            spell.posSourceXInAnim = 0;
            spell.countRepeatCycle ++
        }
    }
    else{
        data.isAnimate = false;
        spell.posSourceXInAnim = 0;
        spell.countRepeatCycle =0;
        spell.posDestinationXChangeCount =0;
        func()
    }
}



function castStaticSpell(spell, ctx, func, monsterPos) {
    spell.sprite.draw(ctx, monsterPos, null, spell.posSourceXInAnim);
    if(spell.countRepeatCycle < spell.maxCountRepeatCycle){
        if(spell.posSourceXInAnim < spell.maxPosSourceXInAnim){
            spell.posSourceXInAnim += spell.sprite.sizeInSource[0];
        }
        else {
            if(spell.posSourceYInAnim < spell.maxPosSourceYInAnim){
                spell.posSourceXInAnim = 0;
                spell.posSourceYInAnim += spell.sprite.sizeInSource[1];
            }
            else{
                spell.posSourceXInAnim = 0;
                spell.posSourceYInAnim = 0;
                spell.countRepeatCycle ++
            }
        }
    }
    else{
        data.isAnimate = false;
        spell.posSourceXInAnim = 0;
        spell.posSourceYInAnim = 0;
        spell.countRepeatCycle =0;
        func()
    }
}

// function castLighting(spell, ctx, func) {
//     spell.sprite.draw(ctx, null, null, spell.posSourceXInAnim);
//     if(spell.countRepeatCycle < spell.maxCountRepeatCycle){
//         if(spell.posSourceXInAnim < spell.maxPosSourceXInAnim){
//             spell.posSourceXInAnim += spell.sprite.sizeInSource[0]
//         }
//         else {
//             spell.posSourceXInAnim = 0;
//             spell.countRepeatCycle ++
//         }
//     }
//     else{
//         data.isAnimate = false;
//         spell.posSourceXInAnim = 0;
//         spell.countRepeatCycle =0;
//         func()
//     }
// }
