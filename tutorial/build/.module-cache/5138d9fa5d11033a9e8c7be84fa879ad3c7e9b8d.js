// tutorial2.js
var converter = new Showdown.converter();
var Comment = React.createClass({displayName: "Comment",
	render: function(){
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
	  handleSubmit: function(e) {
	    e.preventDefault();
	    var author = this.refs.author.getDOMNode().value.trim();
	    var text = this.refs.text.getDOMNode().value.trim();
	    if (!text || !author) {
	      return;
	    }
	    this.props.onCommentSubmit({author: author, text: text});
	    this.refs.author.getDOMNode().value = '';
	    this.refs.text.getDOMNode().value = '';
	    return;
	  },
	  render: function() {
	    return (
	      React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
	        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
	        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
	        React.createElement("input", {type: "submit", value: "Post"})
	      )
	    );
	  }
});