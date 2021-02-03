import jwt from 'jsonwebtoken'

export const requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
    } else {
        res.status(401).json({ message: 'Authorization required' })
    }
    next()
}

export const checkRole = (role) => (req, res, next) => req.user.role !== role ? res.status(403).json({ messages: 'Access denied' }) : next() 
