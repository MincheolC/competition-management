const Sequelize = require('sequelize');
const { sequelize: sequel } = require('../../helpers/database');

class TeamModel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            competitionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(50),
                unique: true,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'team',
            tableName: 'team',
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

    static setOne(team) {
        return this.create(team);
    }
}

TeamModel.init(sequel);

module.exports = {
    TeamModel,
};
