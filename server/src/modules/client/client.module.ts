import axios from 'axios'

export const GoogleClient = axios.create({baseURL: process.env.GOOGLE_URI})
export const FacebookClient = axios.create({baseURL: process.env.FACEBOOK_URI})