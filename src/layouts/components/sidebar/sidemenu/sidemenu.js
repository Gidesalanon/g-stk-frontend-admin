// Styling
import "../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";

// import external modules
import React, { Component } from "react";

import {
  BarChart2,
  Book,
  Database,
  Image,
  Grid,
  Home,
  Users,
  DownloadCloud,
  Download,
  MessageSquare,
  Settings,
  Shield,
  DollarSign,
  FileText,
  Radio,
  Link2,
  Airplay,
  Link,
  Menu,
  Server,
  PieChart,
  Briefcase,
  Feather,
  TrendingUp,
  Activity,
  Wind,
  Layout,
  Bell,
  Mail,
  Share2,
  Award,
  HelpCircle,
  CloudRain,
} from "react-feather";
import { NavLink } from "react-router-dom";

// import internal(own) modules
import SideMenu from "../sidemenuHelper";
import { Cookies } from "react-cookie";
import classnames from 'classnames';

var md5 = require('md5');
const cookies = new Cookies();

const ROOT = md5('root');
const ADMIN = md5('admin');
const DATA_MANAGER = md5('data_manager');
var userRole = '';

if(cookies.get('userRole')) 
{ 
  userRole = cookies.get('userRole');
}

class SideMenuContent extends Component {
  render() {
    return (
      <SideMenu
        className="sidebar-content quick-link"
        toggleSidebarMenu={this.props.toggleSidebarMenu}
      >
        <SideMenu.MenuSingleItem>
          <NavLink to="/">
            <i className="menu-icon">
              <Home size={18} />
            </i>
            <span className="menu-item-text"> Tableau de bord </span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        
        {/* Actions */}
{/* MANAGER */}
        <SideMenu.MenuMultiItems Icon={<BarChart2 size={18} />} name="Editions de contenus" >
             <NavLink to="products/categories" activeclassname="active">
              <i className="menu-icon">
                <MessageSquare size={18} />
              </i>
              <span className="menu-item-text">categorie_produit</span>
            </NavLink>
{/*
            <NavLink to="/pages" activeclassname="active">
              <i className="menu-icon">
                <FileText size={18} />
              </i>
              <span className="menu-item-text"> Pages </span>
            </NavLink>
            
            <NavLink to="/medias" activeclassname="active">
              <i className="menu-icon">
                <Image size={18} />
              </i>
              <span className="menu-item-text"> Médiathèque </span>
            </NavLink>
            
            <NavLink to="/projects" activeclassname="active">
              <i className="menu-icon">
                <Airplay size={18} />
              </i>
              <span className="menu-item-text"> Projets </span>
            </NavLink>
            
            <NavLink to="/partenaires" activeclassname="active">
              <i className="menu-icon">
                <DollarSign size={18} />
              </i>
              <span className="menu-item-text"> Partenaires </span>
            </NavLink>

          <NavLink to="/weblinks" activeclassname="active">
            <i className="menu-icon">
              <Link2 size={18} />
            </i>
            <span className="menu-item-text"> Liens utiles </span>
          </NavLink>

            <NavLink to="/contacts" activeclassname="active">
              <i className="menu-icon">
                <Link size={18} />
              </i>
              <span className="menu-item-text"> Contacts </span>
            </NavLink> */}
       
        {/* </SideMenu.MenuMultiItems> */}

        {/* Importations */}
        
        {/* <SideMenu.MenuMultiItems Icon={<DownloadCloud size={18} />} name="Importations"> */}
                        
            <NavLink to="/commands" activeclassname="active">
              <i className="menu-icon">
                <FileText size={18} />
              </i>
              <span className="menu-item-text"> Commandes </span>
            </NavLink>

        </SideMenu.MenuMultiItems>
        
        {/* Données de base */}
{/* ADMIN */}
        
        <SideMenu.MenuMultiItems Icon={<Database size={18} />} name="Administration" className={classnames({ 'd-none': !(userRole===ROOT||userRole===ADMIN) })}>
{/*           
          <NavLink to="/menus" activeclassname="active">
            <i className="menu-icon">
              <Menu size={18} />
            </i>
            <span className="menu-item-text"> Menus </span>
          </NavLink>
       */}
          <NavLink to="/categories">
            <i className="menu-icon">
              <PieChart size={18} />
            </i>
            <span className="menu-item-text"> Catégories de produits </span>
          </NavLink>
     
          <NavLink to="/products" activeclassname="active">
              <i className="menu-icon">
                <Briefcase size={18} />
              </i>
              <span className="menu-item-text"> Produits </span>
          </NavLink>
          
        </SideMenu.MenuMultiItems>
        
        {/* Configurations */}
{/* ROOT */}
        
        <SideMenu.MenuMultiItems Icon={<Grid size={18} />} name="Configurations" className={classnames({ 'd-none': userRole!==ROOT })} style={{display:'none !important'}}>
        
          <NavLink to="/users" activeclassname="active">
            <i className="menu-icon">
              <Users size={18} />
            </i>
            <span className="menu-item-text"> Utilisateurs </span>
          </NavLink>

          <NavLink to="/settings" activeclassname="active">
            <i className="menu-icon">
              <Settings size={18} />
            </i>
            <span className="menu-item-text"> Réglages </span>
          </NavLink>

        </SideMenu.MenuMultiItems>

{/* Support */}
        
        <SideMenu.MenuSingleItem>
          <a href="#" activeclassname="active">
            <i className="menu-icon">
              <Radio size={18} />
            </i>
            <span className="menu-item-text"> Statistiques</span>
          </a>
        </SideMenu.MenuSingleItem>

        <SideMenu.MenuSingleItem  Icon={<Book size={18} />} name="Support">
          <NavLink to="/iconographie" activeclassname="active">
            <i className="menu-icon">
              <Feather size={18} />
            </i>
            <span className="menu-item-text"> Iconographie </span>
          </NavLink>
        </SideMenu.MenuSingleItem>
        
        <SideMenu.MenuSingleItem>
          <NavLink to="/guide" activeclassname="active" data-tut="guide">
            <i className="menu-icon">
              <HelpCircle size={18} />
            </i>
            <span className="menu-item-text"> Guide d'utilisation </span>
          </NavLink>
        </SideMenu.MenuSingleItem>

      </SideMenu>
    );
  }
}

export default SideMenuContent;
