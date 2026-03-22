const express = require('express'); 
const app = express();           
const port = 4242;

const authorRoutes = require('./routes/author.routes');
const bookRoutes = require('./routes/book.routes');

app.use(express.json());

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

// Global error handler for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      error: 'Invalid JSON format', 
      message: 'Please check your JSON syntax and ensure all property names are double-quoted' 
    });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
