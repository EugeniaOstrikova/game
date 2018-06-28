function createTaskView() {
    let taskView = document.querySelector("#task-view");
    taskView.innerHTML = "";
    taskView.classList.remove("hidden");
    data.taskList[data.spellNumber](taskView)
}

function createButton(ctx, content, type) {
    let button = document.createElement("button");
    button.textContent = content || "Cast Spell";
    button.value = content || "Cast Spell";
    if(type === "answer"){
        button.classList.add("button-task-answer");
        button.addEventListener("click", castSpellButtonAnswer);
    }
    else if(type === "submit"){
        button.classList.add("button-task-submit");
        button.addEventListener("click", castSpellButtonSubmit);
    }
    ctx.appendChild(button);
}

function castSpellButtonAnswer(e) {
    if(e.target.value == data.answer){
        let taskView = document.querySelector("#task-view");
        let massage = document.createElement("div");
        massage.classList.add("massage-true");
        massage.innerText = "Correctly!";
        taskView.appendChild(massage);
        setTimeout(function () {
            taskView.classList.add("hidden");
            data.isAnimate = true;
        }, 1000)
    }
    else {
        let taskView = document.querySelector("#task-view");
        let massage = document.createElement("div");
        massage.classList.add("massage-false");
        massage.innerText = "Not true. Correct answer: " + data.answer;
        taskView.appendChild(massage);
        setTimeout(function () {
            taskView.classList.add("hidden");
            data.nowStep = "monster";
            data.isMassage = true;
            data.massage = "Opponent's move";
            setTimeout(startStep, 1000);
        }, 2000)
    }
}

function castSpellButtonSubmit() {
    let personAnswer = document.querySelector("#answer");
    if(data.answer == personAnswer.value){
        let taskView = document.querySelector("#task-view");
        let massage = document.createElement("div");
        massage.classList.add("massage-true");
        massage.innerText = "Correctly!";
        taskView.appendChild(massage);
        setTimeout(function () {
            taskView.classList.add("hidden");
            data.isAnimate = true;
        }, 1000)
    }
    else {
        let taskView = document.querySelector("#task-view");
        let massage = document.createElement("div");
        massage.classList.add("massage-false");
        massage.innerText = "Not true. Correct answer: " + data.answer;
        taskView.appendChild(massage);
        setTimeout(function () {
            taskView.classList.add("hidden");
            data.nowStep = "monster";
            data.isMassage = true;
            data.massage = "Opponent's move";
            setTimeout(startStep, 1000);
        }, 2000)

    }

}

function createTask1(ctx) {
    let taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-block");

    let taskNumber = document.createElement("div");
    taskNumber.classList.add("text-task");
    let mathSign = Math.floor(Math.random() * 4);
    let randomSecondNumber, randomFirstNumber;

    if(mathSign === 0){
        randomFirstNumber = Math.ceil(Math.random() * 30);
        randomSecondNumber = Math.ceil(Math.random() * 30);
        data.answer = randomFirstNumber + randomSecondNumber;
    }
    else if(mathSign === 1){
        randomFirstNumber = Math.ceil(Math.random() * 30);
        randomSecondNumber = Math.ceil(Math.random() * 30);
        while(randomSecondNumber >= randomFirstNumber){
            randomSecondNumber = Math.floor(Math.random() * 20);
        }
        data.answer = randomFirstNumber - randomSecondNumber;
    }
    if(mathSign === 2){
        randomFirstNumber = Math.ceil(Math.random() * 10);
        randomSecondNumber = Math.ceil(Math.random() * 10);
        data.answer = randomFirstNumber * randomSecondNumber;
    }
    else if(mathSign === 3){
        randomSecondNumber = Math.ceil(Math.random() * 10);
        let count = Math.ceil(Math.random() * 10);
        randomFirstNumber = randomSecondNumber * count;
        data.answer = randomFirstNumber / randomSecondNumber;
    }
    taskNumber.innerText = randomFirstNumber + " " +  data.mathSigns[mathSign] + " " + randomSecondNumber + " = ";
    taskWrapper.appendChild(taskNumber);

    let input = document.createElement("input");
    input.classList.add("input-task");
    input.type = "text";
    input.id = "answer";
    taskWrapper.appendChild(input);

    ctx.appendChild(taskWrapper);
    createButton(ctx, null, "submit")
}

function createTask2(ctx) {
    let answerWrapper = document.createElement("div");
    answerWrapper.classList.add("task-block");

    let taskWorld = document.createElement("div");
    taskWorld.classList.add("text-task");
    let world = Math.floor(Math.random() * 5);
    taskWorld.innerText = data.worldsList[world].world;
    data.answer = data.worldsList[world].translate[data.worldsList[world].trueTranslate];
    for(let i=0; i<4; i++){
        createButton(answerWrapper, data.worldsList[world].translate[i], "answer");
    }

    ctx.appendChild(taskWorld);
    ctx.appendChild(answerWrapper);
}

function createTask3(ctx){
    let conditionWrapper = document.createElement("div");
    conditionWrapper.classList.add("task-block");

    let square = document.createElement("div");
    square.classList.add("square-task-3");
    let side = document.createElement("div");
    side.classList.add("side-task-3");
    let sideValue = Math.ceil(Math.random()* 13);
    side.innerText = sideValue;
    data.answer = sideValue * sideValue;

    let taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-block");

    let taskText = document.createElement("div");
    taskText.innerText = "Find the area of this square";
    taskText.classList.add("text-task");
    let input = document.createElement("input");
    input.classList.add("input-task");
    input.type = "text";
    input.id = "answer";

    taskWrapper.appendChild(taskText);
    taskWrapper.appendChild(input);
    conditionWrapper.appendChild(square);
    conditionWrapper.appendChild(side);
    ctx.appendChild(conditionWrapper);
    ctx.appendChild(taskWrapper);
    createButton(ctx, null, "submit");
}

function createTask4(ctx) {
    let conditionWrapper = document.createElement("div");
    conditionWrapper.classList.add("task-block");
    let world = data.worldsList[Math.floor(Math.random() * 5)].world;
    data.answer = world;
    let letterList = world.split("");

    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    letterList.sort(compareRandom);
    for(let i=0; i<letterList.length; i++){
        let letter = document.createElement("div");
        letter.innerText = letterList[i];
        letter.classList.add("letter-task-4");
        conditionWrapper.appendChild(letter);
    }

    let taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-block");

    let taskText = document.createElement("div");
    taskText.innerText = "Restore order";
    taskText.classList.add("text-task");
    let input = document.createElement("input");
    input.classList.add("input-task");
    input.type = "text";
    input.id = "answer";
    taskWrapper.appendChild(taskText);
    taskWrapper.appendChild(input);

    ctx.appendChild(conditionWrapper);
    ctx.appendChild(taskWrapper);
    createButton(ctx, null, "submit");
}
