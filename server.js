const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

//Fetch all cars
app.get('/api/cars', async (req, res) => {
  try {
    const response = await axios.get('https://myfakeapi.com/api/cars');
    const data = response.data;

    //Format the car data
    const formattedCars = data.cars.map((car) => ({
      id: car.id,
      brand: car.car,
      model: car.car_model,
      color: car.car_color,
      year: car.car_model_year,
      vin: car.car_vin,
      price: car.price,
      availability: car.availability,
    }));

    res.json(formattedCars);
  } catch (error) {
    console.error('Error fetching cars:', error.message);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

//Fetch car details by ID
app.get('/api/car/:id', async (req, res) => {
  const carId = req.params.id;

  try {
    const response = await axios.get(`https://myfakeapi.com/api/cars/${carId}`);
    const car = response.data.Car;

    const carDetails = {
      id: car.id,
      brand: car.car,
      model: car.car_model,
      color: car.car_color,
      year: car.car_model_year,
      vin: car.car_vin,
      price: car.price,
      availability: car.availability,
    };

    res.json(carDetails);
  } catch (error) {
    console.error('Error fetching car details:', error.message);
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
});

//Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
