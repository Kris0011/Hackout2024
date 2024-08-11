import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import MapWithLocationPicker from './MapWithLocationPicker';
import L from 'leaflet';
import axios from 'axios';
import toast from 'react-hot-toast';

const { Item } = Form;

interface Location {
  latitude : number | null;
  longitude: number | null;
}

const LocationForm: React.FC = () => {




  const [form] = Form.useForm();
  const [location, setLocation] = useState<Location>({ latitude : null, longitude: null });

  const [nearest_fire_distance_km, setNearestFireDistanceKm] = useState<number>(0);
  const [nearest_fire_location, setNearestFireLocation] = useState<{latitude: number, longitude: number}>({latitude: 0, longitude: 0});


  const getFire = async () => {

    try {
      console.log(location);
      const res = await axios.post("http://127.0.0.1:5000/nasa_firms/nearest_fire", location , {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data);
      setNearestFireDistanceKm(res.data.distance);
      setNearestFireLocation(res.data.location);

      toast.error('Be aware ! Nearest Fire Detected ! ');
    }
    catch (error) {
      console.error("Failed to fetch fire data:", error)
      toast.success("No need to worry, No fire detected near you");
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude: latitude, longitude: longitude });
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
    setLocation({ latitude: latlng.lat, longitude: latlng.lng });
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
            initialLocation={{ lat : location.latitude, lng: location.longitude }}
          />
          <p className="mt-2">
            {location.latitude && location.longitude ? `Selected Location: Latitude ${location.latitude}, Longitude ${location.longitude}` : 'Click on the map to select a location.'}
          </p>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" onClick={getFire}>Submit</Button>
        </Item>
      </Form>


    {

      nearest_fire_distance_km > 0 && (
        <div className="mt-4">
          <h2>Nearest Fire Distance: {nearest_fire_distance_km} km</h2>
          <h2>Nearest Fire Location: Latitude {nearest_fire_location.latitude}, Longitude {nearest_fire_location.longitude}</h2>
        </div>
      )
    }
      



    </div>
  );
};

export default LocationForm;
