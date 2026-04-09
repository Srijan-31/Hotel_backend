const {initializeDatabase}=require("./db/db.connect")
const express=require("express")
const app=express()
const Hotels=require("./Hotel.models")

app.use(express.json())
initializeDatabase()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const newHotel = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
// };

const newHotel2 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM", 
  amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
};

async function createHotel(newHotel){
    try{
        const hotel=new Hotels(newHotel)
        const saveHotel=await hotel.save()
        // console.log("New Hotel data:",saveHotel)
        return saveHotel
    }catch(error){
        
        throw error
    }
}


app.post("/hotels", async (req,res)=>{
    try{
        const savedHotel=await createHotel(req.body)
        res.status(201).json({message:" Hotel added successfully.",hotel: savedHotel})
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Failed to add Hotel"})
    }
})

// createHotel(newHotel)
// createHotel(newHotel2)


async function readAllHotels(){
    try{
        const allHotels=await Hotels.find()
        return allHotels
    }catch(error){
        throw(error)
    }
}

app.get("/hotels", async (req,res)=>{
    try{
        const hotel=await readAllHotels()

        if(hotel.length != 0){
            res.json(hotel)
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({erro: "Failed to fetch hotel data."})
    }
})

// readAllHotels()


async function readHotelByName(hotelName){
    try{
        const hotelByName=await Hotels.findOne({name: hotelName})
        return hotelByName
    }catch(error){
        throw(error)
    }
}

app.get("/hotels/:hotelName",async (req,res)=>{
    try{
        const hotel=await readHotelByName(req.params.hotelName)
        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch Hotel."})
    }
})
// readHotelByName("Lake View")

async function readHotelByParking(parking){
    try{
        const hotelByParking=await Hotels.find({isParkingAvailable: parking})
        console.log(hotelByParking)
    }catch(error){
        throw(error)
    }
}
// readHotelByParking(true)

async function readByAvailableRestaurant(restaurant){
    try{
        const hotelsWithRestaurants=await Hotels.find({isRestaurantAvailable:restaurant})
        console.log(hotelsWithRestaurants)
    }catch(error){
        throw(error)
    }
}
// readByAvailableRestaurant(true)

async function readHotelsByCategory(hotelCategory){
    try{
        const hotelByCategory=await Hotels.find({category:hotelCategory})
        return hotelByCategory
    }catch(error){
        throw(error)
    }
}

app.get("/hotels/category/:hotelCategory", async (req,res)=>{
    try{
        const hotel=await readHotelsByCategory(req.params.hotelCategory)

        if(hotel.length!=0){
            res.json(hotel)
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch the hotel"})
    }
})
// readHotelsByCategory("Mid-Range")

async function readHotelByPriceRange(priceRange){
    try{
        const hotelsByPriceRange=await Hotels.findOne({priceRange: priceRange})
        console.log(hotelsByPriceRange)
    }catch(error){
        throw(error)
    }
}
// readHotelByPriceRange("$$$$ (61+)")

async function readHotelsByRatiung(rating){
    try{
        const hotelByRating=await Hotels.findOne({rating: rating})
        return hotelByRating
    }catch(error){
        throw(error)
    }
}

app.get("/hotels/rating/:hotelRating", async (req,res)=>{
    try{
        const hotel=await readHotelsByRatiung(req.params.hotelRating)
        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch hotel."})
    }
})
// readHotelsByRatiung(4.0)

async function readHotelByPhoneNumber(hotelPhoneNUmber){
    try{
        const hotelByPhoneNumber=await Hotels.findOne({phoneNumber:hotelPhoneNUmber})
        return hotelByPhoneNumber
    }catch(error){
        throw(error)
    }
}

app.get("/hotels/directory/:phoneNumber", async (req,res)=>{
    try{
        const hotel=await readHotelByPhoneNumber(req.params.phoneNumber)
        if(hotel){
            res.json(hotel)
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch the hotel."})
    }
})
// readHotelByPhoneNumber("+1299655890")

// async function deleteHotelById(hotelId){
//     try{
//         const hotel=await Hotels.findByIdAndDelete(hotelId)
//         console.log("Deleted",hotel)
//     }catch(error){
//         throw(error)
//     }
// }
// deleteHotelById("69b23c4d489985f109bfafb5")
// deleteHotelById("69b23c4d489985f109bfafb6")

async function updateHotelById(hotelId,dataToBeUpdated){
    try{
        const updateHotel=await Hotels.findByIdAndUpdate(hotelId,dataToBeUpdated,{new:true})
        // console.log(updateHotel)
        return updateHotel
    }catch(error){
        console.log("Error in updating Hotel data",error)
    }
}

app.post("/hotels/:hotelId", async (req,res)=>{
    try{
        const updatedHotel=await updateHotelById(req.params.hotelId,req.body)
        if(updatedHotel){
            res.status(200).json({message:"Hotel updated successfully.",updatedHotel: updatedHotel})
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to update hotel."})
    }
})
// updateHotelById("69b23e68f00c29068b9f9675",{checkOutTime: "11:00 AM"})

async function updateHotelByName(hotelName,dataToBeUpdated){
    try{
        const updateHotel=await Hotels.findOneAndUpdate({name: hotelName},dataToBeUpdated,{returnDocument:'after'})
        console.log(updateHotel)
    }catch(error){
        throw(error)
    }
}
// updateHotelByName("Sunset Resort",{rating: 4.2})

async function updateHotelByPhoneNumber(phoneNumber,dataToBeUpdated){
    try{
        const updateHotel=await Hotels.findOneAndUpdate({phoneNumber:phoneNumber},dataToBeUpdated,{returnDocument:'after'})
        console.log(updateHotel)
    }catch(error){
        throw(error)
    }
}
// updateHotelByPhoneNumber("+1299655890",{phoneNumber: "+1997687392"})

async function deleteHotelById(hotelId){
    try{
        const deleteHotel=await Hotels.findByIdAndDelete(hotelId)
        // console.log("This hotel was deleted:",deleteHotel)
        return deleteHotel
    }catch(error){
        console.log("Error deleting the restaurant data",error)
    }
}

app.delete("/hotels/:hotelId", async (req,res)=>{
    try{
        const deletedHotel=await deleteHotelById(req.params.hotelId)
        if(deletedHotel){
            res.status(200).json({message: "Hotel deleted successfully."})
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete hotel."})
    }
})
// deleteHotelById("69b23e68f00c29068b9f9675")


async function deleteHotelByPhoneNUmber(phoneNumber){
    try{
        const deleteHotel=await Hotels.findOneAndDelete({phoneNumber: phoneNumber})
        console.log("This hotel was deleted:",deleteHotel)
    }catch(error){
        console.log("Error in deleting hotel data",error)
    }
}
// deleteHotelByPhoneNUmber("+1997687392")

const PORT=3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})