// tutorial1.js

var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Sardor", text: "This is *another* comment"}
];
var CommentBox = React.createClass({displayName: "CommentBox",
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.props.data}), 
        React.createElement(CommentForm, null)
      )
    );
  }
});


React.render(
	React.createElement(CommentBox, {data: data}),
	document.getElementById('content')
);