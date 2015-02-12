(function () {
    'use strict';
    var buttons = [
      {title: "List", iconCLass: "fa-list", iconClassShort: "list", url:"/list"},
      {title: "Calendar", iconCLass: "fa-calendar", iconClassShort: "calendar", url:"/calendar"}
    ];

    var ToolBarButton = React.createClass({
        handleClick: function(event) {
            
        },
        render: function(){

            // var cx = React.addons.classSet;
            // var classes = cx({
            //     'message': true,
            //     'message-important': true,
            //     'message-read': false
            // });
            var classString = 'glyph fa';
            if(this.props.data.iconCLass) {
                classString += ' ' + this.props.data.iconCLass;
            }
            var iconClassShort = 'iconClass';
            if(this.props.data.iconClassShort) {
                iconClassShort = this.props.data.iconClassShort;
            }
            var route = '';
            if(this.props.data.url) {
                route = '#' + this.props.data.url;
            }
            //onClick={this.handleClick}
            return(
                <a href={route}>
                    <div className="new-button new-default-button list-button">
                        
                        <span className="left-button-icon">
                            <span data-icon={iconClassShort} className={classString} ></span>
                        </span>
                        <span className="new-button-text">{this.props.data.title}</span>
                        <span className="right-button-icon"></span>
                        
                    </div>
                </a>
            );
        }
    })
    var ToolBar = React.createClass({
        render: function(){
            var buttonNodes = this.props.data.map(function(btn){

                return(
                    <ToolBarButton data={btn}/>
                );
            });
            return(
                <div className="toolbar main-bar user-view">
                    <span className="toolbar-section">
                        <div className="view-toggle clearfix">
                            {buttonNodes}
                        </div>
                    </span>
                </div>
            );
        }
    });

    React.render(
        //React.createElement(ToolBar, null),
        <ToolBar data={buttons} />,
        document.getElementById('toolbar')
    );

})();