import { sequelize } from "../../utils";

const User = sequelize.import('./user');

User.sync();

export { User };
