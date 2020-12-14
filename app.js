const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
 
// routes
 const authRoutes = require("./routes/auth"); 
 const userRoutes = require("./routes/user");
 const tableRoutes = require("./routes/table");  
 const categoryRoutes = require("./routes/category");
 const productRoutes = require("./routes/product"); 
 const chairRoutes = require("./routes/chair");  
 const orderRoutes = require("./routes/order");  

const app = express();

// database connection
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
}
db();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// port
const port = process.env.PORT || 6001;

const swaggerOptions = {
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'In the guaren - API',
            description: "API for manage orders, payments and administration of the restaurant.",
            contact: {
                name: "Mauricio Zepeda Rivera"
            }, 
            servers: [
                {
                  url: `http://localhost:${port}`,
                  description: "Backend server"
                } 
            ]
        }
    },
    //definition the apis with swagger
    apis: ['./routes/*.js']
};
 
// final definitions with swagger-express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", tableRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", chairRoutes);
app.use("/api", orderRoutes); 

// listen port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
