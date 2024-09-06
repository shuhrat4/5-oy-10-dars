let elUsersLists = document.querySelector(".users-list");

function getRequest() {
    axios.get("https://dummyjson.com/products").then(res => {
        res.data.products.map(item => {
            let elItem = document.createElement("li");
            elItem.className = "w-[400px] p-5 rounded-lg bg-slate-200";
            elItem.innerHTML = `
                <img class="object-contain h-[200px] p-2 rounded-lg mb-5" src="${item.images[0]}" alt="Product image" width="100%" height="70" />
                <h2 class="font-bold text-[20px] mb-5">${item.title}</h2>
                <p class="line-clamp-3">${item.description}</p>
                <button onclick="handleSendMessage(${item.id})" class="bg-blue-500 text-white py-2 rounded-lg font-semibold w-full mt-5">Send message</button>
            `;
            elUsersLists.appendChild(elItem);
        });
    }).catch(error => {
        console.error("Xatolik yuz berdi:", error);
    });
}

getRequest();

const TOKEN = "7327879478:AAERUmGmc4-F6E3ZJ1vyopz40HP6aCysOKA";
const CHAT_ID = "-1002314910235"; 
const HTTP = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;

function handleSendMessage(id) {
     axios.get(`https://dummyjson.com/products/${id}`).then(res => {
        let message = `<b>Product Info</b>\n`;
        message += `<b>Product Name:</b> ${res.data.title}\n`;  
        message += `<b>Description:</b> ${res.data.description}\n`;  
       
        axios.post(HTTP, {
            chat_id: CHAT_ID, 
            photo:res.data.images[0],      
            parse_mode: "HTML",     
            caption: message          
    })
  })


}