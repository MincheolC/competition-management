const Sequelize = require('sequelize');
const { sequelize: sequel } = require('../../helpers/database');

class MemberModel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            teamId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'team',
                    key: 'id',
                },
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'member',
            tableName: 'member',
        });
    }

    static get(where) {
        return this.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });
    }

    static getOne(where) {
        return this.findOne({
            where,
            order: [['createdAt', 'DESC']],
        });
    }

    static set(members) {
        return this.bulkCreate(members);
    }
}

MemberModel.init(sequel);

module.exports = {
    MemberModel,
};
