// Sample data — push these into Firestore collection "cars"
// Firebase Console → Firestore → Start collection → "cars"

const sampleCars = [
  {
    id: "swift-01",
    name: "Maruti Swift",
    type: "Hatchback",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 5,
    pricePerDay: 1499,
    location: "Pune",
    rating: 4.6,
    trips: 214,

    // Indian Maruti Swift image
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Maruti%20Suzuki%20Swift%202092.JPG?width=1000",

    features: [
      "AC",
      "Bluetooth",
      "Power Steering",
    ],
  },

  {
    id: "creta-01",
    name: "Hyundai Creta",
    type: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    pricePerDay: 2999,
    location: "Pune",
    rating: 4.8,
    trips: 156,

    // Hyundai Creta photographed in India
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hyundai%20Creta%20India.jpg?width=1000",

    features: [
      "AC",
      "Sunroof",
      "Cruise Control",
      "Reverse Camera",
    ],
  },

  {
    id: "baleno-01",
    name: "Maruti Baleno",
    type: "Hatchback",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    pricePerDay: 1799,
    location: "Pune",
    rating: 4.5,
    trips: 189,

    // Maruti Suzuki Baleno — India model
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/2022%20Maruti%20Suzuki%20Baleno%20Alpha%20%28India%29%20front%20view.jpg?width=1000",

    features: [
      "AC",
      "Touchscreen",
      "Bluetooth",
    ],
  },

  {
    id: "thar-01",
    name: "Mahindra Thar",
    type: "SUV",
    transmission: "Manual",
    fuel: "Diesel",
    seats: 4,
    pricePerDay: 3499,
    location: "Mumbai",
    rating: 4.9,
    trips: 98,

    // Mahindra Thar photographed in India
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mahindra%20Thar%20Photoshoot%20at%20Perupalem%20Beach%20%28West%20Godavari%20District%2C%20AP%2C%20India%29%20Djdavid.jpg?width=1000",

    features: [
      "4x4",
      "Convertible Top",
      "AC",
    ],
  },
];

export default sampleCars;