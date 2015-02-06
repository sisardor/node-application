// tutorial2.js
var converter = new Showdown.converter();
var Comment = React.createClass({displayName: "Comment",
	render: function(){
		console.log(this.props.children.toString());
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			React.createElement("div", {className: "comment"}, 
		        React.createElement("h2", {className: "commentAuthor"}, 
		          this.props.author
		        ), 
		        React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
			)
		);
	}
});

var CommentList = React.createClass({displayName: "CommentList",
	render: function() {
		var commnetNodes = this.props.data.map(function (comment) {
			return (
				React.createElement(Comment, {author: comment.author}, 
					comment.text
				)
			);
		});
	return (
		React.createElement("div", {className: "commentList"}, 
			commnetNodes
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