import phonesData from "./phones.js";






let burg = document.querySelector(".burger");
burg.addEventListener("click", burger);
let bnav = document.querySelector(".bnav");

function burger (){
    burg.classList.toggle("active");
    bnav.classList.toggle("active");
}

console.log(phonesData);

let header = document.querySelector("header");
let them = document.getElementById("them");
let condition = false;
them.addEventListener("click", function(){
    if (condition == false){
        header.style.backgroundColor = "#2e3036";
        condition = true;
    }
    else{
        header.style.backgroundColor = "black";
        condition = false;
    }
})



// 
let bace = [];
bacec();
function bacec (){
    bace = phonesData;
}
// 
let block1 = document.querySelector(".block1"); 
 
 
let chocetags = ["global"];


function find() {
    block1.innerHTML = "";
    let count = document.querySelector(".count");
    let xcount = 0;
    
    // Удаляем строку с phone_cost, так как теперь используем minCost и maxCost
    let minCost = Number(sliderMin.value);
    let maxCost = Number(sliderMax.value);

    for (let i = 0; i < bace.length; i++) {
        let phone = bace[i];
        let phonePrice = Number(phone.price.replace(/\D/g, ""));

        let isMatch = chocetags.every(tag => phone.tags.includes(tag));
        let isCategoryMatch = (selectedCategory === "" || phone.tags.includes(selectedCategory));

        // В условии IF теперь только диапазон цен
        if (phonePrice >= minCost && phonePrice <= maxCost && isMatch && isCategoryMatch) {
            xcount += 1;
            block1.innerHTML += `
                <div class="phone_card">
                    <img src="${phone.img}" class="phone_img">
                    <div class="phone_info">
                        <h3>${phone.name}</h3>
                        <a href="${phone.link}" class="more_info_btn">Подробнее</a>
                        <span class="price">${phone.price}</span>
                        <p class="description">${phone.characteristics}</p> 
                    </div>
                </div>`;
        }
        
    }
    
    count.innerHTML = xcount === 0 ? "Ничего не найдено" : xcount;
}


function handleTagClick(buttonElement, tagName) {
    // 1. Ищем индекс нажатого тега в массиве
    let index = chocetags.indexOf(tagName);
    if (index === -1) {
        // --- ЛОГИКА АКТИВАЦИИ ФИЛЬТРА ---
        
        if (tagName === "CN") {
            // Если включили Китай — принудительно убираем Global, чтобы не было конфликта
            let gIndex = chocetags.indexOf("global");
            if (gIndex !== -1) {
                chocetags.splice(gIndex, 1);
            }
        }

        chocetags.push(tagName);
        buttonElement.classList.add("active");
    } 
    else {
        // --- ЛОГИКА ДЕАКТИВАЦИИ (Повторный клик) ---
        
        chocetags.splice(index, 1);
        buttonElement.classList.remove("active");

        // Если мы только что ВЫКЛЮЧИЛИ Китай, нужно вернуть Global обратно
        if (tagName === "CN") {
            if (!chocetags.includes("global")) {
                chocetags.push("global");
            }
        }
    }

    console.log("Активные фильтры:", chocetags);
    find(); // Запускаем поиск с обновленным массивом
}



let sliderMin = document.querySelector(".min-range");
let sliderMax = document.querySelector(".max-range");
let displayMin = document.getElementById("min-price");
let displayMax = document.getElementById("max-price");

function updateSlider() {
    // Если левый ползунок заходит за правый — стопим его
    if (parseInt(sliderMax.value) - parseInt(sliderMin.value) <= 5000) {
        sliderMin.value = parseInt(sliderMax.value) - 5000;
    }
    displayMin.textContent = sliderMin.value + " ₽";
    displayMax.textContent = sliderMax.value + " ₽";
    find(); // Твоя функция поиска
}

function updateSliderMax() {
    if (parseInt(sliderMax.value) - parseInt(sliderMin.value) <= 5000) {
        sliderMax.value = parseInt(sliderMin.value) + 5000;
    }
    displayMin.textContent = sliderMin.value + " ₽";
    displayMax.textContent = sliderMax.value + " ₽";
    find();
}

sliderMin.addEventListener("input", updateSlider);
sliderMax.addEventListener("input", updateSliderMax);


let selectFilter = document.querySelector(".bace"); 
let selectedCategory = "";
if (selectFilter) {
    selectFilter.addEventListener("change", function() {
        selectedCategory = this.value; 
        find(); 
    });
}


// 1. Находим ВСЕ кнопки с классом filter-btn
let allFilterBtns = document.querySelectorAll(".filter-btn");
let select = document.querySelector("select");
// 2. Запускаем цикл по этой коллекции кнопок
allFilterBtns.forEach(btn => {
    // Вешаем клик на каждую кнопку сразу
    btn.addEventListener("click", function() {
        // Достаем имя тега из атрибута data-tag
        let tagName = this.getAttribute("data-tag");
        
        // Вызываем твою готовую функцию handleTagClick
        handleTagClick(this, tagName);
    });
});

let allbutton =document.querySelector("#allfilt");
let condition2 = false;
allbutton.addEventListener("click", function(){
    for(let i = 0;i < allFilterBtns.length; i++){
    if (condition2 == false){
        allFilterBtns[i].style.display = "none";
        select.style.display = "none";        
    }
    else{
        allFilterBtns[i].style.display = "";
        select.style.display = "";
    }
}
    condition2 =!condition2;
    if (condition2){
       allbutton.classList.add("active");
       select.classList.add("active");
    }
    else{
        allbutton.classList.remove("active");
        select.classList.remove("active");
    }
});








