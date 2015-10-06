var User = Backbone.Model.extend({
	urlRoot:'/users',
	idAttribute:'username',
	defaults: {
		username:'',
		password: '',
		bio: "I'm a person!"
	}
})

var Tweet = Backbone.Model.extend({
	defaults: {
		text:'Twit!',
		author:'',
		timestamp: 0
	},
	url: '/posts',
	initialize: function() {
	}
})

var RecentTweets= Backbone.Collection.extend({
	model:Tweet,
	url: "/recent",
	initialize: function() {
		this.fetch();
	}
})

var MyTweets= Backbone.Collection.extend({
	model:Tweet,
	url: "/posts/",
	initialize: function(name) {
		this.url += name;
		this.fetch();
	}
})

function loginUser(name) {
	currUser = new User({username: name});
	currUser.fetch();
	myTweets = new MyTweets(currUser.get('username'));
	return currUser;
}

function registerUser(name, bio, password) {
	if (name === currUser.get('username')) return;
	var user = new User({
		username: name,
		bio: bio,
		password: password
	});
	user.save();
	return loginUser(name);
}

function editUser(bio, password) {
	var newdata = {}
	if (bio) newdata.bio = bio;
	if (password) newdata.password = password;
	currUser.save(newdata);
}

var recentTweets = new RecentTweets();
var myTweets;
var currUser = loginUser('Dan');//  <--------- Your Name Here

function newTweet(text) {
	var tweet = new Tweet({
		text: text,
		author: currUser.get('username'),
		timestamp: Date.now()
	});
	tweet.save();
	recentTweets.add(tweet);
	myTweets.add(tweet);
}


