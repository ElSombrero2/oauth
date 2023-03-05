import axios from 'axios'

export const GoogleOauth2Client = axios.create({baseURL: process.env.GOOGLE_OAUTH2_URI})
export const GoogleApiClient = axios.create({baseURL: process.env.GOOGLE_API_URI})