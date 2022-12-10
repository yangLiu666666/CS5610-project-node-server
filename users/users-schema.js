import mongoose from "mongoose"
const schema = mongoose.Schema(
    {
        email: String,
        password: String,
        role: String
    },
    {collection:"users"}
)
export default schema;