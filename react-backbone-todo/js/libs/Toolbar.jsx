var data = [
    {label: 'Home', link:'/' },
    {label: 'About us', link:'/about-us'},
    {label: 'Menu', open: false, dropdown:[
        {label: 'Menu 1'},
        {label: 'Menu 2'}
    ]},
    {label: 'Jasur', open: false, dropdown:[
        {label: 'Jasur 1'},
        
        {label: 'Jasur 23', open: true, dropdown:[
                                        {label: 'Nested 1'},
                                        {label: 'Nested 2'}] },
        {label: 'Jasur 2'},
        {label: 'Jasur 77'}
    ]}
];

(function () {
    'use strict';
    var HorizontalDropDown = React.createClass({
        render: function(){
            return null;
        },
        componentDidMount: function() {
            this.portal = document.createElement('span');
            this.portal.className = 'dropdown-style-default';
            document.body.appendChild(this.portal);
            this.renderDropDownContent(this.props);
        },
        renderDropDownContent: function(props){
            var cx = React.addons.classSet;
            var nowShowing = props.nowShowing;
            var results = props.dropdown;
            var style = {
                visibility: (nowShowing) ? 'visible': 'hidden'
            }
            var _dropdown = (
                <div style={style}>
                    <ul >
                        {
                            results.map(function(item, i){
                                return <li>{item.label}</li>
                            })
                        }
                    </ul>
                </div>);
             React.render(_dropdown, this.portal );
        }

    });
    var DropDown = React.createClass({
        getInitialState: function() {
            return {items: this.props.dropdown};
        },
        click_outside_component: function(e) {
            var props = this.props;
            props.nowShowing = false;
            this.renderDropDownContent(props);
        },
        click_document: function(e) {
            if ($(this.portal).has(e.target).length) return;
            this.click_outside_component(e);
        },

        propTypes: {
            dropdown: React.PropTypes.array.isRequired
        },

        getPosition : function(element) {
            var xPosition = 0;
            var yPosition = 0;
              
            while (element) {
                xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
            return { x: xPosition, y: yPosition };
        },

        render : function() {
            return null;
        },

        componentDidMount: function() {
            this.portal = document.createElement('span');
            this.portal.className = 'dropdown-style-default';
            document.body.appendChild(this.portal);
            this.renderDropDownContent(this.props);
        },

        handleClick: function(item) {
            // e.preventDefault()
            console.log(item.label)
        },
        toggleNestedMenu: function(i, item) {
            console.log(this.props.dropdown[i].open);
            var p = this.props;
            p.dropdown[i].open = !p.dropdown[i].open;
            this.renderDropDownContent(p);
            //this.setState({items: [] });

        },
        shouldComponentUpdate: function(nextProps, nextState) {
            
            if( this.props.nowShowing !== nextProps.nowShowing) {
                this.renderDropDownContent(nextProps);
                console.log("***** true")
                return true;
            } 
            this.renderDropDownContent(nextProps);
            console.log("***** false")
            return true;
        },
        renderDropDownContent: function(props){
           console.log("***** renderDropDownContent")
            $(document).unbind('click', this.click_document);
            var cx = React.addons.classSet;
            var nowShowing = props.nowShowing;
            var results = props.dropdown;
            var style = {
                visibility: (nowShowing) ? 'visible': 'hidden'
            }
            if(nowShowing) {
                $(document).bind('click', this.click_document);
            }
            //className={cx({show: nowShowing === false})}
            var _dropdown = (
                <div  style={style}>
                    <ul >
                        {
                            results.map(function(item, i){
                                var dropdown;
                                if(item.dropdown) {
                                    var boundClick = this.toggleNestedMenu.bind(this, i, item);
                                    dropdown = (
                                        <li key={i} className="item" onClick={boundClick}>{item.label}
                                            <HorizontalDropDown nowShowing={item.open} dropdown={item.dropdown} />
                                        </li>
                                    );
                                } else {
                                    var boundClick = this.handleClick.bind(this, item);
                                    dropdown = (<li onClick={boundClick} key={i} >{item.label}</li>);
                                }
                                

                                return( dropdown )
                            },this) 
                        }
                    </ul>
                </div>
            );
            React.render(_dropdown, this.portal );
        },
        componentWillUnmount: function(){
            $(document).unbind('click', this.click_document);
            React.unmountComponentAtNode(this.portal);
        }
    });

    var MenuButton = React.createClass({
        render: function(){
            console.log(this.props)
            var isDropdown = "";
            var button = null;
            if(this.props.button.dropdown) {
                button = (<div className="item" onClick={this.props.onClick}>{this.props.button.label}
                            <DropDown onClick={this.props.onClick} nowShowing={this.props.button.open} dropdown={this.props.button.dropdown}/>
                        </div>);
            } else {
                button = (<div className="item" onClick={this.props.onClick}>{this.props.button.label}</div>);
            }
            return button;
        }
    });

    var MenuBar = React.createClass({
        getInitialState: function() {
            return {items: this.props.menuOptions};
        },
        handleClick: function(index, item) {
            console.log(index, item)
            var items = this.state.items.map(function(item, i){
                if(index === i && item.dropdown && !item.open) {
                    item.open = true;
                } 
                // else if(if(index === i && item.dropdown && item.open) {) {

                // }
                else if(item.dropdown) {
                    item.open = false;
                }
                return item;
            })

            this.setState({items: items}, function() {
              if (items.length === 1) {
                console.log(items)
              }
            }.bind(this));
        },
        render: function(){
            return(
                <div>
                    {this.state.items.map(function(item, i) {
                      var boundClick = this.handleClick.bind(this, i, item);
                      return (
                        <MenuButton onClick={boundClick} key={i} button={item} ref={'item' + i} />
                      );
                    }, this)}
                </div>
                );
        }
    });



    React.render(
        <MenuBar menuOptions = {data} />, 
        document.getElementById('menu-section'));
})();