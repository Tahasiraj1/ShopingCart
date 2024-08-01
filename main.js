class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class CartItem {
    product;
    quantity;
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    get totalPrice() {
        return this.product.price * this.quantity;
    }
}
class CartService {
    items = [];
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            this.items.push(new CartItem(product, quantity));
        }
    }
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }
    getItems() {
        return this.items;
    }
    getTotal() {
        return this.items.reduce((total, item) => total + item.totalPrice, 0);
    }
    clearCart() {
        this.items = [];
    }
}
const cartService = new CartService();
const product1 = new Product(1, "Laptop", 1000);
const product2 = new Product(2, "Mouse", 100);
const product3 = new Product(3, "Keyboard", 200);
cartService.addItem(product1, 1);
cartService.addItem(product2, 1);
cartService.addItem(product3, 1);
console.log("Cart Items:");
cartService.getItems().forEach(item => {
    console.log(`${item.product.name} x ${item.quantity} = ${item.totalPrice}`);
});
console.log(`Total: ${cartService.getTotal()}`);
cartService.removeItem(2);
console.log("Cart Items after removal:");
cartService.getItems().forEach(item => {
    console.log(`${item.product.name} x ${item.quantity} = ${item.totalPrice}`);
});
console.log(`Total after removal: ${cartService.getTotal()}`);
cartService.clearCart();
console.log("Cart Items after clearing:");
console.log(cartService.getItems());
console.log(`Total after clearing: ${cartService.getTotal()}`);
export {};
