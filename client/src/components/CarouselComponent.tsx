import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const SimpleCards: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                <Card
                      className="bg-white bg-opacity-70 rounded-lg shadow-md p-6"
                      style={{overflow: "auto"}}
                    >
                    <Meta
                        title={<h2 className="text-xl font-semibold mb-2">Machine Learning for Disease Prediction</h2>}
                    />
                    <div className="mt-4 text-gray-700">
                        <p className="font-bold">Rapid Disease Identification:</p>
                        <p>Quickly identifies plant diseases from photos, enabling swift treatment.</p>
                        <p className="font-bold mt-2">Preventative Measures:</p>
                        <p>Early detection allows for preventative strategies to protect crops and maximize yields.</p>
                        <p className="font-bold mt-2">Customized Solutions:</p>
                        <p>Utilizes a vast database for accurate, tailored diagnoses.</p>
                    </div>
                </Card>

                <Card
                    className="bg-white bg-opacity-70 rounded-lg shadow-md p-6"
                >
                    <Meta
                        title={<h2 className="text-xl font-semibold mb-2">NASA Fire Information Alert System</h2>}
                    />
                    <div className="mt-4 text-gray-700">
                        <p className="font-bold">Satellite Monitoring:</p>
                        <p>Continuously monitors satellite data for active fires in real-time.</p>
                        <p className="font-bold mt-2">Alert Notification:</p>
                        <p>Provides instant alerts for fires within a 10km radius.</p>
                        <p className="font-bold mt-2">Resource Allocation:</p>
                        <p>Helps direct emergency response and resources to affected areas.</p>
                    </div>
                </Card>

                <Card
                    className="bg-white bg-opacity-70 rounded-lg shadow-md p-6"
                >
                    <Meta
                        title={<h2 className="text-[18px] font-semibold mb-1">Enhanced Features
                         Overview</h2>}
                    />
                    <div className="mt-4 text-gray-700">
                        <p className="font-bold">Real-Time Data:</p>
                        <p>Ensures timely identification of fire incidents and effective response.</p>
                        <p className="font-bold  mt-2">Instant Alerts:</p>
                        <p>Keeps users informed with crucial details for quick action.</p>
                        <p className="font-bold mt-2">Efficient Resource Management:</p>
                        <p>Mitigates impact through directed emergency response.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SimpleCards;
