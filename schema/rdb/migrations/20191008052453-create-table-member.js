const { sequelize } = require('../migration');

const TABLENAME = 'member';

module.exports = {
    up: (queryInterface, Sequelize, done) => {
        queryInterface.createTable(TABLENAME, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            teamId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'team',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        }).then((result) => done(null, result), (err) => done(err));
    },
    down: (queryInterface, Sequelize, done) => {
        queryInterface.dropTable(TABLENAME)
            .then((result) => done(null, result), (err) => done(err));
    },
};
