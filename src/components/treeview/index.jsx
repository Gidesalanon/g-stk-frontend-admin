import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

class Widget extends React.Component {
  state = {
    checked: [],
    expanded: [],
  };
  render() {
    return (
      <CheckboxTree
        nodes={this.props.data}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}
      />
    );
  }
}

export default Widget;
