import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import MapWithLocationPicker from './MapWithLocationPicker';
import L from 'leaflet';

const { Item } = Form;

interface Location {
  lat: number | null;
  lng: number | null;
}

const LocationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [location, setLocation] = useState<Location>({ lat: null, lng: null });

  useEffect(() => {
    // Attempt to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Handle error or fallback location here if needed
        }
      );
    } else {
      console.warn('Geolocation not supported');
      // Handle fallback here if needed
    }
  }, []);

  const handleLocationSelect = (latlng: L.LatLng) => {
    setLocation({ lat: latlng.lat, lng: latlng.lng });
  };

  const handleFinish = (values: any) => {
    console.log('Form Values:', values);
    console.log('Selected Location:', location);
  };

  return (
    <div className="p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Item label="Select a Location">
          <MapWithLocationPicker 
            onLocationSelect={handleLocationSelect} 
            initialLocation={location}
          />
          <p className="mt-2">
            {location.lat && location.lng ? `Selected Location: Latitude ${location.lat}, Longitude ${location.lng}` : 'Click on the map to select a location.'}
          </p>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Item>
      </Form>
    </div>
  );
};

export default LocationForm;
