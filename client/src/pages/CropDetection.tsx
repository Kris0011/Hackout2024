import  { useState } from 'react';
import { Form, Input, Select, Button, Card, Row, Col, Typography } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import bgImage from "../assets/fertilizer.jpg"

const { Option } = Select;
const { Title } = Typography;

function CropDetection() {
  const [form] = Form.useForm();
  const [fertilizerData, setFertilizerData] = useState(null);

  const onFinish = async (values: any) => {
    // TODO: Handle form submission
    console.log('Form values:', values);
    

    try{
      const res = await axios.post("http://127.0.0.1:5000/fertilizer/predict", values);
      // console.log(res.data.);
      setFertilizerData(res.data.predicted_fertilizer);
      toast.success('Fertilizer suggested successfully, ' + res.data.predicted_fertilizer);

    }
    catch (error){
      console.error("Failed to fetch fertilizer recommendations:", error)
      toast.error("Failed to fetch fertilizer recommendations");
    }

    // message.success('Form submitted successfully!');
  };

  return (
    <section  className="bg-cover h-screen" style={{ backgroundImage: `url(${bgImage})` }}>

   
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' , marginTop : '120px' }}>
      <Title level={2} style={{ textAlign: 'center' , background : 'white' , padding : '10px' , borderRadius : '10px' }}>Fertilizer Suggestion</Title>

      {fertilizerData && (
        <Card style={{ maxWidth: '600px', width: '100%', background : 'yellowgreen' }}>
          <pre>The fertilizer suggested for you is <b>{fertilizerData}</b></pre>
        </Card>
      )}

      <Card
        style={{ 
          maxWidth: '600px', 
          width: '100%', 
          marginBottom: '20px', 
          // backgroundColor: 'rgb(200, 200, 200)' 
          boxShadow : '10 40px 8px 20 rgba(0,0,0,0.2)',
          color : 'white'
        }}
        className=' bg-white-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 '
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ backgroundColor: '', padding: '20px' }} >
          <Row gutter={16}>
            <Col span={12} style={{color : 'white'}}>
              <Form.Item
                name="temperature"
                label="Temperature"
                rules={[{ required: true, message: 'Please input the temperature!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="humidity"
                label="Humidity"
                rules={[{ required: true, message: 'Please input the humidity!' }]}
                style={{color : 'white'}}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="moisture"
                label="Moisture"
                rules={[{ required: true, message: 'Please input the moisture!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="soil_type"
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
                name="crop_type"
                label="Crop Type"
                rules={[{ required: true, message: 'Please select the crop type!' }]}
              >
                <Select placeholder="Select Crop Type">
                  <Option value="Wheat">Wheat</Option>
                  <Option value="Tobacco">Tobacco</Option>
                  <Option value="Rice">Rice</Option>
                  <Option value="Sugarcane">Sugarcane</Option>
                  <Option value="Pulses">Pulses</Option>
                  <Option value="pomegranate">Pomegranate</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nitrogen"
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
                name="potassium"
                label="Potassium"
                rules={[{ required: true, message: 'Please input the potassium value!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phosphorous"
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

     
    </div>
    </section>
  );
}

export default CropDetection;
