const sequelize = require("./db");
const AccountModel = sequelize.model("account");
const MediaModel = sequelize.model("media");
const PlaylistModel = sequelize.model("playlist");
const PlaylistItemModel = sequelize.model("playlist_item");
const ScheduleModel = sequelize.model("schedule");
const ScreenModel = sequelize.model("screen");
const UserModel = sequelize.model("user");
const GroupModel = sequelize.model("group");

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

PlaylistItemModel.belongsToMany(GroupModel, { through: 'playlist' });
PlaylistItemModel.belongsToMany(AccountModel, { through: 'media' });

ScreenModel.belongsToMany(AccountModel, { through: 'group' });


sequelize.sync().then(() => {
	console.log(`Database & tables created!`);
});
