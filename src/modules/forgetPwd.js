import React from 'react';
import {
    Form,
    Input,
    Modal,
    Row,
    Col
} from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;

class AddWin extends React.Component {

  constructor(props){
    super(props);

    this.state= {status: {}, formData: {}};
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleOk(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

    })
  }

  handleCancel() {
    this.props.form.resetFields();
    this.props.hideModal();
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    var props = this.props;
    var modalBtns = [
      <button key="button" className="ant-btn ant-btn-primary" onClick={this.handleOk}>确定</button>,
      <button key="back" className="ant-btn" onClick={this.handleCancel}>取消</button>
    ];
    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 12},
    };

    return (
      <Modal title={props.title} visible={props.visible} onCancel={this.handleCancel} width="500" footer={modalBtns}
             maskClosable={false}>
        <Form horizontal form={this.props.form}>
          <FormItem>
            {getFieldDecorator('id')(<Input  type="hidden" autoComplete="off"/>)}
          </FormItem>
          <Row>
            <Col span="24">
              <FormItem  {...formItemLayout} label="旧密码：">
                {getFieldDecorator('oldPassword', {rules: [{required: true, message: '必填'}]})(<Input type="password"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem  {...formItemLayout} label="新密码：">
                {getFieldDecorator('newPassword', {
                  rules: [{
                    required: true,
                    message: '必填'
                  }, {validator: this.validatePwd}]
                })(<Input type="password"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem  {...formItemLayout} label="确认密码：">
                {getFieldDecorator('newPassword2', {
                  rules: [{
                    required: true,
                    message: '必填'
                  }, {validator: this.validateAgainPwd}]
                })(<Input  type="password"/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
AddWin = createForm()(AddWin);
export default AddWin;
