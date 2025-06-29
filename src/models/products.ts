import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema({
    title: String,
    description: String,
    price: String,
    quantity: Number,
    stock: Number,
    
}, {timestamps: true});

const Products = mongoose.models.Products|| mongoose.model("Products", topicSchema);
export default Products;