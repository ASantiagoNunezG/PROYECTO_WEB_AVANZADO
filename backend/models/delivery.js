// models/delivery.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import DeliveryType from './delivery_type.js'; // Import DeliveryType model
import Shop from './shop.js'; // Import Shop model

const Delivery = sequelize.define('delivery', {
    delivery_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    delivery_type_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shop_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state:{
        type: DataTypes.STRING(60),
        allowNull: false
    },
    delivery_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    delivery_hour:{
        type: DataTypes.TIME,
        allowNull: false
    }
});

// Associations
Delivery.belongsTo(DeliveryType, { foreignKey: 'delivery_type_id' });
Delivery.belongsTo(Shop, { foreignKey: 'shop_id' });

await Delivery.sync();

export default Delivery;
