
var app = app || {};

(function () {
    'use strict';

    app.ToolBarDropDown = React.createClass({
        handleClick: function(event) {
            console.log(event.target);
        },
        render: function(){
            var nowShowing = this.props.nowShowing;
            //console.log(nowShowing);
            return(
                <a id="grid_views_menu" onClick={this.handleClick} tabindex="-1" className="dropdown-menu-link">
                    <div className="new-button new-default-button ">
                        <span className="left-button-icon"></span>
                        <span className="new-button-text">Menu</span>
                        <span className="right-button-icon">
                            <span data-icon="chevron-down" className="glyph fa fa-chevron-down "></span>
                        </span>
                    </div>
                </a>
            );
        }
    });





    app.ToolBar = React.createClass({
        getInitialState: function(){
            return { focused: 0 };
        },
        handleClick: function(i) {
            console.log('You clicked: ' + this.props.data[i].title);
            this.setState({focused: i});
        },
        render: function(){
            var self = this;
            return(

                <div className='toolbar main-bar user-view'>
                    <span className='toolbar-section'>
                        <div className='view-toggle clearfix'>
                            {
                                this.props.data.map(function(btn,index){
                                    var classString = 'glyph fa';
                                    if(btn.iconCLass) {
                                        classString += ' ' + btn.iconCLass;
                                    }
                                    var iconClassShort = 'iconClass';
                                    if(btn.iconClassShort) {
                                        iconClassShort = btn.iconClassShort;
                                    }
                                    var style = '';
                        
                                    if(self.state.focused == index){
                                        style = ' pressed';
                                    }
                                    return(
                                        <a href={btn.url}>
                                            <div className={'new-button new-default-button list-button ' + style} onClick={ self.handleClick.bind(self, index) }>
                                                <span className='left-button-icon'>
                                                    <span data-icon={iconClassShort} className={classString} ></span>
                                                </span>
                                                <span className='new-button-text'>{btn.title}</span>
                                                <span className='right-button-icon'></span>
                                            </div>
                                        </a>
                                    );
                                })
                            }
                        </div>

                        <app.ToolBarDropDown />

                    </span>
                </div>

            );
        }
    });

    








    var DropdownArea = React.createClass({
        render : function(){
            return(
                <div className="dropdown " id="new_menu_dropdown_menu"  
                //style="top: 34px; max-height: 247px; left: 144.375px; min-width: 65.375px; z-index: 2000;"
                >
                    <div className="dropdown-menu ">
                        <a id="new_menu_item_new_task" className="menu-item" title="">
                            <span className="dropdown-menu-item-label">New Task</span>
                            <span className="shortcut"><span className="symbol_enter">:</span></span>
                        </a>
                        <a id="new_menu_item_new_section" className="menu-item" title="">
                            <span className="dropdown-menu-item-label">New Section</span>
                            <span className="shortcut">:</span>
                        </a>
                    </div>
                </div>
            );
        }
    })
    React.render(
        <DropdownArea/>, 
        document.getElementById('dropdown-area'));
})();