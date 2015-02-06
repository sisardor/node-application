// tutorial2.js

var Comment = React.createClass({displayName: "Comment",
	render: function(){
		return (
			React.createElement("div", {className: "comment"}, 
		        React.createElement("h2", {className: "commentAuthor"}, 
		          this.props.author
		        ), 
		        this.props.children
			)
		);
	}
});

var CommentList = React.createClass({displayName: "CommentList",
	render: function() {
	return (
		React.createElement("div", {className: "commentList"}, 
			React.createElement(Comment, {author: "Pete Hunt"}, "This is one comment"), 
			React.createElement(Comment, {author: "Jordan Walke"}, "This is *author* comment")
		)
	);
	}
});

var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
	return (
	  React.createElement("div", {className: "commentForm"}, 
		"Hello, world! I am a CommentForm."
	  )
	);
  }
});