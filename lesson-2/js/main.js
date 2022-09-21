class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    summProducts(){
        let summ = 0;
        this.goods.forEach(item => {
            summ += item.price;
        });
        return summ;
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
             const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
             // block.innerHTML += item.render();
        }
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Cart extends ProductList {

    //появятся дополнитеьные свойства 
    //this.allSumm - общая сумма корзины

    //добавление в корзину
    addItemCart() {}

    //удаление элемента из корзины
    deleteItemCart() {}

    //изменение количества товаров в корзине
    changeCountCart(){}

    //очистить всю корзину
    cleanAllCart() {}

}


class ProductCart extends ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150',count){
        super(product,img);
        this.count = count;
    }

    //появятся дополнитеьные свойства 
    //this.productSumm - общая сумма товата в корзине

    // подсчет суммы одной позиции в зависимсоти от количества товара
    summItemCart(){}

    //изменение колчества одной позиции
    changeCountItem(){}
}

let list = new ProductList();
console.log(list.summProducts());


//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);