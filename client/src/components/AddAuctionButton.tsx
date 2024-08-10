import { useState } from 'react';
import { FloatButton, Modal, Form, Input, DatePicker, Upload, Button } from 'antd';
import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddAuctionButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const { user }  = useSelector((state: any) => state.user);

  const showModal = () => {
    setIsModalOpen(true);
  };
  // console.log(user?.user?.email);
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

      const auctionObject = {
        title: formValues.title,
        description: formValues.description,
        cropImg: formValues.cropImage,
        startingPrice: formValues.startingPrice,
        currentPrice: formValues.startingPrice,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        status: "active",
        sellers:user?.user?.email, 
      };
      // console.log(auctionObject.sellers)
      console.log("Auction Object:", auctionObject);

      const res = await axios.post("http://localhost:3000/api/createauctions", auctionObject, { withCredentials: true });
      console.log("Auction created successfully:", res.data);
    } catch (error) {
      console.error("Failed to create auction:", error);
    }
  };

  // const handleFileChange = ({ fileList: newFileList }: any) => {
  //   setFileList(newFileList);
  // };

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
            extra="Upload an image of the crop"
          >
            <Upload
              listType="picture"
              showUploadList={true}
              beforeUpload={() => false}
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
