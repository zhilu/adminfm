import React from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class SeachForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { roleList: [] }
    this.handleQuery= this.handleQuery.bind(this);
    this.handleReset=this.handleReset.bind(this);
  }

   render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form inline >
          <FormItem label="工号：">
            <Input  {...getFieldProps('number', { initialValue: ''})} />
          </FormItem>
          <FormItem label="真实姓名：">
            <Input  {...getFieldProps('name', { initialValue: ''})} />
          </FormItem>
          <FormItem label="状态：">
             <Select style={{ width: 100 }} {...getFieldProps('status', { initialValue: ''})}>
               <Option value="0">正常</Option>
               <Option value="1">锁定</Option> 
             </Select>
          </FormItem> 
          <FormItem label="角色：">
             <Select style={{ width: 100 }} placeholder="请选择角色"  {...getFieldProps('roleId', { initialValue: ''})}>
                {this.state.roleList}    
            </Select> 
          </FormItem>
          <FormItem><Button type="primary" onClick={this.handleQuery}>查询</Button></FormItem>
          <FormItem><Button type="reset" onClick={this.handleReset}>重置</Button></FormItem> 
      </Form>
    );
  }

  handleQuery() {
    var params = this.props.form.getFieldsValue();
    this.props.passParams({
      user : JSON.stringify(params),
      pageSize: 10,
      current: 1,
    });
  }

  handleReset() {
    this.props.form.resetFields();
  }
}




SeachForm = createForm()(SeachForm);
export default SeachForm;