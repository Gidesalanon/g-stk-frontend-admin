// import external modules
import React, { Component } from "react";
import { Link  } from "react-router-dom";
import {
   Collapse,
   Navbar,
   Nav,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from "reactstrap";
import {
   // Moon,
   MessageSquare,
   Menu,
   MoreVertical,
   User,
   LogOut,
   Image,
   Server,
   Bell,
   Mail,
   ExternalLink
} from "react-feather";
import { getEntity } from '../../../service/api';
import userImage from "../../../assets/img/user_profil.png";
const request = getEntity('auth/me');

class ThemeNavbar extends Component {
   
   componentWillMount(){
   
      request.then((e) => {
         this.setState({ isLogin: true, username: e.data.data?.username });
      }).catch(function (error) { console.warn(error,'from head'); });
          
   }

   handleClick = e => {
      this.props.toggleSidebarMenu("open");
   };
   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false
      };
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
   
      return (
      <>
         <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
            <div data-tut="quick-link" className="container-fluid px-0">
               <div className="navbar-header">
                  <Menu
                     size={14}
                     className="navbar-toggle d-lg-none float-left"
                     onClick={this.handleClick.bind(this)}
                     data-toggle="collapse"
                  />
{/*                   
                  <div className="d-flex">
                     <Link to="/news" title="Actualités/Publications" className="has-icon-left ml-1">
                        <span class="round form-control">
                           <MessageSquare size={20} className="pb-0"/>
                           {'   '} Actualités
                        </span>
                     </Link>
                     
                     <Link to="/albums" title="Albums photos" className="has-icon-left ml-1">
                        <span class="round form-control">
                           <Image size={20} className="pb-0"/>
                           {'   '} Albums
                        </span>
                     </Link>
                     
                     <Link to="/services" title="Services" className="has-icon-left ml-1">
                        <span class="round form-control">
                           <Server size={20} className="pb-0"/>
                           {'   '} Services
                        </span>
                     </Link>
                  </div>
                   */}
                  <MoreVertical
                     className="mt-1 navbar-toggler black no-border float-right"
                     size={50}
                     onClick={this.toggle}
                  />
               </div>

               <div className="navbar-container">
                  <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto float-right d-flex" navbar>
                        <div className="d-none d-md-block">
                           <a href={process.env.REACT_APP_PUBLIC_SITE} title="Site web" target="_blanc" className="pt-1">
                              <ExternalLink size={20} color="#fff" className="m-2 cursor-pointer"/>
                           </a>
                           <Link to="/messages" title="Messages" className="pt-1">
                              <Mail size={20} color="#fff" className="m-2 cursor-pointer"/>
                           </Link>
                           <Link to="/alerts" title="Alertes" className="pt-1">
                              <Bell size={20} color="#fff" className="m-2 cursor-pointer"/>
                           </Link>
                        </div>

                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <img src={userImage} alt="logged-in-user" className="rounded-circle width-35" />
                              {this.state.username&&<div className="user-avatar"> {String(this.state.username).charAt(0)} </div>}
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <span className="font-small-3">
                                    <span className="text-muted">{this.state.username}</span>
                                 </span>
                              </DropdownItem>
                              <DropdownItem divider />

                              <Link to="/profil" className="p-0">
                                 <DropdownItem>
                                    <User size={16} className="mr-1" /> Mon Profil
                                 </DropdownItem>
                              </Link>
                              <Link to="/logout" className="p-0">
                                 <DropdownItem>
                                    <LogOut size={16} className="mr-1" /> Déconnexion
                                 </DropdownItem>
                              </Link>
                           </DropdownMenu>

                        </UncontrolledDropdown>
                     </Nav>
                  </Collapse>
               </div>
            </div>
         </Navbar>
      </>
      );
   }
}

export default ThemeNavbar;
