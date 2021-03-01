import React from 'react';
import ContentEditable from 'react-contenteditable';

class CustomEdit extends React.Component {
  constructor() {
    super()
    this.contentEditable = React.createRef();
    this.state = { html: "" };
  };

  handleChange = evt => {
    this.setState({ html: evt.target.value });
  };

  componentDidMount() {
    this.setState({ html: this.props.title })
  }
  render = () => {
    return <ContentEditable
      innerRef={this.contentEditable}
      html={this.state.html} // innerHTML of the editable div
      disabled={this.state.disabled}       // use true to disable editing
      onChange={this.handleChange} // handle innerHTML change
      onBlur={this.props.updateTitle(this.state.html, this.props.id)}
    />
  };
};

export default CustomEdit;