//models/shop.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Shop = sequelize.define('Shop', {
    shop_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

await Shop.sync()

export default Shop;