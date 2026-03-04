import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'



dotenv.config()

const port = process.env.PORT




const startServer = async () => {
  try {
    await connectDB()
    console.log(" 👀 MongoDB Connected Successfully");
    app.listen(port, () => {
      console.log(` ✅  UNA listening on port ${port}`)
    })

  } catch (error) {
    console.log("Error while starting the server: ", error);
    process.exit(1)
  }

}

startServer()


