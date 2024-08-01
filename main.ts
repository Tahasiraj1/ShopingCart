class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number
    ) {}
} 

class CartItem {
    constructor(
        public product: Product,
        public quantity: number
    ) {}

    get totalPrice(): number {
        return this.product.price * this.quantity
    }
}

class CartService {
    private items: CartItem[] = [];

    addItem(product: Product, quantity: number): void {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if(existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new CartItem(product, quantity))
        }
    }

    removeItem(productId: number): void {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    getItems(): CartItem[] {
        return this.items
    }

    getTotal(): number {
        return this.items.reduce((total, item) => total + item.totalPrice, 0)
    }

    clearCart(): void {
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

















