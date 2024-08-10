import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as io from "socket.io-client";
import MyTimer from "../components/MyTimer";
import { use } from "i18next";

export default function AuctionRoom(props: any) {
  const { id } = useParams();
  const [expireTime, setExpireTime] = React.useState(null);
  const { user } = useSelector((state: any) => state.user);
  // const { auction } = useSelector((state: any) => state.auction);
  const [bids, setBids] = useState<{ bidAmount: number }[]>([]);
  const [bidder, setBidder] = useState("No Bidder");
  const navigate = useNavigate();

  const [ auction, setAuction ] = useState<any>();

  const socket = io.connect("http://localhost:3000");

  const [seller, setSeller] = useState<Object>();

  const dispatch = useDispatch();

  const findAuctionById = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/auction/`,
        { id: id },
        { withCredentials: true }
      );

      console.log(res.data.auction);

      dispatch({
        type: "SET_AUCTION",
        payload: res.data.auction,
      });

      setAuction(res.data.auction);

      socket.emit("join-room", {
        auctionId: res.data._id,
        user: user?.user,
      });

      if (!res.data) {
        console.log("No auction found");
        return;
      }

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onExpire = () => {
    console.log("Auction Expired");
    navigate("/auctions");
  };

  const placeBid = (amount: Number) => {
    // const nextBidAmount = Math.max(amount, auction?.bidPrice || 0) + 50; // Ensure the bid amount is at least 50 more than the current bid
    // console.log(nextBidAmount)

    console.log(amount, user.user);
    socket.emit("placeBid", {
      auction: auction,
      bidAmount: amount,
      bidder: user?.user,
    });

   
  };

  useEffect(() => {
    findAuctionById();

    const expireTime = new Date(auction?.endDate).getTime();
    setExpireTime(expireTime as any);
    socket.emit("join-room", {
      auctionId: id,
      user: user?.user,
    });

    setBidder(auction?.bidder?.email);
  }, []);

  useEffect(() => {
    socket.on("updateAuction", ({ updatedAuction , bidder}: any) => {
      console.log(updatedAuction);
      
      setAuction({
        ...updatedAuction});
      setBidder(bidder);
    });
  },[]);

  return (
    <div>
      <div
        title="Auction Room"
        className="flex flex-col justify-center items-center my-10"
        
      >
        <Card>
          <img
            alt="crop"
            src={auction?.cropImage}
            className="w-full h-80 object-cover"
          />
          <div className="m-4">
            <Typography.Title level={2}>
              Title : {auction?.title}
            </Typography.Title>
            <Typography.Title level={4}>
              Description : {auction?.description}
            </Typography.Title>
            {/* <Typography.Title level={4}>Seller : {auction?.seller?.email}</Typography.Title> */}
            <Typography.Title level={4}>
              Starting Price : {auction?.startingPrice}
            </Typography.Title>
            <Typography.Title level={4}>
              Current Price : {auction?.currentPrice}
            </Typography.Title>
            <Typography.Title level={4}>
              Start Date : {new Date(auction?.startDate).toDateString()}
            </Typography.Title>

            <div>
              <Input type="number" placeholder="Enter Bid Amount" />
              <Button
                className="m-4"
                type="primary"
                // onClick={() =>
                //   placeBid(
                //     placeBidAmount
                //   )
                // }
              >
                Place Bid
              </Button>
              <div className="flex  space-x-2 justify-center mb-4">
                <Button
                  onClick={() =>
                    placeBid(
                      bids.length > 0
                        ? bids[bids.length - 1].bidAmount + 50
                        : 50
                    )
                  }
                >
                  +50
                </Button>
                <Button
                  onClick={() =>
                    placeBid(
                      bids.length > 0
                        ? bids[bids.length - 1].bidAmount + 100
                        : 100
                    )
                  }
                >
                  +100
                </Button>
                <Button
                  onClick={() =>
                    placeBid(
                      bids.length > 0
                        ? bids[bids.length - 1].bidAmount + 200
                        : 200
                    )
                  }
                >
                  +200
                </Button>
                <Button
                  onClick={() =>
                    placeBid(
                      bids.length > 0
                        ? bids[bids.length - 1].bidAmount + 500
                        : 500
                    )
                  }
                >
                  +500
                </Button>
              </div>

              {expireTime && (
                <MyTimer expiryTimestamp={expireTime} onExpire={onExpire} />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
