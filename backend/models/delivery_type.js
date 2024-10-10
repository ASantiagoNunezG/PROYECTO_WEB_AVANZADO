//models/delivery_type.js

import { DataTypes } from "sequelize";
import Sequelize from "../config/database.js";

const DeliveryType = Sequelize.define('delivery_type',{
    delivery_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
});

await DeliveryType.sync();

export default DeliveryType;