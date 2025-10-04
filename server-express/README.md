# Todo CRUD API

A RESTful API for managing todos built with Express.js, TypeScript, and MongoDB.

## Features

- ✅ Create, Read, Update, Delete todos
- ✅ Toggle todo completion status
- ✅ Filter todos by completion status and priority
- ✅ Sort todos by various fields
- ✅ Input validation and error handling
- ✅ MongoDB with Mongoose ODM

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos (with optional filtering and sorting)
- `GET /api/todos/:id` - Get a specific todo by ID
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

### Query Parameters for GET /api/todos

- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `sortBy` - Sort by field (createdAt, updatedAt, title, priority)
- `sortOrder` - Sort order (asc/desc)

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todoapp
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start MongoDB (make sure MongoDB is running on your system)

3. Create a `.env` file with the environment variables above

4. Run the development server:

```bash
npm run dev
```

5. The API will be available at `http://localhost:5000`

## Example Usage

### Create a Todo

```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn TypeScript",
    "description": "Complete TypeScript tutorial",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

### Get All Todos

```bash
curl http://localhost:5000/api/todos
```

### Get Todos with Filtering

```bash
curl "http://localhost:5000/api/todos?completed=false&priority=high&sortBy=createdAt&sortOrder=desc"
```

### Update a Todo

```bash
curl -X PUT http://localhost:5000/api/todos/:id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Todo Title",
    "completed": true
  }'
```

### Toggle Todo Completion

```bash
curl -X PATCH http://localhost:5000/api/todos/:id/toggle
```

### Delete a Todo

```bash
curl -X DELETE http://localhost:5000/api/todos/:id
```

## Todo Schema

```typescript
{
  title: string (required, max 100 chars)
  description?: string (optional, max 500 chars)
  completed: boolean (default: false)
  priority: 'low' | 'medium' | 'high' (default: 'medium')
  dueDate?: Date (optional)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
