import { sequelize } from "./db";

export interface BaseDoc {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

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
AccountModel.hasMany(PlaylistItemModel);

PlaylistModel.hasMany(PlaylistItemModel);

GroupModel.hasMany(PlaylistModel);
GroupModel.hasMany(ScheduleModel);
GroupModel.hasMany(MediaModel);
GroupModel.hasMany(ScreenModel);

ScreenModel.belongsTo(GroupModel);
UserModel.belongsTo(AccountModel);
MediaModel.belongsTo(AccountModel);
GroupModel.belongsTo(AccountModel);
ScreenModel.belongsTo(AccountModel);
PlaylistModel.belongsTo(AccountModel);
ScheduleModel.belongsTo(AccountModel);

PlaylistModel.belongsTo(GroupModel);
ScheduleModel.belongsTo(GroupModel);
MediaModel.belongsTo(GroupModel);

PlaylistItemModel.belongsTo(MediaModel, { as: "media" });
PlaylistItemModel.belongsTo(PlaylistModel);
PlaylistItemModel.belongsTo(AccountModel);

ScheduleModel.belongsTo(PlaylistModel);

sequelize.sync().then(() => {
	console.log(`Database & tables created!`);
});
