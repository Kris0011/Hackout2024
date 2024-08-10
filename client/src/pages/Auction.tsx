import { useEffect, useState } from 'react';
import AddAuctionButton from '../components/AddAuctionButton'; 
import { useSocket } from '../context/SocketContext';
import { Card, Col, Row, Typography } from 'antd';
import bgImage from "../assets/Background.jpeg";
import { useSelector } from 'react-redux';
// TODO: Remove dummy data
import Orange from "../assets/oranges.jpg";
import Apple from "../assets/Apple.jpg";
import Tomato from "../assets/tomato.jpg";
import Banana from "../assets/banana.jpg";
import axios from "axios";

const { Title, Text } = Typography;

const dummyAuctions: any = [
  {
    title: 'Farm Fresh Apples',
    description: 'Fresh and juicy apples straight from the farm.',
    cropImage: Orange,
    startingPrice: 50,
    currentPrice: 75,
    startDate: new Date(),
    endDate: new Date(Date.now() + 24*60*60*1000), 
    status: 'active',
  },
  {
    title: 'Organic Tomatoes',
    description: 'Ripe and organic tomatoes for your kitchen.',
    cropImage: Tomato,
    startingPrice: 30,
    currentPrice: 45,
    startDate: new Date(),
    endDate: new Date(Date.now() + 2*24*60*60*1000),
    status: 'inactive',
  },
  {
    title: 'Exotic Bananas',
    description: 'Sweet and exotic bananas from tropical regions.',
    cropImage: Banana,
    startingPrice: 20,
    currentPrice: 35,
    startDate: new Date(),
    endDate: new Date(Date.now() + 5*24*60*60*1000), 
    status: 'completed',
  },
  {
    title: 'Fresh Oranges',
    description: 'Citrusy and fresh oranges, perfect for juices.',
    cropImage: Orange,
    startingPrice: 40,
    currentPrice: 60,
    startDate: new Date(),
    endDate: new Date(Date.now() + 3*24*60*60*1000), 
    status: 'active',
  },
  {
    title: 'Juicy Apples',
    description: 'Delicious apples ready for your table.',
    cropImage: Apple,
    startingPrice: 45,
    currentPrice: 65,
    startDate: new Date(),
    endDate: new Date(Date.now() + 4*24*60*60*1000), 
    status: 'completed',
  }
];

function Auction() {
  const [auctions, setAuctions] = useState([]);
  const loadofauctions = ()=>{
    useEffect(() => {
      axios.get("http://localhost:3000/api/auctions")
        .then((res) => {
          console.log("Hii")
          setAuctions(res.data); 
        })
        .catch((err) => {
          console.error("Failed to fetch auctions:", err);
        });
    }, []);
  }

  loadofauctions();
  const socket = useSocket();
  if (!socket) return <Title level={2}>Loading ...</Title>;

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      socket.off('connect');
    };
  }, [socket]);

  const activeAuctions = dummyAuctions.filter(auction=> auction.status === 'active');
  const inactiveAuctions = dummyAuctions.filter(auction => auction.status === 'inactive');
  const completedAuctions = dummyAuctions.filter(auction=> auction.status === 'completed');

  return (
    <div className="relative p-6 bg-gray-100">
      <img src={bgImage} alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-[-1]" />
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-900">Live Auctions</Title>
      </div>
      <div className="text-center mb-6">
        <AddAuctionButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Title level={2} className="text-2xl font-semibold text-gray-800 mb-4">Active Auctions</Title>
        <Row gutter={16}>
          {activeAuctions.map((auction: any, index: any) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={<img alt="crop" src={auction.cropImage} className='w-full h-48 object-cover' />}
                className="shadow-lg"
              >
                <Card.Meta
                  title={<Text strong className="text-lg">{auction.title}</Text>}
                  description={<Text className="text-gray-600">{auction.description}</Text>}
                />
                <div className="mt-4 text-gray-700">
                  <Text strong>Starting Price:</Text> <Text>${auction.startingPrice}</Text><br />
                  <Text strong>Current Price:</Text> <Text>${auction.currentPrice}</Text><br />
                  <Text strong>Start Date:</Text> <Text>{auction.startDate.toLocaleDateString()}</Text><br />
                  <Text strong>End Date:</Text> <Text>{auction.endDate.toLocaleDateString()}</Text><br />
                  <Text strong>Status:</Text> <Text>{auction.status}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Title level={2} className="text-2xl font-semibold text-gray-800 mb-4">Inactive Auctions</Title>
        <Row gutter={16}>
          {inactiveAuctions.map((auction: any, index: any) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={<img alt="crop" src={auction.cropImage} className='w-full h-48 object-cover' />}
                className="shadow-lg"
              >
                <Card.Meta
                  title={<Text strong className="text-lg">{auction.title}</Text>}
                  description={<Text className="text-gray-600">{auction.description}</Text>}
                />
                <div className="mt-4 text-gray-700">
                  <Text strong>Starting Price:</Text> <Text>${auction.startingPrice}</Text><br />
                  <Text strong>Current Price:</Text> <Text>${auction.currentPrice}</Text><br />
                  <Text strong>Start Date:</Text> <Text>{auction.startDate.toLocaleDateString()}</Text><br />
                  <Text strong>End Date:</Text> <Text>{auction.endDate.toLocaleDateString()}</Text><br />
                  <Text strong>Status:</Text> <Text>{auction.status}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Title level={2} className="text-2xl font-semibold text-gray-800 mb-4">Completed Auctions</Title>
        <Row gutter={16}>
          {completedAuctions.map((auction: any, index: any) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={<img alt="crop" src={auction.cropImage} className='w-full h-48 object-cover' />}
                className="shadow-lg"
              >
                <Card.Meta
                  title={<Text strong className="text-lg">{auction.title}</Text>}
                  description={<Text className="text-gray-600">{auction.description}</Text>}
                />
                <div className="mt-4 text-gray-700">
                  <Text strong>Starting Price:</Text> <Text>${auction.startingPrice}</Text><br />
                  <Text strong>Current Price:</Text> <Text>${auction.currentPrice}</Text><br />
                  <Text strong>Start Date:</Text> <Text>{auction.startDate.toLocaleDateString()}</Text><br />
                  <Text strong>End Date:</Text> <Text>{auction.endDate.toLocaleDateString()}</Text><br />
                  <Text strong>Status:</Text> <Text>{auction.status}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Auction;

