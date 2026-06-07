let burg = document.querySelector(".burger");
burg.addEventListener("click", burger);
let bnav = document.querySelector(".bnav");

function burger (){
    burg.classList.toggle("active");
    bnav.classList.toggle("active");
}














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



