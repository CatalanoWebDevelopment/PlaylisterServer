const sequelize = require("./db");
const Account = sequelize.model("account");
const Media = sequelize.model("media");
const Playlist = sequelize.model("playlist");
const PlaylistItem = sequelize.model("playlist_item");
const Schedule = sequelize.model("schedule");
const Screen = sequelize.model("screen");
const User = sequelize.model("user");
const Group = sequelize.model("group");

Account.hasMany(User);
Account.hasMany(Media);
Account.hasMany(Group);
Account.hasMany(Screen);
Account.hasMany(Playlist);
Account.hasMany(Schedule);

User.belongsTo(Account);
Media.belongsTo(Account);
Group.belongsTo(Account);
Screen.belongsTo(Account);
Playlist.belongsTo(Account);
Schedule.belongsTo(Account);

Playlist.belongsTo(Group);
Screen.belongsTo(Group);
Schedule.belongsTo(Group);
Media.belongsTo(Group);

PlaylistItem.belongsTo(Media);
PlaylistItem.belongsTo(Playlist);

PlaylistItem.belongsToMany(Group, { through: 'playlist' });
PlaylistItem.belongsToMany(Account, { through: 'media' });

Screen.belongsToMany(Account, { through: 'group' });


sequelize.sync().then(() => {
	console.log(`Database & tables created!`);
});
