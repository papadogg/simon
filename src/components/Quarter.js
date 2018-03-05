import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Quarter extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    active: PropTypes.any,
    className: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };
  onMouseDown = () => {
    const { id, onPress } = this.props;
    onPress(id);
  };
  onMouseUp = () => {
    const { onPress } = this.props;
    onPress(null);
  };
  render() {
    const { active, className } = this.props;
    return (
      <div
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        className={`quarter ${className}`}
        style={{ opacity: active ? 1 : 0.75 }}
      />
    );
  }
}

export default Quarter;
