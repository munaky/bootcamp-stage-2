import express from 'express';
import bookRoutes from './routes/book-routes'

const app = express()
const port = 3001

app.use(bookRoutes)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})