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
        console.log(this.goods);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
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
        console.log('ggg');
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
        const indexElem = this.goods.findIndex(elem => elem.id_product === item.id_product);
        if(indexElem < 0) {
            item.quantity = 1;
            this.goods.push(item);
            this.renderUpdate(item);
        } else {
            this.goods[indexElem].quantity++
        }

        console.log(this.goods);
    
        // cartTotalEl.innerHTML = getTotalAll();
        // if(!cartCount) {
        //     const spanEl = document.createElement('span');
        //     spanEl.classList.add('basket-count');
        //     spanEl.innerHTML = getCountElemtCart();
        //     cartSmallEl.append(spanEl);
        // } else {
        //     cartCount.innerHTML = getCountElemtCart();
        // }
        
        // productRender(id);
    }

    //удаление элемента из корзины
    deleteItemCart() {}

    //изменение количества товаров в корзине
    changeCountCart(){}

    //очистить всю корзину
    cleanAllCart() {}

    //получить количество товаров в корзине
    getCountElemtCart() {}

    renderUpdate(item) {
        const basketItem = document.querySelector(`this.container [data-id = "${item.id_product}"]`);
        console.log(basketItem);
        const block = document.querySelector(this.container);

        const basketProduct = new ProductBasket(item);
        basketProduct.summItemCart();

        if(!basketItem) {
            block.insertAdjacentHTML('beforeend', basketProduct.render());
            return;
        }
    
        // cartItem.querySelector('.cart-item__count')
        //     .textContent = products[id].count;
    
        // cartItem.querySelector('.cart-item__price-all')
        //     .textContent = getSummCartItem(id);
    }

    render() {
        const block = document.querySelector(this.container);
        console.log(this.goods);
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
        console.log(JSON.stringify(this));
        return `<div class="product-item" data-id="${this.id_product}">
                    <div class="product-item-info">
                        <img src="${this.img}" alt="${this.product_name}">
                        <div class="desc">
                            <div class="name">${this.product_name}</div>
                            <div class="small">Quantity: ${this.quantity}</div>
                            <div class="small">${this.price} $</div>
                        </div>
                    </div>
                    <div class="product-item-summ-info">
                        <div class="product-item-summ">${this.summ} $</div>
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
})