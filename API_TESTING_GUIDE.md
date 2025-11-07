# API Testing Guide

## Secure the Future - Backend API Documentation

**Base URL:** `http://localhost:3000/api`

---

## 🔐 Authentication

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@securethefuture.org",
  "password": "Admin123!"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "admin@securethefuture.org",
    "name": "Admin User",
    "role": "ADMIN",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt-token-here"
}
```

### Get Current User

```http
GET /api/auth/me
Cookie: auth-token=your-jwt-token
```

### Logout

```http
POST /api/auth/logout
```

---

## 📰 News API

### List News Articles

```http
GET /api/news?page=1&limit=10&category=ANNOUNCEMENTS&featured=true&search=drug
```

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category (RESEARCH, ANNOUNCEMENTS, SUCCESS_STORIES, etc.)
- `featured` - Filter featured articles (true/false)
- `search` - Search in title, excerpt, content
- `published` - Show published only (default: true)

### Get Single News Article

```http
GET /api/news/understanding-addiction-2024
```

### Create News Article (Admin/Editor)

```http
POST /api/news
Content-Type: application/json
Cookie: auth-token=your-jwt-token

{
  "title": "Understanding Addiction in 2024",
  "slug": "understanding-addiction-2024",
  "category": "RESEARCH",
  "excerpt": "Latest research on addiction...",
  "content": "Full article content here...",
  "image": "/images/addiction-research.jpg",
  "readTime": 5,
  "featured": true,
  "published": true,
  "publishedAt": "2024-01-15T10:00:00Z",
  "tagIds": ["tag-uuid-1", "tag-uuid-2"]
}
```

### Update News Article (Admin/Editor)

```http
PUT /api/news/understanding-addiction-2024
Content-Type: application/json
Cookie: auth-token=your-jwt-token

{
  "title": "Updated Title",
  "featured": false,
  "tagIds": ["new-tag-uuid"]
}
```

### Delete News Article (Admin)

```http
DELETE /api/news/understanding-addiction-2024
Cookie: auth-token=your-jwt-token
```

---

## 📅 Events API

### List Events

```http
GET /api/events?page=1&limit=10&type=WORKSHOP&featured=true&upcoming=true
```

**Query Parameters:**

- `page` - Page number
- `limit` - Items per page
- `type` - Filter by type (COMMUNITY_EVENT, WORKSHOP, SUPPORT_GROUP, etc.)
- `featured` - Filter featured events
- `upcoming` - Show upcoming events only (true/false)
- `search` - Search in title, description
- `published` - Show published only (default: true)

### Get Single Event

```http
GET /api/events/recovery-workshop-january-2024
```

### Create Event (Admin/Editor)

```http
POST /api/events
Content-Type: application/json
Cookie: auth-token=your-jwt-token

{
  "title": "Recovery Workshop",
  "slug": "recovery-workshop-january-2024",
  "type": "WORKSHOP",
  "description": "Workshop description...",
  "date": "2024-01-20",
  "time": "14:00",
  "endTime": "16:00",
  "location": "Community Center",
  "address": "123 Main St, City",
  "virtualLink": "https://zoom.us/meeting-id",
  "maxAttendees": 50,
  "image": "/images/workshop.jpg",
  "organizer": "Dr. Jane Smith",
  "contactEmail": "events@securethefuture.org",
  "contactPhone": "+1234567890",
  "featured": true,
  "published": true,
  "registrationRequired": true,
  "tagIds": ["tag-uuid"]
}
```

### RSVP to Event (Public)

```http
POST /api/events/recovery-workshop-january-2024/rsvp
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "attendees": 2,
  "message": "Looking forward to attending!"
}
```

### Get Event RSVPs (Admin/Editor)

```http
GET /api/events/recovery-workshop-january-2024/rsvp
Cookie: auth-token=your-jwt-token
```

---

## 📖 Stories API

### List Stories

```http
GET /api/stories?page=1&limit=12&type=VIDEO&featured=true&search=recovery
```

**Query Parameters:**

- `page` - Page number
- `limit` - Items per page
- `type` - Filter by type (VIDEO, AUDIO, TEXT)
- `featured` - Filter featured stories
- `search` - Search in title, excerpt, content, storyteller
- `published` - Show published only (default: true)

### Get Single Story (Auto-tracks views)

```http
GET /api/stories/johns-recovery-journey
```

### Create Story (Admin/Editor)

```http
POST /api/stories
Content-Type: application/json
Cookie: auth-token=your-jwt-token

{
  "title": "John's Recovery Journey",
  "slug": "johns-recovery-journey",
  "type": "VIDEO",
  "excerpt": "Inspiring story of recovery...",
  "content": "Full story text...",
  "storyteller": "John D.",
  "storytellerAge": 35,
  "storytellerLocation": "New York",
  "videoUrl": "https://youtube.com/watch?v=xyz",
  "thumbnailUrl": "/images/john-story.jpg",
  "featured": true,
  "published": true,
  "tagIds": ["tag-uuid"]
}
```

---

## 📚 Resources API

### List Resources

```http
GET /api/resources?page=1&limit=12&category=TREATMENT&type=GUIDE&featured=true
```

**Query Parameters:**

- `page` - Page number
- `limit` - Items per page
- `category` - Filter by category (PREVENTION, TREATMENT, RECOVERY, SUPPORT, etc.)
- `type` - Filter by type (ARTICLE, GUIDE, VIDEO, PODCAST, BOOK, etc.)
- `featured` - Filter featured resources
- `search` - Search in title, description, author, publisher
- `published` - Show published only (default: true)

### Get Single Resource

```http
GET /api/resources/addiction-treatment-guide-2024
```

### Create Resource (Admin/Editor)

```http
POST /api/resources
Content-Type: application/json
Cookie: auth-token=your-jwt-token

{
  "title": "Addiction Treatment Guide 2024",
  "slug": "addiction-treatment-guide-2024",
  "category": "TREATMENT",
  "type": "GUIDE",
  "description": "Comprehensive treatment guide...",
  "content": "Full guide content...",
  "author": "Dr. Jane Smith",
  "publisher": "Secure the Future",
  "publishedDate": "2024-01-01",
  "fileUrl": "/files/treatment-guide.pdf",
  "externalUrl": "https://example.com/guide",
  "thumbnailUrl": "/images/guide-cover.jpg",
  "featured": true,
  "published": true,
  "tagIds": ["tag-uuid"]
}
```

### Track Resource Views/Downloads

```http
POST /api/resources/addiction-treatment-guide-2024/track
Content-Type: application/json

{
  "action": "view"  // or "download"
}
```

**Response:**

```json
{
  "success": true,
  "action": "view",
  "stats": {
    "views": 125,
    "downloads": 45
  }
}
```

---

## 📧 Contact API

### Submit Contact Form (Public)

```http
POST /api/contact
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Question about programs",
  "message": "I would like to know more...",
  "newsletter": true  // Optional: subscribe to newsletter
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you within 24 hours.",
  "data": {
    "id": "uuid",
    "status": "UNREAD"
  }
}
```

### List Contact Messages (Admin/Editor)

```http
GET /api/contact?page=1&limit=20&status=UNREAD
Cookie: auth-token=your-jwt-token
```

**Query Parameters:**

- `page` - Page number
- `limit` - Items per page
- `status` - Filter by status (UNREAD, READ, REPLIED, ARCHIVED)

---

## 📬 Newsletter API

### Subscribe to Newsletter (Public)

```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "subscriber@example.com",
  "name": "Jane Doe"  // Optional
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thank you for subscribing! You will receive our latest updates.",
  "data": {
    "id": "uuid",
    "email": "subscriber@example.com"
  }
}
```

### Unsubscribe from Newsletter (Public)

```http
POST /api/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

### List Subscribers (Admin/Editor)

```http
GET /api/newsletter/subscribers?page=1&limit=20&active=true&search=john
Cookie: auth-token=your-jwt-token
```

**Query Parameters:**

- `page` - Page number
- `limit` - Items per page
- `active` - Filter active subscribers (true/false)
- `search` - Search in email and name

**Response:**

```json
{
  "subscribers": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "stats": {
    "total": 150,
    "active": 145,
    "inactive": 5
  }
}
```

---

## 🏷️ Tags API

### List All Tags

```http
GET /api/tags?includeCount=true
```

**Query Parameters:**

- `includeCount` - Include usage statistics (true/false)

**Response:**

```json
{
  "tags": [
    {
      "id": "uuid",
      "name": "Recovery",
      "slug": "recovery",
      "description": "Resources about recovery",
      "usageCount": 45,
      "breakdown": {
        "stories": 12,
        "news": 15,
        "events": 10,
        "resources": 8
      }
    }
  ]
}
```

### Get Single Tag

```http
GET /api/tags/recovery
```

### Create Tag (Admin/Editor)

```http
POST /api/tags
Content-Type: application/json
Cookie: auth-token=your-jwt-token

{
  "name": "Recovery",
  "slug": "recovery",
  "description": "Resources about recovery"
}
```

### Delete Tag (Admin)

```http
DELETE /api/tags/recovery
Cookie: auth-token=your-jwt-token
```

**Note:** Cannot delete tags that are currently in use. Will return error with usage count.

---

## 🔑 Role Permissions

### ADMIN

- Full access to all endpoints
- Can create, update, delete all content
- Can manage users
- Can delete tags

### EDITOR

- Can create, update content (news, events, stories, resources)
- Can view contact messages
- Can manage newsletter subscribers
- Can manage tags (create, update)
- Cannot delete content or tags

### VIEWER

- Read-only access to published content
- Cannot create, update, or delete anything

---

## 📝 Common Response Formats

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response

```json
{
  "error": "Error message here",
  "details": { ... }  // Optional
}
```

### Pagination Response

```json
{
  "items": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## 🧪 Testing with cURL (PowerShell)

### Login and save token

```powershell
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@securethefuture.org","password":"Admin123!"}' `
  -SessionVariable session

$response.Content | ConvertFrom-Json
```

### Use token in subsequent requests

```powershell
$headers = @{
  "Cookie" = $session.Cookies.GetCookies("http://localhost:3000") | Select-Object -ExpandProperty Name,Value
}

Invoke-WebRequest -Uri "http://localhost:3000/api/news" `
  -Method GET `
  -Headers $headers
```

---

## 🐛 Common Error Codes

- **400** - Bad Request (validation error)
- **401** - Unauthorized (not logged in)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

---

## 📚 Additional Resources

- **Prisma Studio:** `npm run db:studio` - View database in GUI
- **Database Seed:** `npm run db:seed` - Reset with sample data
- **Admin Credentials:** admin@securethefuture.org / Admin123!

---

**Happy Testing! 🚀**
