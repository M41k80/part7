const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const jsonServer = require('json-server')

const app = express()
const port = 3000


const dbPath = path.join(__dirname, 'db.json')
const corsOptions = {
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))


app.use(express.json())


app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

  
  const user = db.users.find(u => u.username === username && u.password === password)

  if (user) {
    
    return res.json({
      id: user.id,
      username: user.username,
      name: user.name
    })
  } else {
   
    return res.status(401).json({ error: 'Invalid credentials' })
  }
});

app.post('/api/blogs', (req, res) => {
  const newBlog = req.body
  newBlog.id = Date.now() 
  
  router.db.get('blogs').push(newBlog).write()  
  res.status(201).json(newBlog)  
})


app.put('/api/blogs/:id', (req, res) => {
  const { id } = req.params 
  const { likes } = req.body
  
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))


  const blogIndex = db.blogs.findIndex(blog => blog.id === parseInt(id))
  
  if (blogIndex === -1) {
    
    return res.status(404).json({ error: 'Blog no encontrado' })
  }

  
  db.blogs[blogIndex].likes = likes

  
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

  
  res.json(db.blogs[blogIndex])
})


app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

  const blogIndex = db.blogs.findIndex(blog => blog.id === parseInt(id))

  if (blogIndex === -1) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  db.blogs.splice(blogIndex, 1)
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
  res.status(200).json({ message: 'Blog deleted successfully' })
})

app.get('/api/users', (req, res) => { 
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8')) 
  const usersWithBlogCount = db.users.map(user => { 
    const blogCount = db.blogs.filter(blog => blog.author === user.username).length 
    return { 
      ...user, 
      blogCount 
    } 
  }) 
  res.json(usersWithBlogCount) 
})

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
  const user = db.users.find(user => user.id === parseInt(id))
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  const userBlogs = db.blogs.filter(blog => blog.author === user.username)
  res.json({ 
    ...user, 
    blogs: userBlogs 
  })
})


app.post('/api/blogs/:id/comments', (req, res) => {
  const { id } = req.params
  const { comment } = req.body

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

  const blog = db.blogs.find(blog => blog.id === parseInt(id))

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  
  if (!blog.comments) {
    blog.comments = []
  }

  blog.comments.push(comment)

  
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

  res.status(201).json({ comment })
})






const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults()
app.use(middlewares)
app.use('/api', router)


app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente!')
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
