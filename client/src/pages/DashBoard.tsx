import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import Sidebar from '../components/docs/Sidebar/Sidebar';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DashBoard: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<string>('doc1');

  const handleMenuItemClick = (key: string) => {
    setSelectedDoc(key);
  };

  const renderDocContent = () => {
    switch (selectedDoc) {
      case 'doc1':
        return (
          <>
            <Title level={2}>Document 1</Title>
            <Paragraph>This is the content of document 1.</Paragraph>
          </>
        );
      case 'doc2':
        return (
          <>
            <Title level={2}>Document 2</Title>
            <Paragraph>This is the content of document 2.</Paragraph>
          </>
        );
      case 'doc3':
        return (
          <>
            <Title level={2}>Document 3</Title>
            <Paragraph>This is the content of document 3.</Paragraph>
          </>
        );
      default:
        return (
          <>
            <Title level={2}>Welcome</Title>
            <Paragraph>Select a document from the sidebar.</Paragraph>
          </>
        );
    }
  };

  const menuItems = [
    { key: 'doc1', label: 'Document 1' },
    { key: 'doc2', label: 'Document 2' },
    { key: 'doc3', label: 'Document 3' },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar menuItems={menuItems} onMenuItemClick={handleMenuItemClick} />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {renderDocContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
