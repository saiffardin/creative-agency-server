const {addOrder, updateOrderStatusById, findOrdersByEmail, loadAllOrders} = require('../controllers/orders.controller');

const orderRouter = (app) => {
    app.patch('/updateStatus/:id', updateOrderStatusById)
    app.post('/addOrder', addOrder)
    app.get('/findOrders/:email', findOrdersByEmail)
    app.get('/loadAllOrders', loadAllOrders)
}

module.exports = {orderRouter}
