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
          <div className='text-xl overflow-scroll'>
            <Title level={2}>Use Cases</Title>
            <h2 id="fire-detection">1. Fire Detection</h2>
            <p><strong>Actor:</strong> Farmer</p>
            <p><strong>Description:</strong> The farmer inputs their geographic location into the system using an interactive map. The system then queries the NASA FIRMS API to retrieve data on recent fire activity and fire risk in the selected area. If the API indicates a high risk of fire, the system sends an alert to the farmer via email or SMS, providing details about the risk level and recommended actions.</p>
            <p><strong>Example Scenario:</strong> A farmer in California inputs their farm location into the system. The system detects that there is an active wildfire near their location and immediately alerts them with information on the fire's proximity and suggested safety measures.</p>

            <br />
            <h2 id="auction">2. Auction</h2>
            <p><strong>Actor:</strong> Farmers and Buyers</p>
            <p><strong>Description:</strong> Farmers can list their agricultural products for auction on the platform. Buyers browse the available listings and place bids on items they wish to purchase. The auction system uses WebSockets to provide real-time updates to all participants, ensuring that bid changes are instantly reflected and that the auction process is smooth and transparent.</p>
            <p><strong>Example Scenario:</strong> A farmer lists a batch of organic tomatoes for auction. Buyers place bids, and as the auction progresses, WebSockets ensure that all participants see the latest bid amounts and remaining time in real-time, facilitating a dynamic bidding environment.</p>
            <br />

            <h2 id="fertilizer-prediction">3. Fertilizer Prediction</h2>
            <p><strong>Actor:</strong> Farmer</p>
            <p><strong>Description:</strong> The farmer inputs various data points about their crops, such as soil type, crop variety, and current growth stage. The system uses a Gaussian Naive Bayes model to analyze this data and predict the optimal type and amount of fertilizer needed. The system provides recommendations to the farmer, including the benefits of using specific fertilizers and application rates.</p>
            <p><strong>Example Scenario:</strong> A farmer provides data about their corn crop's soil conditions and growth stage. The system recommends a balanced fertilizer with specific nutrients, helping the farmer maximize crop yield and health.</p>
            <br />

            <h2 id="additional-use-cases">4. Additional Use Cases</h2>
            <p><strong>4.1 Weather Alerts</strong></p>
            <p><strong>Actor:</strong> Farmer</p>
            <p><strong>Description:</strong> The system integrates with weather APIs to provide farmers with weather alerts and forecasts relevant to their location. This feature helps farmers plan their activities and protect their crops from adverse weather conditions.</p>
            <p><strong>Example Scenario:</strong> A farmer receives a notification about an incoming storm and adjusts their irrigation and crop protection strategies accordingly.</p>
            
            <p><strong>4.2 Crop Health Monitoring</strong></p>
            <p><strong>Actor:</strong> Farmer</p>
            <p><strong>Description:</strong> The system monitors crop health through various inputs like satellite imagery and sensor data. It provides farmers with insights into potential issues such as pest infestations or nutrient deficiencies.</p>
            <p><strong>Example Scenario:</strong> The system detects signs of a pest infestation in a farmer's field and alerts them with recommended actions to mitigate the issue.</p>
          </div>
        );
      case 'doc2':
        return (
          <>
            <Title level={2}>Technical Stack and Integration</Title>
            <h2 id="tech-stack">1. Technical Stack Overview</h2>
            <p><strong>React:</strong> Used for building the user interface, providing a dynamic and responsive experience.</p>
            <p><strong>Tailwind CSS:</strong> Provides a utility-first approach to styling, enabling rapid and consistent UI development.</p>
            <p><strong>Leaflet.js:</strong> Utilized for interactive maps, allowing users to select geographic locations for fire detection and other location-based features.</p>
            <p><strong>Express:</strong> Acts as the backend framework, handling HTTP requests and serving data to the frontend. It interacts with various APIs and manages server-side logic.</p>
            <p><strong>Mongoose:</strong> An ODM (Object Data Modeling) library for MongoDB, used to manage and interact with the database.</p>
            <p><strong>MongoDB:</strong> The database used to store user data, auction listings, and other relevant information.</p>
            <p><strong>Socket.io:</strong> Implements WebSocket communication for real-time updates during auctions, ensuring immediate reflection of bids and auction status.</p>
            <p><strong>Gaussian Naive Bayes:</strong> A machine learning model used for predicting optimal fertilizer requirements based on crop data.</p>

            <h2 id="api-integration">2. API Integration Details</h2>
            <h3 id="nasa-firms">2.1 NASA FIRMS API Integration</h3>
            <p><strong>Purpose:</strong> To retrieve data on fire activity and risk levels based on user-provided geographic locations.</p>
            <p><strong>How It Works:</strong> The frontend sends location data to the backend, which then queries the NASA FIRMS API. The backend processes the API response and determines the fire risk, sending relevant alerts to the user.</p>
            <p><strong>Example Usage:</strong> A farmer enters their location, and the system checks for recent fire activity in that area. If there is an active fire or high risk, the system alerts the farmer with necessary precautions.</p>

            <h3 id="socket-io">2.2 WebSockets (Socket.io) for Auctions</h3>
            <p><strong>Purpose:</strong> To provide real-time communication for auction bidding, ensuring that all participants receive instant updates.</p>
            <p><strong>How It Works:</strong> Socket.io establishes a WebSocket connection between the client and server. The server emits updates on bid changes, which are immediately received and displayed by all connected clients, facilitating a live bidding experience.</p>
            <p><strong>Example Usage:</strong> During an auction, bids are placed and updated in real-time. Socket.io ensures that all participants see the current highest bid and remaining auction time without needing to refresh their browsers.</p>
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
    { key: 'doc1', label: 'Use Cases' },
    { key: 'doc2', label: 'Technical Stack' },
    { key: 'doc3', label: 'Document 3' },
  ];

  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar menuItems={menuItems} onMenuItemClick={handleMenuItemClick} />
      <Layout style={{ padding: '0 5px 0.1px' }}>
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
