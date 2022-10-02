const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
                // console.log(data);
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id_product}" data-item=${JSON.stringify(this)}>
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


class Basket {

    constructor(container = '.basket-area'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getDataCart()
            .then(data => { //data - объект js
                 this.goods = data.contents;
                 this.countGoods = data.countGoods;
                 this.amount = data.amount;
                // console.log(data);
                 this.render();
            });
    }

    _getDataCart(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }

    //добавление в корзину
    addItemCart(item) {
        let indexElem = this.goods.findIndex(elem => elem.id_product === item.id_product);
        if(indexElem < 0) {
            item.quantity = 1;
            this.goods.push(item);
            console.log(this.goods.length - 1);
            indexElem = this.goods.length - 1;
        } else {
            this.goods[indexElem].quantity++
        }

        this.renderUpdate(indexElem);
    }

    //удаление элемента из корзины
    deleteItemCart(idElem) {
        const indexElem = this.goods.findIndex(elem => elem.id_product === idElem);
        console.log(idElem);
        this.goods[indexElem].quantity--;

        this.renderUpdate(indexElem);
    }

    //изменение количества товаров в корзине
    changeCountCart(){}

    //очистить всю корзину
    cleanAllCart() {}

    //получить количество товаров в корзине
    getCountElemtCart() {}

    renderUpdate(indexElem) {
        const basketItem = document.querySelector(`${this.container} [data-id = "${this.goods[indexElem].id_product}"]`);

        if(this.goods[indexElem].quantity === 0) {
            basketItem.remove();
        } else {
        
            const block = document.querySelector(this.container);

            const basketProduct = new ProductBasket(this.goods[indexElem]);
            basketProduct.summItemCart();

            if(!basketItem) {
                block.insertAdjacentHTML('beforeend', basketProduct.render());
                return;
            } else {
                basketItem.querySelector('.product-item__quantity span').innerHTML = basketProduct.quantity;

                basketItem.querySelector('.product-item-summ span').innerHTML = basketProduct.summ;
            }
        }
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductBasket(product);
            productObj.summItemCart();
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

}


class ProductBasket extends ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        super(product,img);
        this.quantity = product.quantity;
    }

    //появятся дополнитеьные свойства 
    //this.productSumm - общая сумма товата в корзине

    // подсчет суммы одной позиции в зависимсоти от количества товара
    summItemCart(){
        this.summ = this.quantity * this.price;
    }

    //изменение колчества одной позиции
    changeCountItem(){}

    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <div class="product-item-info">
                        <img src="${this.img}" alt="${this.product_name}">
                        <div class="desc">
                            <div class="name">${this.product_name}</div>
                            <div class="small product-item__quantity">Quantity: <span>${this.quantity}</span></div>
                            <div class="small product-item__price">${this.price} $</div>
                        </div>
                    </div>
                    <div class="product-item-summ-info">
                        <div class="product-item-summ"><span>${this.summ}</span> $</div>
                        <button class="product-item-close">X</button>
                    </div>
            </div>`
    }
}

let list = new ProductsList();
console.log(list.allProducts);

let basket = new Basket();
console.log(basket);

const btnBasket = document.querySelector('.btn-cart');
const areaBasket = document.querySelector(basket.container);
btnBasket.addEventListener('click', () => areaBasket.classList.toggle('active'));


const productsEl = document.querySelector('.products');
productsEl.addEventListener('click', event => {
    if(event.target.classList.contains('buy-btn')) {
        const parent = event.target.closest('.product-item');
        const basketItem = new ProductBasket(JSON.parse(parent.dataset.item));
        basket.addItemCart(JSON.parse(parent.dataset.item));
    }
});


const basketEl = document.querySelector('.basket-area');
basketEl.addEventListener('click', event => {
    if(event.target.classList.contains('product-item-close')) {
        const parent = event.target.closest('.product-item');
        basket.deleteItemCart(+parent.dataset.id);
        // const basketItem = new ProductBasket(JSON.parse(parent.dataset.item));
        // basket.addItemCart(JSON.parse(parent.dataset.item));
    }
})