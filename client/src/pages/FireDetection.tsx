import LocationForm from '../components/Locationform';
function FireDetection() {
  return (
    <div>
    <div className="App mt-20">
    <h1 className="text-3xl font-bold mb-4 text-center">Please select your location to check fire information</h1>
    <div className='max-w-2xl mx-auto'>
    <LocationForm />

    </div>
    </div>
    </div>
  )
}

export default FireDetection;
