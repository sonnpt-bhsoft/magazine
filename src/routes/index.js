import authRoutes from './auth.js'
import facultyRoutes from './faculty.js'
import contributionRoutes from './contribution.js'

import { requireSignIn, checkRole } from '../common-middleware/index.js'


const route = (app) => {
    app.use('/api/auth', authRoutes)
    app.use('/api/faculty', requireSignIn, checkRole('admin'), facultyRoutes)
    app.use('/api/contribution', contributionRoutes)
}

export default route