const sequelize = require("./db");
const AccountModel = sequelize.import("./models/account");
const MediaModel = sequelize.import("./models/media");
const PlaylistModel = sequelize.import("./models/playlist");
const PlaylistItemModel = sequelize.import("./models/playlistItem");
const ScheduleModel = sequelize.import("./models/schedule");
const ScreenModel = sequelize.import("./models/screen");
const UserModel = sequelize.import("./models/user");
const GroupModel = sequelize.import("./models/group");

AccountModel.hasMany(UserModel);
AccountModel.hasMany(MediaModel);
AccountModel.hasMany(GroupModel);
AccountModel.hasMany(ScreenModel);
AccountModel.hasMany(PlaylistModel);
AccountModel.hasMany(ScheduleModel);

UserModel.belongsTo(AccountModel);
MediaModel.belongsTo(AccountModel);
GroupModel.belongsTo(AccountModel);
ScreenModel.belongsTo(AccountModel);
PlaylistModel.belongsTo(AccountModel);
ScheduleModel.belongsTo(AccountModel);

PlaylistModel.belongsTo(GroupModel);
ScreenModel.belongsTo(GroupModel);
ScheduleModel.belongsTo(GroupModel);
MediaModel.belongsTo(GroupModel);

PlaylistItemModel.belongsTo(MediaModel);
PlaylistItemModel.belongsTo(PlaylistModel);

ScheduleModel.belongsTo(PlaylistModel);

// AccountModel.belongsToMany(PlaylistItemModel, { through: PlaylistModel });

sequelize.sync({ force: true }).then(() => {
	console.log(`Database & tables created!`);
});
