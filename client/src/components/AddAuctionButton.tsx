import React, { useState } from 'react';
import { FloatButton, Modal, Form, Input, DatePicker, Upload, Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

const AddAuctionButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    //TODO Handle form submission here
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
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleOk}
        >
          <Form.Item
            name="auctionName"
            label="Auction Name"
            rules={[{ required: true, message: 'Please input the auction name!' }]}
          >
            <Input placeholder="Enter auction name" />
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
            name="date"
            label="Auction Date"
            rules={[{ required: true, message: 'Please select the auction date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="startingBid"
            label="Starting Bid"
            rules={[{ required: true, message: 'Please input the starting bid!' }]}
          >
            <Input type="number" placeholder="Enter starting bid" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAuctionButton;
