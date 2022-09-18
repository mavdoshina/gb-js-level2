const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'image/Notebook.jpeg'},
    {id: 2, title: 'Mouse', price: 20, img: 'image/mouse.jpeg'},
    {id: 3, title: 'Keyboard', price: 200, img: 'image/Keyboard.jpeg'},
    {id: 4, title: 'Gamepad', price: 50, img: 'image/gamepad.jpeg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <img class="product-img" src="${item.img}" alt="product">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

//innerHTML ожидает в качестве объекта приcваивания строку. 
//По этому к массиву применяется .toString(), что эквивалентно .join(','). 
//Так как нам не нужны запятые, то вызовим метод join('') с разделителем "Пустая строка".
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);