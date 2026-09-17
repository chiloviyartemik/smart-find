import phonesData from "./phones.js";

let header = document.querySelector("header");
let them = document.getElementById("them"); // Это ваш span/иконка
let checkbox = document.getElementById("theme-checkbox"); // Сам скрытый input[type="checkbox"]

// Функция применения темы
function applyTheme(isWhite) {
    if (isWhite) {
        document.body.classList.add("white-theme");
        if (header) header.classList.add("white-theme");
        // Добавьте сюда остальные переключения классов, если нужно
    } else {
        document.body.classList.remove("white-theme");
        if (header) header.classList.remove("white-theme");
    }
}

// 1. ПРОВЕРКА ПРИ ЗАГРУЗКЕ САЙТА
// Смотрим, что было сохранено в памяти браузера ранее
let savedTheme = localStorage.getItem("isWhiteTheme");
if (savedTheme === "true") {
    if (checkbox) checkbox.checked = true;
    applyTheme(true);
} else {
    if (checkbox) checkbox.checked = false;
    applyTheme(false);
}

// 2. СОХРАНЕНИЕ ПРИ КЛИКЕ / ИЗМЕНЕНИИ
if (checkbox) {
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            localStorage.setItem("isWhiteTheme", "true");
            applyTheme(true);
        } else {
            localStorage.setItem("isWhiteTheme", "false");
            applyTheme(false);
        }
    });
}



let bace = [];
bacec();
function bacec (){
    bace = phonesData;
}

let burg = document.querySelector(".burger");
burg.addEventListener("click", burger);
let bnav = document.querySelector(".bnav");

function burger (){
    burg.classList.toggle("active");
    bnav.classList.toggle("active");
}

// 1. Создаем базу знаний для твоих тегов
    let shortTagNames = {
    "ip": "IP",
    "fastcharge": "Fast Charge",
    "compact": "Compact",
    "material": "Material",
    "scan": "Scan",
    "esim": "Esim",
    "snap": "Snap",
    "global": "Global",
    "CN": "CN версия",
    "balans": "Balans",
    "camers": "Camers",
    "gps":"GPS",
    "autonomy":"Autonomy",
    "sale":"Sale"

};
    
function initSaleSlider() {
    let salePhones = phonesData.filter(phone => phone.tags.includes("sale"));

    let saleHtml = salePhones.map(phone => {
        let tagsHtml = phone.tags.map(tag => `<span class="card_tag">${shortTagNames[tag] || tag}</span>`).join("");
        
        return `
            <div class="phone_card_slide">
                <img src="${phone.img}" class="phone_img">
                <div class="phone_info">
                    <h3>${phone.name}</h3>
                    <span class="price">${phone.price}</span>
                    <div class="card_filtrs">
                        ${tagsHtml}
                    </div>
                </div>
            </div>`;
    }).join("");

    let container = document.getElementById("sale-slider-container");
    if (container) {
        container.innerHTML = saleHtml;
    }
}
initSaleSlider();















const TOKEN = `8794443303:AAG3nTr6adcrAMUF1WiZxNX8Bo9k7CBd2-Y`;
const CHAT_ID = `373661512`; 
// Правильный адрес: api.telegram.org и слово bot перед токеном
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;


// 1. Ищем ФОРМУ, а не кнопку
let form = document.querySelector("#tg-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // 2. Собираем данные (теперь name="name" и name="phone" есть в HTML)
    let message = `<b>Заявка с сайта</b>\n`;
    message += `ФИО: ${this.name.value}\n`;
    message += `Номер телефона: ${this.phone.value}`;
    console.log(message);
    fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message,
        })
    })
    .then((res) => {
        if (res.ok) {
            alert("Заявка успешно отправлена!");
            this.reset(); // Очистить поля после отправки
        } else {
            alert("Ошибка при отправке. Проверьте ID и Токен.");
        }
    })
    .catch((err) => {
        console.warn("Ошибка сети:", err);
    });
});
