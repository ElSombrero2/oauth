import mongoose from 'mongoose'

export async function InitDatabase(uri: string){
    mongoose.set('strictQuery', true)
    mongoose.set('strict', true)
    await mongoose.connect(uri)
}