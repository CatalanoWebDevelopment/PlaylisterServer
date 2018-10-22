const sequelize = require('./db')
const Account = sequelize.model('account')
const Media = sequelize.model('media')
const Playlist = sequelize.model('playlist')
const PlaylistItem = sequelize.model('playlist_item')
const Schedule = sequelize.model('schedule')
const Screen = sequelize.model('screen')
const User = sequelize.model('user')

Account.hasMany(User)
Account.hasMany(Media)
Account.hasMany(Group)
Account.hasMany(Playlist)
Account.hasMany(PlaylistItem)

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
})