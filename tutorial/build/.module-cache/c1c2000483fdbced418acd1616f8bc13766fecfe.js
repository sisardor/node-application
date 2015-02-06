// tutorial1.js

var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
var CommentBox = React.createClass({displayName: "CommentBox",
	getInitialState: function() {
		return {data:[]};
	},
	componentDidMount: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data){
				this.setState({data:data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		return (
		  React.createElement("div", {className: "commentBox"}, 
		    React.createElement("h1", null, "Comments"), 
		    React.createElement(CommentList, {data: this.state.data}), 
		    React.createElement(CommentForm, null)
		  )
		);
	}
});


React.render(
	React.createElement(CommentBox, {url: "comments.json"}),
	document.getElementById('content')
);