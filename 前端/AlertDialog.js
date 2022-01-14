import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
export default class AlertDialog extends React.Component {
  /**
   * @param { string } title
   * @param { string } msg
   * @param { function } acceptFunction
   * @param { function } cancelFunction
   * @param { boolean } showCancelBtn
   */
  static show = (title, msg, acceptFunction = null, cancelFunction = null, showCancelBtn = true) => {}
  constructor(props){
    super(props);
    this.state = {
      showMsgModal: false,
      modalTitle: "",
      modalMsg: "",
      acceptFunc: null,
      cancelFunc: null,
      showCancel: true,
    };

    AlertDialog.show = this.showModal.bind(this);
  }

  render(){
    return (
      <Modal show={this.state.showMsgModal} onHide={() => {
        this.setState({ showMsgModal: false });
        if(this.state.cancelFunc != null){
          this.state.cancelFunc();
        }}} centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            typeof this.state.modalMsg !== 'string' ?
            this.state.modalMsg
            : <p dangerouslySetInnerHTML={{ __html: this.state.modalMsg }}></p>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            this.setState({ showMsgModal: false });
            if(this.state.acceptFunc != null)
              this.state.acceptFunc();
          }}><FormattedMessage id="global.ok" /></Button>
          {/* {
            this.state.showCancel ?
              <Button variant="primary" onClick={() => {
                this.setState({ showMsgModal: false });
                if(this.state.cancelFunc != null){
                  this.state.cancelFunc();
                }
              }}><FormattedMessage id="global.cancel" /></Button>
              : null
          } */}
        </Modal.Footer>
      </Modal>
    );
  }

  showModal(title, msg, acceptFunction = null, cancelFunction = null, showCancelBtn = true){
    this.setState({
      modalTitle: title,
      modalMsg: msg,
      showMsgModal: true,
      acceptFunc: acceptFunction,
      cancelFunc: cancelFunction,
      showCancel: showCancelBtn,
    });
  }
}