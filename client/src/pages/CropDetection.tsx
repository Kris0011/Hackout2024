import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, Row, Col, Typography, message } from 'antd';

const { Option } = Select;
const { Title } = Typography;

function CropDetection() {
  const [form] = Form.useForm();
  const [fertilizerData, setFertilizerData] = useState(null);

  const onFinish = (values: any) => {
    // TODO: Handle form submission
    console.log('Form values:', values);
    message.success('Form submitted successfully!');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Crop Detection Form</Title>
      <Card
        title="Crop Detection Form"
        style={{ 
          maxWidth: '600px', 
          width: '100%', 
          marginBottom: '20px', 
          backgroundColor: 'rgb(200, 200, 200)' 
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ backgroundColor: '#ffffff', padding: '20px' }} // Ensure form background color contrasts with card
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Temperature"
                label="Temperature"
                rules={[{ required: true, message: 'Please input the temperature!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Humidity"
                label="Humidity"
                rules={[{ required: true, message: 'Please input the humidity!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Moisture"
                label="Moisture"
                rules={[{ required: true, message: 'Please input the moisture!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Soil_Type"
                label="Soil Type"
                rules={[{ required: true, message: 'Please select the soil type!' }]}
              >
                <Select placeholder="Select Soil Type">
                  <Option value="Clayey">Clay</Option>
                  <Option value="Loamy">Loamy</Option>
                  <Option value="Red">Red</Option>
                  <Option value="Sandy">Sandy</Option>
                  <Option value="Black">Black</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Crop_Type"
                label="Crop Type"
                rules={[{ required: true, message: 'Please select the crop type!' }]}
              >
                <Select placeholder="Select Crop Type">
                  <Option value="Wheat">Wheat</Option>
                  <Option value="Tobacco">Tobacco</Option>
                  <Option value="Rice">Rice</Option>
                  <Option value="Sugarcane">Sugarcane</Option>
                  <Option value="Pulses">Pulses</Option>
                  <Option value="Pomegranate">Pomegranate</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Nitrogen"
                label="Nitrogen"
                rules={[{ required: true, message: 'Please input the nitrogen value!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Potassium"
                label="Potassium"
                rules={[{ required: true, message: 'Please input the potassium value!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Phosphorous"
                label="Phosphorous"
                rules={[{ required: true, message: 'Please input the phosphorous value!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {fertilizerData && (
        <Card title="Fertilizer Recommendations" style={{ maxWidth: '600px', width: '100%' }}>
          <pre>{JSON.stringify(fertilizerData, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
}

export default CropDetection;
