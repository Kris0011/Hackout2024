import requests
import csv
from math import radians, sin, cos, sqrt, atan2
from flask import Flask, request, jsonify , Blueprint


nasa_firms = Blueprint('nasa_firms', __name__)

# Haversine formula to calculate the distance between two points on Earth
def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0  # Earth radius in kilometers
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance

def min_distance(user_lat, user_lon):
    
    response = requests.get('https://firms.modaps.eosdis.nasa.gov/api/area/csv/7c4ea120df7500d8a67ca115687ede38/VIIRS_SNPP_NRT/world/1')
    response.raise_for_status()
    
    print(response.text)

    nearest_distance = float('inf')
    nearest_lat = None
    nearest_lon = None

    
    csv_reader = csv.reader(response.text.splitlines())
    next(csv_reader) 

    for row in csv_reader:
        fire_lat = float(row[0])  
        fire_lon = float(row[1]) 

        distance = haversine(user_lat, user_lon, fire_lat, fire_lon)
        if distance < nearest_distance:
            nearest_distance = distance
            nearest_lat = fire_lat
            nearest_lon = fire_lon
    return nearest_distance, nearest_lat, nearest_lon

@nasa_firms.route('/nearest_fire', methods=['POST'])
def nearest_fire():
    data = request.json
    user_lat = data.get('latitude')
    user_lon = data.get('longitude')
    print(user_lat , user_lon) 
    
    if user_lat is None or user_lon is None:
        return jsonify({'error': 'Invalid input. Please provide latitude and longitude.'}), 400

    nearest_distance, nearest_lat, nearest_lon = min_distance(user_lat, user_lon)
    
    if nearest_distance >= 10:
        return jsonify({'message': 'No fires detected within 10 km radius.'}), 404 

    response = {
        'nearest_fire_distance_km': nearest_distance,
        'nearest_fire_location': {
            'latitude': nearest_lat,
            'longitude': nearest_lon
        }
    }

    return jsonify(response)

@nasa_firms.route('/')
def home():
    # min_distance(37.7749, -122.4194)
    return jsonify({'message': 'Welcome to NASA FIRMS API'})
