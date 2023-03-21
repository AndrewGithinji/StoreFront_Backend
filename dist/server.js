"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var product_1 = require("./models/product");
var productRouter_1 = __importDefault(require("./routes/productRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var orderRouter_1 = __importDefault(require("./routes/orderRouter"));
var app = (0, express_1["default"])();
var port = 3000;
var productStore = new product_1.ProductStore();
// const corsOptions: CorsOptions = {
//     origin: ['http://localhost:3000'],
// };
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
// Routes
app.use('/products', productRouter_1["default"]);
app.use('/users', userRouter_1["default"]);
app.use('/orders', orderRouter_1["default"]);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/test', function (req, res) {
    // productStore.create({
    //     name: 'test',
    //     quantity: 1,
    //     description: 'Just a test product',
    // }).then((product) => {
    //     console.log(product)
    //     res.json(product);
    // })
    productStore.index().then(function (product) {
        console.log(product);
        res.json(product);
    });
});
app.listen(port, function () {
    console.log("starting app on port: ".concat(port));
});
exports["default"] = app;
