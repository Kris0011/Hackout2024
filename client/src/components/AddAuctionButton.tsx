import { useState } from 'react';
import {  Modal, Form, Input, DatePicker, Upload, Button } from 'antd';
import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const AddAuctionButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const { user } = useSelector((state: any) => state.user);
  

  const showModal = () => {

    if(!user?.user){
      toast.error("Please login to create auction");
      return;
    }

    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await handlecreateauction();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handlecreateauction = async () => {
    try {
      const formValues = form.getFieldsValue();
      const formData = new FormData();

      formData.append('title', formValues.title);
      formData.append('description', formValues.description);
      formData.append('startingPrice', formValues.startingPrice);
      formData.append('currentPrice', formValues.startingPrice);
      formData.append('startDate', formValues.startDate.format('YYYY-MM-DD'));
      formData.append('endDate', formValues.endDate.format('YYYY-MM-DD'));
      formData.append('status', 'active');
      formData.append('sellers', user?.user?.email);

      if (fileList.length > 0) {
        fileList.forEach((file: any) => {
          formData.append('cropImg', file.originFileObj);
        });
      }

      console.log('Auction Object:', formData);

      const res = await axios.post('https://hackout2024-1.onrender.com/api/createauctions', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Auction created successfully:', res.data);
    } catch (error) {
      console.error('Failed to create auction:', error);
    }
  };

  const handleFileChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  return (
    <>
      
      <Button
        type="primary"
        
        size='large'
        
        icon={<PlusCircleFilled />}
        onClick={showModal}
        
      >Sell Crops</Button>

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
          encType="multipart/form-data"
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
            name="cropImg"
            label="Upload Image"
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
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
