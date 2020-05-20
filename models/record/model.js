const Sequelize = require('sequelize');
const { sequelize: sequel } = require('../../helpers/database');

class RecordModel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            memberId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            round: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            runningTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sitUpCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            pushUpCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'record',
            tableName: 'record',
        });
    }

    static get(where, models = []) {
        return this.findAll({
            where,
            include: models,
            order: [['createdAt', 'DESC']],
        });
    }

    static getOne(where, models = []) {
        return this.findOne({
            where,
            order: [['createdAt', 'DESC']],
            include: models,
        });
    }

    static setOne(record) {
        return this.create(record);
    }

    static updateOne(record, where) {
        return this.update(record, where);
    }
}

RecordModel.init(sequel);

module.exports = {
    RecordModel,
};
