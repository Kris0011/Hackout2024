import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import MapWithLocationPicker from './MapWithLocationPicker';
import L from 'leaflet';
import axios from 'axios';

const { Item } = Form;

interface Location {
  latitide : number | null;
  longitude: number | null;
}

const LocationForm: React.FC = () => {




  const [form] = Form.useForm();
  const [location, setLocation] = useState<Location>({ latitide : null, longitude: null });

  const [nearest_fire_distance_km, setNearestFireDistanceKm] = useState<number>(0);
  const [nearest_fire_location, setNearestFireLocation] = useState<{latitude: number, longitude: number}>({latitude: 0, longitude: 0});


  const getFire = async () => {

    try {
      const res = await axios.post("http://127.0.0.1:5000/nasa_firms/nearest_fire", location);
      console.log(res.data);
      setNearestFireDistanceKm(res.data.distance);
      setNearestFireLocation(res.data.location);
    }
    catch (error) {
      console.error("Failed to fetch fire data:", error)
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitide: latitude, longitude: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.warn('Geolocation not supported');
    }
  }, []);

  const handleLocationSelect = (latlng: L.LatLng) => {
    setLocation({ latitide: latlng.lat, longitude: latlng.lng });
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
            initialLocation={{ lat : location.latitide, lng: location.longitude }}
          />
          <p className="mt-2">
            {location.latitide && location.longitude ? `Selected Location: Latitude ${location.latitide}, Longitude ${location.longitude}` : 'Click on the map to select a location.'}
          </p>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" onClick={getFire}>Submit</Button>
        </Item>
      </Form>


      <div>
        <h2>{ nearest_fire_distance_km } :   {nearest_fire_location.latitude}   {nearest_fire_location.longitude}</h2>
      </div>



    </div>
  );
};

export default LocationForm;
