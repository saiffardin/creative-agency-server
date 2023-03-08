const {addAdmin, findAdminByEmail} = require('../controllers/admin.controller');

const adminRouter = (app) => {
    app.post('/addAdmin', addAdmin)
    app.get('/findAdmin/:email', findAdminByEmail)
}

module.exports = {adminRouter}

