// import external modules
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ToggleLeft, ToggleRight, X } from "react-feather";
// import internal(own) modules
import { FoldedContentConsumer } from "../../../../utility/context/toggleContentContext";
import Logo from "../../../../assets/img/logo.png";
import LogoSM from "../../../../assets/img/logo-sm.png";

class SidebarHeader extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu("close");
   };

   render() {
      return (
         <FoldedContentConsumer>
            {context => (
               <div className="sidebar-header">
                  <div data-tut="logo" className="logo clearfix">
                     <NavLink to="/" className="logo-text float-left">
                        <div className="logo-img">
                           <img className="logo-pc" src={Logo} alt="logo" />
						   <img className="logo-sm" src={LogoSM} alt="logo" />
                        </div>
                     </NavLink>

                     <span className="nav-toggle d-none d-sm-none d-md-none d-lg-block">
                        {context.foldedContent ? (
                           <ToggleLeft onClick={context.makeNormalContent} className="toggle-icon" size={16} />
                        ) : (
                           <ToggleRight onClick={context.makeFullContent} className="toggle-icon" size={16} />
                        )}
                     </span>
                     <span href="" className="nav-close d-block d-md-block d-lg-none d-xl-none" id="sidebarClose">
                        <X onClick={this.handleClick} size={20} />
                     </span>
                  </div>
               </div>
            )}
         </FoldedContentConsumer>
      );
   }
}

export default SidebarHeader;
