// tutorial1.js

var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
var CommentBox = React.createClass({displayName: "CommentBox",
	loadCommentsFromServer: function(){
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
	getInitialState: function() {
		return {data:[]};
	},
	componentDidMount: function(){
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
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
	React.createElement(CommentBox, {url: "comments.json", pollInterval: 20000}),
	document.getElementById('content')
);