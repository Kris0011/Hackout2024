import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import Sidebar from '../components/docs/Sidebar/Sidebar';
import API from "../assets/API_working.jpeg";
import { useTranslation } from 'react-i18next';
import MyImage from "../assets/Bayes.jpeg";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DashBoard: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<string>('doc1');
  const {t} = useTranslation();

  const handleMenuItemClick = (key: string) => {
    setSelectedDoc(key);
  };

  const renderDocContent = () => {
    switch (selectedDoc) {
      case 'doc1':
        return (
          <div className=''>
           <Title level={2}>{t("Use Cases")}</Title>
            <h2 id="fire-detection">{t("1. Fire Detection")}</h2>
            <p><strong>{t("Actor")}:</strong> {t("Farmer")}</p>
            <p><strong>{t("Description")}:</strong> {t("The farmer inputs their geographic location into the system using an interactive map. The system then queries the NASA FIRMS API to retrieve data on recent fire activity and fire risk in the selected area. If the API indicates a high risk of fire, the system sends an alert to the farmer via email or SMS, providing details about the risk level and recommended actions.")}</p>
            <p><strong>{t("Example Scenario")}:</strong> {t("A farmer in California inputs their farm location into the system. The system detects that there is an active wildfire near their location and immediately alerts them with information on the fire's proximity and suggested safety measures.")}</p>

            <h2 id="auction">{t("2. Auction")}</h2>
            <p><strong>{t("Actor")}:</strong> {t("Farmers and Buyers")}</p>
            <p><strong>{t("Description")}:</strong> {t("Farmers can list their agricultural products for auction on the platform. Buyers browse the available listings and place bids on items they wish to purchase. The auction system uses WebSockets to provide real-time updates to all participants, ensuring that bid changes are instantly reflected and that the auction process is smooth and transparent.")}</p>
            <p><strong>{t("Example Scenario")}:</strong> {t("A farmer lists a batch of organic tomatoes for auction. Buyers place bids, and as the auction progresses, WebSockets ensure that all participants see the latest bid amounts and remaining time in real-time, facilitating a dynamic bidding environment.")}</p>

            <h2 id="fertilizer-prediction">{t("3. Fertilizer Prediction")}</h2>
            <p><strong>{t("Actor")}:</strong> {t("Farmer")}</p>
            <p><strong>{t("Description")}:</strong> {t("The farmer inputs various data points about their crops, such as soil type, crop variety, and current growth stage. The system uses a Gaussian Naive Bayes model to analyze this data and predict the optimal type and amount of fertilizer needed. The system provides recommendations to the farmer, including the benefits of using specific fertilizers and application rates.")}</p>
            <p><strong>{t("Example Scenario")}:</strong> {t("A farmer provides data about their corn crop's soil conditions and growth stage. The system recommends a balanced fertilizer with specific nutrients, helping the farmer maximize crop yield and health.")}</p>

            <h2 id="additional-use-cases">{t("4. Additional Use Cases")}</h2>
            <p><strong>{t("4.1 Weather Alerts")}</strong></p>
            <p><strong>{t("Actor")}:</strong> {t("Farmer")}</p>
            <p><strong>{t("Description")}:</strong> {t("The system integrates with weather APIs to provide farmers with weather alerts and forecasts relevant to their location. This feature helps farmers plan their activities and protect their crops from adverse weather conditions.")}</p>
            <p><strong>{t("Example Scenario")}:</strong> {t("A farmer receives a notification about an incoming storm and adjusts their irrigation and crop protection strategies accordingly.")}</p>
            
            <p><strong>{t("4.2 Crop Health Monitoring")}</strong></p>
            <p><strong>{t("Actor")}:</strong> {t("Farmer")}</p>
            <p><strong>{t("Description")}:</strong> {t("The system monitors crop health through various inputs like satellite imagery and sensor data. It provides farmers with insights into potential issues such as pest infestations or nutrient deficiencies.")}</p>
            <p><strong>{t("Example Scenario")}:</strong> {t("The system detects signs of a pest infestation in a farmer's field and alerts them with recommended actions to mitigate the issue.")}</p>
          </div>
        );
      case 'doc2':
        return (
          <div>
            <Title level={2}>{t("Technical Stack and Integration")}</Title>
            <h2 id="tech-stack">{t("1. Technical Stack Overview")}</h2>
            <p><strong>{t("React")}:</strong> {t("Used for building the user interface, providing a dynamic and responsive experience.")}</p>
            <p><strong>{t("Tailwind CSS")}:</strong> {t("Provides a utility-first approach to styling, enabling rapid and consistent UI development.")}</p>
            <p><strong>{t("Leaflet.js")}:</strong> {t("Utilized for interactive maps, allowing users to select geographic locations for fire detection and other location-based features.")}</p>
            <p><strong>{t("Express")}:</strong> {t("Acts as the backend framework, handling HTTP requests and serving data to the frontend. It interacts with various APIs and manages server-side logic.")}</p>
            <p><strong>{t("Mongoose")}:</strong> {t("An ODM (Object Data Modeling) library for MongoDB, used to manage and interact with the database.")}</p>
            <p><strong>{t("MongoDB")}:</strong> {t("The database used to store user data, auction listings, and other relevant information.")}</p>
            <p><strong>{t("Socket.io")}:</strong> {t("Implements WebSocket communication for real-time updates during auctions, ensuring immediate reflection of bids and auction status.")}</p>
            <p><strong>{t("Gaussian Naive Bayes")}:</strong> {t("A machine learning model used for predicting optimal fertilizer requirements based on crop data.")}</p>
            <img src={MyImage} className='w-[600px] mx-auto' alt={t("API working")} />
            <h2 id="api-integration">{t("2. API Integration Details")}</h2>
            <h3 id="nasa-firms">{t("2.1 NASA FIRMS API Integration")}</h3>
            <p><strong>{t("Purpose")}:</strong> {t("To retrieve data on fire activity and risk levels based on user-provided geographic locations.")}</p>
            <p><strong>{t("How It Works")}:</strong> {t("The frontend sends location data to the backend, which then queries the NASA FIRMS API. The backend processes the API response and determines the fire risk, sending relevant alerts to the user.")}</p>
            <p><strong>{t("Example Usage")}:</strong> {t("A farmer enters their location, and the system checks for recent fire activity in that area. If there is an active fire or high risk, the system alerts the farmer with necessary precautions.")}</p>

            <h3 id="socket-io">{t("2.2 WebSockets (Socket.io) for Auctions")}</h3>
            <p><strong>{t("Purpose")}:</strong> {t("To provide real-time communication for auction bidding, ensuring that all participants receive instant updates.")}</p>
            <p><strong>{t("How It Works")}:</strong> {t("Socket.io establishes a WebSocket connection between the client and server. The server emits updates on bid changes, which are immediately received and displayed by all connected clients, facilitating a live bidding experience.")}</p>
            <p><strong>{t("Example Usage")}:</strong> {t("During an auction, bids are placed and updated in real-time. Socket.io ensures that all participants see the current highest bid and remaining auction time without needing to refresh their browsers.")}</p>
          </div>
        );
      case 'doc3':
        return (
          <div>
            <Title level={2} className="text-2xl">{t("Technical Stack (Part 2)")} & {t("API Integration")}</Title>
            <h2 id="socket-io" className="text-xl">{t("WebSockets (Socket.io) for Auctions")}</h2>
            <p><strong>{t("Purpose")}:</strong> {t("To provide real-time communication for auction bidding, ensuring that all participants receive instant updates.")}</p>
            <p><strong>{t("How It Works")}:</strong> {t("Socket.io establishes a WebSocket connection between the client and server. The server emits updates on bid changes, which are immediately received and displayed by all connected clients, facilitating a live bidding experience.")}</p>
            <p><strong>{t("Example Usage")}:</strong> {t("During an auction, bids are placed and updated in real-time. Socket.io ensures that all participants see the current highest bid and remaining auction time without needing to refresh their browsers.")}</p>
            <h2 id="nasa-firms" className="text-xl">{t("NASA FIRMS API Integration")}</h2>
            <p><strong>{t("Purpose")}:</strong> {t("To retrieve data on fire activity and risk levels based on user-provided geographic locations.")}</p>
            <p><strong>{t("How It Works")}:</strong> {t("The frontend sends location data to the backend, which then queries the NASA FIRMS API. The backend processes the API response and determines the fire risk, sending relevant alerts to the user.")}</p>
            <img src={API}  className='w-[600px] mx-auto' alt={t("API working")} />
            <p><strong>{t("Example Usage")}:</strong> {t("A farmer enters their location, and the system checks for recent fire activity in that area. If there is an active fire or high risk, the system alerts the farmer with necessary precautions.")}</p>

            <h2 id="future-enhancements" className="text-xl">{t("Future Enhancements")}</h2>
            <p><strong>{t("4.1 Enhanced Data Analytics")}:</strong> {t("Plans to integrate more advanced data analytics tools to provide deeper insights into user behavior and system performance.")}</p>
            <p><strong>{t("4.2 Improved Machine Learning Models")}:</strong> {t("Exploring the use of more sophisticated machine learning models to enhance the accuracy of fertilizer predictions and other recommendations.")}</p>
            <p><strong>{t("4.3 Expanded API Integrations")}:</strong> {t("Looking to integrate additional third-party APIs for more comprehensive data coverage and feature expansion.")}</p>
            <p><strong>{t("4.4 User Feedback Integration")}:</strong> {t("Incorporating user feedback mechanisms to continuously improve the system based on real-world usage and requirements.")}</p>

          </div>
        );
      default:
        return (
          <div>
            <Title level={2} className="text-2xl">Welcome</Title>
            <Paragraph>Select a document from the sidebar.</Paragraph>
          </div>
        );
    }
  };

  const menuItems = [
    { key: 'doc1', label: 'Document 1' },
    { key: 'doc2', label: 'Document 2' },
    { key: 'doc3', label: 'Document 3' },
  ];

  return (
    <Layout className="h-full">
      <Sidebar menuItems={menuItems} onMenuItemClick={handleMenuItemClick} />
      <Layout className="p-6">
        <Content
          className="p-6 bg-white text-gray-900 text-lg" 
        >
          {renderDocContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;