import { useEffect, useState } from "react";
import AddAuctionButton from "../components/AddAuctionButton";
import { useSocket } from "../context/SocketContext";
import { Card, Col, Row, Typography } from "antd";
import bgImage from "../assets/Background.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// TODO: Remove dummy data

import axios from "axios";
import * as io from "socket.io-client";
import AuctionRoom from "./AuctionRoom";

const { Title, Text } = Typography;

interface Auction {
  title: string;
  description: string;
  cropImage: string;
  startingPrice: number;
  currentPrice: number;
  startDate: string;
  endDate: string;
  status: string;
  seller: string;
}

function Auction() {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const { user } = useSelector((state: any) => state.user);
  const socket = io.connect("http://localhost:3000");

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const fetchAuctions = async () => {
    try {
      const res = await axios.get<Auction[]>(
        "http://localhost:3000/api/auctions"
      );
      setAuctions(res.data.auctions);
      console.log("Auctions fetched successfully:", res.data.auctions);
    } catch (error) {
      console.error("Failed to fetch auctions:", error);
    }
  };

  const getAuctionRoom = (data: any) => {
    try {
      dispatch({
        type: "SET_AUCTION",
        payload: data,
      });
      console.log("Joining Auction Room");
      socket.emit("join-room", {
        auctionId: data._id,
        user: user.user,
      });
      navigate(`/market/${data._id}`);
      

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const now = new Date();

  // Filter auctions based on their status
  const activeAuctions = Array.isArray(auctions)
    ? auctions.filter(
        (auction) =>
          new Date(auction.startDate) <= now && new Date(auction.endDate) > now
      )
    : [];

  const inactiveAuctions = Array.isArray(auctions)
    ? auctions.filter((auction) => new Date(auction.startDate) > now)
    : [];

  const completedAuctions = Array.isArray(auctions)
    ? auctions.filter((auction) => new Date(auction.endDate) <= now)
    : [];

  return (
    <div className="relative p-6 bg-gray-100">
      <img
        src={bgImage}
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-900">
          Live Marketplace
        </Title>
      </div>
      <div className="text-center mb-6">
        <AddAuctionButton />
      </div>

      <div className="">
        <Title level={2} className="text-2xl font-semibold text-gray-800 mb-4">
          Active Auctions
        </Title>
        <Row gutter={16}>
          {activeAuctions.map((auction: any, index: any) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt="crop"
                    src={auction.cropImage}
                    className="w-full h-48 object-cover"
                  />
                }
                className="shadow-lg"
                onClick={() => {
                  getAuctionRoom(auction);
                }}
              >
                <Card.Meta
                  title={
                    <Text strong className="text-lg">
                      {auction.title}
                    </Text>
                  }
                  description={
                    <Text className="text-gray-600">{auction.description}</Text>
                  }
                />
                <div className="mt-4 text-gray-700">
                  <Text strong>Starting Price:</Text>{" "}
                  <Text>${auction.startingPrice}</Text>
                  <br />
                  <Text strong>Current Price:</Text>{" "}
                  <Text>${auction.currentPrice}</Text>
                  <br />
                  <Text strong>Start Date:</Text>{" "}
                  <Text>
                    {new Date(auction.startDate).toLocaleDateString()}
                  </Text>
                  <br />
                  <Text strong>End Date:</Text>{" "}
                  <Text>{new Date(auction.endDate).toLocaleDateString()}</Text>
                  <br />
                  {/* <Text strong>Status:</Text> <Text>{auction.status}</Text> */}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="">
        <Title level={2} className="text-2xl font-semibold text-gray-800 mb-4">
          Inactive Auctions
        </Title>
        <Row gutter={16}>
          {inactiveAuctions.map((auction: any, index: any) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt="crop"
                    src={auction.cropImage}
                    className="w-full h-48 object-cover"
                  />
                }
                className="shadow-lg"
              >
                <Card.Meta
                  title={
                    <Text strong className="text-lg">
                      {auction.title}
                    </Text>
                  }
                  description={
                    <Text className="text-gray-600">{auction.description}</Text>
                  }
                />
                <div className="mt-4 text-gray-700">
                  <Text strong>Starting Price:</Text>{" "}
                  <Text>${auction.startingPrice}</Text>
                  <br />
                  <Text strong>Current Price:</Text>{" "}
                  <Text>${auction.currentPrice}</Text>
                  <br />
                  <Text strong>Start Date:</Text>{" "}
                  <Text>
                    {new Date(auction.startDate).toLocaleDateString()}
                  </Text>
                  <br />
                  <Text strong>End Date:</Text>{" "}
                  <Text>{new Date(auction.endDate).toLocaleDateString()}</Text>
                  <br />
                  {/* <Text strong>Status:</Text> <Text>{auction.status}</Text> */}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="">
        <Title level={2} className="text-2xl font-semibold text-gray-800 mb-4">
          Completed Auctions
        </Title>
        <Row gutter={16}>
          {completedAuctions.map((auction: any, index: any) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt="crop"
                    src={auction.cropImage}
                    className="w-full h-48 object-cover"
                  />
                }
                className="shadow-lg"
              >
                <Card.Meta
                  title={
                    <Text strong className="text-lg">
                      {auction.title}
                    </Text>
                  }
                  description={
                    <Text className="text-gray-600">{auction.description}</Text>
                  }
                />
                <div className="mt-4 text-gray-700">
                  <Text strong>Starting Price:</Text>{" "}
                  <Text>${auction.startingPrice}</Text>
                  <br />
                  <Text strong>Current Price:</Text>{" "}
                  <Text>${auction.currentPrice}</Text>
                  <br />
                  <Text strong>Start Date:</Text>{" "}
                  <Text>
                    {new Date(auction.startDate).toLocaleDateString()}
                  </Text>
                  <br />
                  <Text strong>End Date:</Text>{" "}
                  <Text>{new Date(auction.endDate).toLocaleDateString()}</Text>
                  <br />
                  {/* <Text strong>Status:</Text> <Text>{auction.status}</Text> */}
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
