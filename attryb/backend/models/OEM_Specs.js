const mongoose = require("mongoose");

const oemSpecs = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min : [200000 , `Minimum price is 2lakh `],
    max : [2000000 ,`Minimum price is 20lakh` ]
  },
  color: {
    type: String,
    required: [true, "Color is required"],
  },

  mileage: {
    type: Number,
    required: [true, "Mileage is required"],
    min : [5 , `Minimum mileage is 10 `],
    max : [100 ,`Minimum mileage is 100` ]
  },

  bhp: {
    type: Number,
    requured: [true, "Bhp is requried"],
    maxLength: [4, "Bhp cannot exceed the 9999"],
  },

  maxSpeed: {
    type: Number,
    required: [true, "maxSpeed is required"],
  },

  image : [
    {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    }
  ]

  
 
});


module.exports = mongoose.model("OEM_Spec" , oemSpecs);

