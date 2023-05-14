"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, orderItems) {
        this.id = id;
        this.orderItems = orderItems;
        this.total = 0;
        this.calculateTotal = () => {
            const total = this.orderItems.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0);
            return total;
        };
        this.getId = () => {
            return this.id;
        };
        this.getOrderItems = () => {
            return this.orderItems;
        };
        this.setOrderItems = (newOrderItems) => {
            this.orderItems = newOrderItems;
            this.total = this.calculateTotal();
        };
        this.addOrderItem = (newOrderItem) => {
            this.orderItems.push(newOrderItem);
            this.total = this.calculateTotal();
        };
        this.deleteOrderItem = (id) => {
            this.orderItems = this.orderItems.filter((orderItem) => orderItem.id !== id);
            this.total = this.calculateTotal();
        };
        this.getTotal = () => {
            return this.total;
        };
        this.total = this.calculateTotal();
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map