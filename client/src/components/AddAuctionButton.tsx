import React, { useState } from 'react';
import { FloatButton, Modal, Form, Input, DatePicker, Upload, Button, Select } from 'antd';
import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';

const { Option } = Select;

const AddAuctionButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      // TODO: Handle form submission here
      setIsModalVisible(false);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <FloatButton
        type="primary"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={showModal}
      />

      <Modal
        title="Create Auction"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="title"
            label="Auction Title"
            rules={[{ required: true, message: 'Please input the auction title!' }]}
          >
            <Input placeholder="Enter auction title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the auction description!' }]}
          >
            <Input.TextArea placeholder="Enter auction description" rows={4} />
          </Form.Item>

          <Form.Item
            name="cropImage"
            label="Crop Image"
            valuePropName="fileList"
            getValueFromEvent={({ file }) => file}
            extra="Upload an image of the crop"
          >
            <Upload 
              action="/upload" 
              listType="picture"
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="startingPrice"
            label="Starting Price"
            rules={[{ required: true, message: 'Please input the starting price!' }]}
          >
            <Input type="number" placeholder="Enter starting price" />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAuctionButton;
