var data = [
    {label: 'Home', link:'/' },
    {label: 'About us', link:'/about-us'},
    {label: 'Menu', open: false, dropdown:[
        {label: 'Menu 1'},
        {label: 'Menu 2'}
    ]},
    {label: 'Jasur', open: false, dropdown:[
        {label: 'Jasur 1'},
        {label: 'Jasur 2'}
    ]}
];

(function () {
    'use strict';

    var DropDown = React.createClass({
        propTypes: {
            dropdown: React.PropTypes.array.isRequired
        },
        render : function() {
            return null;
            // var cx = React.addons.classSet;
            // var nowShowing = this.props.nowShowing;
            // var results = this.props.dropdown;
            // var style = {
            //     display: (nowShowing) ? 'block': 'none'
            // }
            // return(
            //      <div style={style}>
            //         <ul>
            //             {
            //                 results.map(function(item, i){
            //                     return(<li key={i} >{item.label}</li>)
            //                 }) 
            //             }
            //         </ul>
            //     </div>
            // );
        },
        componentDidMount: function() {
            this.portalSection = document.createElement('span');
            this.portal = document.createElement('span');
            this.portal.className = 'dropdown-style-default';
            document.body.appendChild(this.portal);
            this.renderDropDownContent(this.props);
        },
        shouldComponentUpdate: function(nextProps, nextState){
            this.renderDropDownContent(nextProps);
            return true;
        },
        renderDropDownContent: function(props){
            var cx = React.addons.classSet;
            var nowShowing = props.nowShowing;
            var results = props.dropdown;
            var style = {
                display: (nowShowing) ? 'block': 'none'
            }
            //className={cx({show: nowShowing === false})}
            var dropdown = (
                <div style={style}>
                    <ul >
                        {
                            results.map(function(item, i){
                                return(<li key={i} >{item.label}</li>)
                            }) 
                        }
                    </ul>
                </div>
            );
            React.render(dropdown, this.portal );
        },
        componentWillUnmount: function(){
            React.unmountComponentAtNode(this.portal);
        }
    })

    var MenuOption = React.createClass({
        getInitialState: function () {
            return {nowShowing: false};
        },
        handleClick: function(event) {
            this.setState( {nowShowing : !this.state.nowShowing} );
        },
        render: function(){
            var label = this.props.data.label;
            var data = this.props.data;
            var main;
            var button;
            var cx = React.addons.classSet;
            var nowShowing = this.state.nowShowing;

            if(data.hasOwnProperty('dropdown') && Array.isArray( data.dropdown ) ) { 
                var divStyle = {
                    marginLeft: 4
                }
                button = (
                    <a id="grid_views_menu" onClick={this.handleClick} tabIndex="-1" className="dropdown-menu-link">
                        <div className="new-button new-default-button ">
                            <span className="left-button-icon"></span>
                            <span className="new-button-text">{label}</span>
                            <span className="right-button-icon" style={divStyle}>
                                <span data-icon="chevron-down" className="glyph fa fa-chevron-down "></span>
                            </span>
                        </div>
                        <DropDown 
                            dropdown={data.dropdown} 
                            nowShowing={this.state.nowShowing} />
                    </a>

                )
            } else {
                var link = this.props.data.link;
                button = (
                    <a href={link}>
                        <div className='new-button new-default-button list-button ' >
                            <span className='left-button-icon'></span>
                            <span className='new-button-text'>{label}</span>
                            <span className='right-button-icon'></span>
                        </div>
                    </a>
                );
            }


            return(  button  );
        }
    });






    var MenuOptions = React.createClass({
        getInitialState: function () {
            return {nowShowing: false};
        },
        handleClick: function(event) {
            console.log(event)
            this.setState( {nowShowing : !this.state.nowShowing} );
        },
        render: function(){
           
            var data = this.props.data;
            var self = this;

            var buttons = data.map(function(item, index) {
                var button;
                var cx = React.addons.classSet;
                var boundClick = this.handleClick.bind(this, index);
                //var nowShowing = self.props.open;

                if(item.hasOwnProperty('dropdown') && Array.isArray( item.dropdown ) ) { 
                    button = (
                        <a id="grid_views_menu" onClick={ self.handleClick.bind(item) } tabIndex="-1" key={index} className="dropdown-menu-link">
                            <div className="new-button new-default-button ">
                                <span className="left-button-icon"></span>
                                <span className="new-button-text">{item.label}</span>
                                <span className="right-button-icon" style={{ marginLeft: 4}}>
                                    <span data-icon="chevron-down" className="glyph fa fa-chevron-down "></span>
                                </span>
                            </div>
                            <DropDown 
                                dropdown={item.dropdown} 
                                nowShowing={item.open} />
                        </a>
                    );

                } else {
                    button = (
                        <a href={item.link}>
                            <div className='new-button new-default-button list-button ' >
                                <span className='left-button-icon'></span>
                                <span className='new-button-text'>{item.label}</span>
                                <span className='right-button-icon'></span>
                            </div>
                        </a>
                    );
                }
                return(
                    button
                );
            },this);


            return(<div className='view-toggle clearfix'>{buttons}</div>);
        }
    });


    var MenuBar = React.createClass({
        getInitialState: function() {
            return {liked: true};
        },
        componentDidMount:function(){
            console.log('componentDidMount');
        },
        componentDidUpdate: function () {
            console.log('componentDidUpdate');
        },

        handleClick: function(event) {
            console.log(event.target);
        },
        render: function(){
            var results = this.props.menuOptions;
            var self = this;
            return(
                <div className='toolbar main-bar user-view'>
                    <span className='toolbar-section'>
                        {
                             <MenuOptions data={results}  />
                            //results.map(function( item, index ){
                            //   return(  <MenuOption data={item} key={index}  />  );
                            //})
                        }
                    </span>
                </div>
            );
        }
    });


    React.render(
        <MenuBar menuOptions = {data} />, 
        document.getElementById('menu-section'));

})();