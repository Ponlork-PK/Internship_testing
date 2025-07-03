import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sql from "mssql/msnodesqlv8.js";


const app = express();
const PORT = 5000;

var dbConfig = {
    server: 'LAPTOP-5H5NGLFO\\SQLEXPRESS', 
    database: 'productdb',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    }
};

sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Connected to database');
    }

    app.use(bodyParser.json());
    app.use(cors());

    // Get all products
    app.get("/", async (req, res) =>{
        try {
            const result = await pool.request().query("SELECT * FROM PRODUCTS");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    

    // Add product
    app.post("/addproduct", async (req, res) => {
        const { PRODUCTNAME, PRICE, STOCK } = req.body;

        try {
            const result = await pool
                .request()
                .input('ProductName', sql.NVarChar, PRODUCTNAME)
                .input('Price', sql.Decimal(10, 2), PRICE)
                .input('Stock', sql.Int, STOCK)
                .query(
                    'INSERT INTO PRODUCTS (PRODUCTNAME, PRICE, STOCK) VALUES (@ProductName, @Price, @Stock)'
                );
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })

    // Update product
    app.put("/updateproduct/:id", async (req, res) => {
        const { id } = req.params;
        const { PRODUCTNAME, PRICE, STOCK } = req.body;
        try {
            const result = await pool
                .request()
                .input('Id', sql.Int, id)
                .input('ProductName', sql.NVarChar, PRODUCTNAME)
                .input('Price', sql.Decimal(10, 2), PRICE)
                .input('Stock', sql.Int, STOCK)
                .query(
                    'UPDATE PRODUCTS SET PRODUCTNAME = @ProductName, PRICE = @Price, STOCK = @Stock WHERE PRODUCTID = @Id'
                );
            res.json({ message: "Product updated successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete product
    app.delete("/deleteproduct/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool
                .request()
                .input('Id', sql.Int, id)
                .query('DELETE FROM PRODUCTS WHERE PRODUCTID = @Id');
            res.json({ message: "Product deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

})



