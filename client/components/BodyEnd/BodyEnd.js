import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class BodyEnd extends PureComponent {
  componentWillReceiveProps(NextProps) {
    if (this.rendered && !NextProps.show) this.removeFromDom();

    if (!this.rendered && NextProps.show) this.renderToDom();

    if (this.rendered) ReactDOM.render(NextProps.children, this.popup);
  }

  removeFromDom() {
    if (this.props.animationOnUnMount) {
      return setTimeout(() => this.removeNode(), 300);
    }

    return this.removeNode();
  }

  removeNode() {
    this.rendered = false;
    ReactDOM.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }

  renderToDom() {
    this.rendered = true;
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    ReactDOM.render(this.props.children, this.popup);
  }

  render() {
    return null;
  }
}

BodyEnd.defaultProps = {
  animationOnUnMount: false
};

BodyEnd.propTypes = {
  children: PropTypes.node.isRequired,
  animationOnUnMount: PropTypes.bool
};

export default BodyEnd;
