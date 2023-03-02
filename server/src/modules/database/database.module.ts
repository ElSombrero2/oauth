import mongoose from 'mongoose'

export async function InitDatabase(uri: string){
    mongoose.set('autoIndex', false)
    mongoose.set('strictQuery', true)
    await mongoose.connect(uri)
}