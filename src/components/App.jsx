import React from "react";
import { Button, Input, Row, Col, Form } from "antd";
import "./App.css";

const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      splitter: ",",
      surround: "'",
      text: "",
    };
    this.onInputchange = this.onInputchange.bind(this);
  }

  onInputchange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSplitterChange = (value) => {
    this.setState({
      splitter: value,
    });
  };

  switchSplitter = () => {
    let list = this.state.text.split(/[ |,|;|\s]+/);
    let surround = this.state.surround;
    if (surround) {
      list.forEach((item, i) => {
        list[i] = surround + item + surround;
      });
    }

    let newText = list.join(this.state.splitter);
    this.setState({ text: newText });
  };

  render() {
    return (
      <Row>
        <Col span={12}>
          <TextArea
            name="text"
            rows={16}
            value={this.state.text}
            onChange={this.onInputchange}
          />
        </Col>
        <Col span={8}>
          <Form {...layout} name="basic">
            <Form.Item label="分隔符">
              <TextArea
                name="splitter"
                defaultValue=","
                rows={2}
                value={this.state.splitter}
                onChange={this.onInputchange}
              />
            </Form.Item>
            <Form.Item label="包裹">
              <Input
                name="surround"
                defaultValue="'"
                value={this.state.surround}
                onChange={this.onInputchange}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={this.switchSplitter}>
                转换
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
