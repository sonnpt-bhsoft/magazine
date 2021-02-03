import authRoutes from './auth.js'

const route = (app) => {
    app.use('/api/auth', authRoutes)
}

export default route