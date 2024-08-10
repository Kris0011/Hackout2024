import { useState } from 'react';
import { FloatButton, Modal, Form, Input, DatePicker, Upload, Button } from 'antd';
import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddAuctionButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [auctionData, setAuctionData] = useState({
    title: '',
    description: '',
    cropImage: null,
    startingPrice: '',
    startDate: null,
    endDate: null,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);

      setAuctionData({
        title: values.title,
        description: values.description,
        cropImage: values.cropImage ? values.cropImage.fileList[0] : null,
        startingPrice: values.startingPrice,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
      });
    

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const onclickauction = async () => {
    await createAuction();
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const createAuction = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auctions', auctionData);
      console.log("Auction created successfully", response.data);
    } catch (error) {
      console.error("Error creating auction:", error);
    }
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
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onSubmitCapture={onclickauction}
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
            getValueFromEvent={({ fileList }) => ({ fileList })}
            extra="Upload an image of the crop"
          >
            <Upload
              beforeUpload={() => false} 
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
            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAuctionButton;
