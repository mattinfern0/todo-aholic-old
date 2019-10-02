import React from 'react';

/*
Props:
  buttonComponent
  contentComponent
  className
*/
class DropDownContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentVisible: false,
    };
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick() {
    console.log('Click');
    this.setState((prevState) => ({ contentVisible: !prevState.contentVisible }));
  }

  render() {
    const theButton = React.cloneElement(
      this.props.buttonComponent,
      { onClick: this.onBtnClick },
    );
    return (
      <div className={this.props.className}>
        {theButton}
        {this.state.contentVisible && this.props.contentComponent}
      </div>
    );
  }
}

export default DropDownContainer;
