function startStep() {
    data.isMassage = false;
    if(data.nowStep === "character"){
        let castSpellList = document.querySelector("#cast-spell-view");
        castSpellList.classList.remove("hidden");
        castSpellList.addEventListener("click", selectSpellAnimation)
    }
    else {
        data.spellNumber = Math.floor(Math.random() * 2);
        data.isAnimate = true;
    }
}

function selectSpellAnimation(e) {
    if(e.target.classList.contains("spell")){
        data.spellNumber = e.target.id.substring(6);
        let castSpellList = document.querySelector("#cast-spell-view");
        castSpellList.classList.add("hidden");
        createTaskView();
    }
}

function castSpell() {
    if(data.nowStep === "monster"){
        data.characterHealth = castSpellMath(data.characterHealth, "character");
    }
    else if(data.nowStep === "character"){
        data.monsterHealth = castSpellMath(data.monsterHealth, "monster");
    }
}

function castSpellMath(personHealth, person) {
    personHealth = personHealth - mathDamage();
    data.lifeLine[person].life = personHealth / data.maxHealth;
    if(personHealth <= 0){
        personHealth = 0;
        data.lifeLine[person].life = 0;
        data.isGamePlay = false;

        if(data.nowStep === "character"){
            data.youWin = true
        }
        else {
            data.youWin = false
        }
    }
    else{
        if(data.nowStep === "monster"){
            data.nowStep = "character";
            data.isMassage = true;
            data.massage = "Your move";
            setTimeout(startStep, 2000);
        }
        else if(data.nowStep === "character"){
            data.nowStep = "monster";
            data.isMassage = true;
            data.massage = "Opponent's move";
            setTimeout(startStep, 2000);
        }
    }
    return personHealth;
}

function mathDamage() {
    let damage = Math.floor(Math.random() * 350);
    if(damage< 250){
        return mathDamage()
    }else {
        return damage
    }
}

setTimeout(startStep, 2000);
