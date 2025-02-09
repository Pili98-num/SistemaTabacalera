import mongoose from 'mongoose'//libreria de mongoose

const MONGODB_URI = process.env.MONGODB_URI;//llamando a la variable de entorno

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() { //funcion dbconnect
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {//llamado para la conexión mediante libreria.connect y variable
      return mongoose
    })
  }
  cached.conn = await cached.promise //muestra que la conexion es correcta 
  return cached.conn
}

export default dbConnect
