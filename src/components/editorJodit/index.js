import React, { Component } from 'react';
import JoditEditor from "jodit-react";
import Cookies from "js-cookie";
const API = process.env.REACT_APP_API_BASE_URL;

class EditorJodit extends Component {
    config = {
        uploader: {
            url: API + 'fichiers',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            },
            filesVariableName: () => 'fichier',
            isSuccess: function(e) {
        
                if (e) {
                    return true;
                }
            },
            process: function (e) {
                return {
                    baseurl:e.file.url,
                    path: e.file.url,
                    files: [''],
                    isImages: [true]
                };
            }
        }
    }

    render() {
        return (
            <JoditEditor
                value={this.props.defaultValue}
                config={this.config}
                onChange={(text)=>this.props.setValue(text)}
                style={{ height: '200px' }}
            />
        );
    }
}
export default EditorJodit;
