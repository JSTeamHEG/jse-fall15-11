## Homework #11

_Due Mon. Oct. 12_

As before, this is a group project and each team of 3 should collaborate in a shared repository.  You may adopt any starting code you wish, including components from the earlier Issue-Tracking Backbone app of any team member.

This time, you're going to modify your Backbone issue-tracker to make a micro-blogging app similar to Twitter.  Users will be able to log in with a username and password, then see several lists of posts and be able to submit new posts.

Although you will again use Backbone for this project, there is a critical difference between this project and the last one.  This time, some of the views will be rendered from the server instead of from Backbone.

### Client-side (Backbone)

Let's first consider the client-side Backbone components.

#### Backbone Models

You will probably want these models:

* User:
	* username: a name unique to each user.
	* bio: a very brief description of the user
	* password: the user's password, stored but never displayed.

* Post
	* text: the body of the post.  You may choose to limit it to a fixed number of characters.
	* author: the username of the post's author
	* mentions: an array of usernames mentioned (as `@username`) within the text of the post.
	* timestamp: the "Unix" time (a single integer) recording when the post was submitted. You can get this by calling `Date.now()`

You will have several Backbone collections of posts, but no collection of Users!  Instead, you should have a single user model representing the user who has logged in.

#### Backbone Views

You will probably want these Backbone views:

* UserView: displays the user's public profile (username and bio), a logout button, and the four views below.

* CreatePostView: display a text input area and a "Post It" button which submits the new post.

* RecentPostsView: a list of the 5 most recent posts made by anyone.

* MyPostsView: a list of all the posts made by the current user.

* MyMentionsView: a list of all the posts made which mention the current user (by including @username).

Each listed post should display the post's text (with embedded mentions), author, and timestamp as a formatted of a string (something like "Jan 1 2035, 12:34:56").  If you wish, you may use a Backbone view for each individual Post, but since Posts can't be edited, there isn't much benefit in a Backbone view.

Notice that there is no Backbone `LoginView`!  The login screen will not be handled by Backbone; instead, it will be rendered by the server as an alternative to the main application page (which includes the Backbone views).


### Server

Your server will need the routes both to render HTML and to send JSON data.

#### Routes which deliver HTML (a new client):

* GET /
	Render the HTML for the login page
* POST /
	Accept a login POST which includes an attempted username and password.  If the login is successful, render the HTML for the user page, which will include the Backbone code and render all Backbone views.  If login is unsuccessful, redirect back to the main route "/".
* POST /users
	Register a new username and password, then render the HTML for that users' page.

#### Routes which send and receive JSON data:

* PUT /users/:username
	Update the user's profile and/or password
* GET /users/:username
	Get a user's profile (minus the password!)
* GET /posts/:username
	Get all posts by a particular user
* POST /posts
	Submit a new post
* GET /recent
	Get some number of recent posts

Notice that there is neither a `GET /users` nor a `GET /posts` route --- you cannot fetch the entire collection of users or posts.   That would be problematic for both security and performance.  Instead, there are two (or more) different routes to get different subsets of the posts stored on the server.

### Bonus features

* When a user logs in successfully, have the server set a cookie on the client so that successive GET requests to '/' log in automatically.

* Add a "mention" feature.  Add the attribute `mentions` to each post model, which will be an array of usernames.  Whenever the text of a post includes one or more strings "@username" (for some usename), add those usernames to the `mentions` attribute when the post is stored.  You can do this on either the client or on the server.  Either way, add an extra route to the server (`GET /mentions/:username`) which will find and deliver all the posts which mention `username`.
Also, add another Backbone view `MyMentionsView` (within the `UserView`) listing those posts which mention the current user.

