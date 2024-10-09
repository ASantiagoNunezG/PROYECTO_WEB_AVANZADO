import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const Sell = sequelize.define('Sell', {
    sell_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    delivery_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    final_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    delivery_commision: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    sell_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

await Sell.sync();

export default Sell;
