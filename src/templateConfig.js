// APEX React Template Config File
//-------------------------------

// You can customize the theme with the help of this file

// Change menu background from here, you can place new image also and use it.
import sidebarBGImage from "./assets/img/sidebar-bg/01.jpg";
import {Cookies} from "react-cookie";
    
require('dotenv').config()
const cookies = new Cookies();
var TemplateColor = 'layout-light';
if(cookies.get('TemplateColor')) 
{ 
   TemplateColor = 'layout-' + cookies.get('TemplateColor') ;
}
else if(process.env.REACT_APP_DEFAULT_LAYOUT)
{ 
   TemplateColor = 'layout-' + process.env.REACT_APP_DEFAULT_LAYOUT ;
}

//Template config options
var templateConfig = {
   layoutColor: TemplateColor, // Options: layout-dark, layout-light - Set layout-dark for dark mode and layout-light for light.
   // fixedNavbar: true, // Options: true, false - Set true for fixed navbar.
   sidebar: {
      collapsed: false, // Options: true, false | Set false to keep the sidebar open / set it to true for collapsed sidebar by default
      size: 'sidebar-lg', // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
      backgroundColor: "man-of-steel",
      // Gradient Options: 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love'
      // Solid Options: 'black', 'white', 'blue', 'purple', 'red', 'orange', 'navy-blue'
      backgroundImage: true, // Options: true, false | Set true to show background image
      backgroundImageURL: sidebarBGImage // Change image from sidebarBGImage import
   },
   buyNow: false, // Options: true, false - To show floating buy now button.
};


export default templateConfig;