import React from 'react';
import { Card, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Meta } = Card;

const SimpleCards: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Carousel
                arrows={true}
                autoplay={true}
                className="relative"
                dotPosition="bottom"
                autoplaySpeed={3000}
                prevArrow={
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-4 cursor-pointer z-10">
                        <LeftOutlined className="text-3xl" />
                    </div>
                }
                nextArrow={
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-4 cursor-pointer z-10">
                        <RightOutlined className="text-3xl" />
                    </div>
                }
            >
                <div className="p-4">
                    <Card
                        className="bg-white bg-opacity-70 rounded-lg shadow-md p-6"
                        style={{ overflow: 'auto' }}
                    >
                        <Meta
                            title={<h2 className="text-2xl font-semibold mb-2 text-gray-900">Machine Learning for Disease Prediction</h2>}
                        />
                        <div className="mt-4 text-gray-900">
                            <p className="text-lg font-bold">Rapid Disease Identification:</p>
                            <p className="text-base">Quickly identifies plant diseases from photos, enabling swift treatment and reducing crop loss.</p>
                            <p className="text-lg font-bold mt-2">Preventative Measures:</p>
                            <p className="text-base">Early detection facilitates preventative strategies to protect crops and optimize yields effectively.</p>
                            <p className="text-lg font-bold mt-2">Customized Solutions:</p>
                            <p className="text-base">Utilizes a comprehensive database for accurate, tailored diagnoses, ensuring precise treatment recommendations.</p>
                        </div>
                    </Card>
                </div>

                <div className="p-4">
                    <Card
                        className="bg-white bg-opacity-70 rounded-lg shadow-md p-6"
                    >
                        <Meta
                            title={<h2 className="text-2xl font-semibold mb-2 text-gray-900">NASA Fire Information Alert System</h2>}
                        />
                        <div className="mt-4 text-gray-900">
                            <p className="text-lg font-bold">Satellite Monitoring:</p>
                            <p className="text-base">Continuously monitors satellite data for active fires in real-time, ensuring comprehensive coverage and early detection.</p>
                            <p className="text-lg font-bold mt-2">Alert Notification:</p>
                            <p className="text-base">Provides instant alerts for fires within a 10km radius, enabling prompt action and response.</p>
                            <p className="text-lg font-bold mt-2">Resource Allocation:</p>
                            <p className="text-base">Facilitates the efficient allocation of emergency resources, helping direct aid to the most affected areas.</p>
                        </div>
                    </Card>
                </div>

                <div className="p-4">
                    <Card
                        className="bg-white bg-opacity-70 rounded-lg shadow-md p-6"
                    >
                        <Meta
                            title={<h2 className="text-2xl font-semibold mb-2 text-gray-900">Enhanced Features Overview</h2>}
                        />
                        <div className="mt-4 text-gray-900">
                            <p className="text-lg font-bold">Real-Time Data:</p>
                            <p className="text-base">Ensures timely identification of fire incidents and efficient response actions, minimizing damage.</p>
                            <p className="text-lg font-bold mt-2">Instant Alerts:</p>
                            <p className="text-base">Keeps users informed with crucial details, allowing for quick decision-making and response.</p>
                            <p className="text-lg font-bold mt-2">Efficient Resource Management:</p>
                            <p className="text-base">Mitigates the impact of incidents through strategically directed emergency responses and resource deployment.</p>
                        </div>
                    </Card>
                </div>
            </Carousel>
        </div>
    );
}

export default SimpleCards;
