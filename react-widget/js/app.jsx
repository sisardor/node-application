(function () {
    'use strict';


var Tweet = React.createClass({
    render: function(){
        var userName = this.props.tweet.userName,
            displayName = this.props.tweet.displayName,
            tweetDate = this.props.tweet.tweetDate,
            tweet = this.props.tweet.tweet,
            avatar = this.props.tweet.avatar

        return(
            <div className="wTweet">
                <div className="tw-header">{userName}<img class="u-photo avatar" alt="" src={avatar} /></div>
                <div className="tw-body">{tweet}</div>
                <div className="tw-footer">{displayName}</div>
            </div>);
    }
});
var WidgetBody = React.createClass({
    componentDidMount: function () {

    },
    render: function(){
        var style = {
            height: this.props.height
        };

        var rows = [];
        for (var i = 0; i < 50; i++) {
            rows.push(<tr><th class="tg-031e">Do not generate CSS jfksjdfkjsdkfj kdjsfk jsdfkjsd</th></tr>);
        };
        return (
        <div style={style} className="body">
            <table class="tg">
                {
                    this.props.tweets.map(function(tweet, index){
                        return <tr><th class="tg-031e"><Tweet tweet={tweet} key={tweet.id}/></th></tr>;
                    })
                }   
            </table>
        </div>
        );
    }
});

var TwitterWidget = React.createClass({
    getInitialState: function(){
        return({ bodyHeight : 100 });
    },
    componentDidMount: function(){
        var widgetHeight = this.refs.wWidget.getDOMNode().offsetHeight;
        var headerHeight = this.refs.wHeader.getDOMNode().offsetHeight;
        var footerHeight = this.refs.wFooter.getDOMNode().offsetHeight;
        var bodyHeight = widgetHeight - (headerHeight + footerHeight);
        this.setState({bodyHeight : bodyHeight});
    },
    render: function(){
        return(
            <div ref="wWidget" className="tWidget">
                <div ref="wHeader" className="header"></div>
                <WidgetBody height={this.state.bodyHeight} tweets={this.props.tweets}/>
                <div ref="wFooter" className="footer"></div>
            </div>);
    }
});



































var tweets = [
    {id:1, userName:'@OdeToCode', tweetDate:'11 Feb', displayName:'K. Scott Allen', tweet:'<a href="https://twitter.com/MandarAFC">@MandarAFC</a> Do you have a value from the request that will tell you the selected item? Query string or form value?', avatar:'https://pbs.twimg.com/profile_images/562247204241301504/Ni2lninw_normal.jpeg'},
    {id:2, userName:'@MandarAFC', tweetDate:'11 Feb', displayName:'mandar', tweet:'<a href="https://twitter.com/MandarAFC">@MandarAFC</a> @OdeToCode hey scott, found myself in tricky question here, it\'s a long shot,but could you help?http://stackoverflow.com/questions/28453827/dropdown-list-selected-index-changed-razor …', avatar:'https://pbs.twimg.com/profile_images/3292835308/ad0ba5cdc5d1b72a0916af332f8616d9_normal.jpeg'},
    {id:3, userName:'@OdeToCode', tweetDate:'11 Feb', displayName:'K. Scott Allen', tweet:'<a href="https://twitter.com/MandarAFC">@MandarAFC</a> Do you have a value from the request that will tell you the selected item? Query string or form value?', avatar:'https://pbs.twimg.com/profile_images/463911364738547713/20NRpn7v_normal.jpeg'},
    {id:4, userName:'@OdeToCode', tweetDate:'11 Feb', displayName:'K. Scott Allen', tweet:'<a href="https://twitter.com/MandarAFC">@MandarAFC</a> Do you have a value from the request that will tell you the selected item? Query string or form value?', avatar:'https://pbs.twimg.com/profile_images/562247204241301504/Ni2lninw_normal.jpeg'},
    {id:5, userName:'@OdeToCode', tweetDate:'11 Feb', displayName:'K. Scott Allen', tweet:'<a href="https://twitter.com/MandarAFC">@MandarAFC</a> Do you have a value from the request that will tell you the selected item? Query string or form value?', avatar:'https://pbs.twimg.com/profile_images/562247204241301504/Ni2lninw_normal.jpeg'}
]

React.render(<TwitterWidget tweets={tweets}/>,  document.getElementById('myApp'));

})();