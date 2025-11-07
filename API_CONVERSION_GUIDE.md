# API Routes Conversion Guide

This guide provides examples for converting Prisma queries to Firestore queries for each API route.

## Common Patterns

### Import Changes

```typescript
// OLD
import prisma from "@/lib/prisma";

// NEW
import {
  createDoc,
  getDocById,
  updateDoc,
  deleteDoc,
  getDocByField,
  getDocs,
  COLLECTIONS,
  adminDB,
} from "@/lib/firestore-helpers";
import { Timestamp } from "firebase-admin/firestore";
```

## Conversion Examples

### 1. Create (INSERT)

#### Prisma

```typescript
const story = await prisma.story.create({
  data: {
    title: "My Story",
    slug: "my-story",
    published: false,
    authorId: userId,
  },
});
```

#### Firestore

```typescript
const story = await createDoc(COLLECTIONS.STORIES, {
  title: "My Story",
  slug: "my-story",
  published: false,
  authorId: userId,
});
```

### 2. Find by ID

#### Prisma

```typescript
const story = await prisma.story.findUnique({
  where: { id: storyId },
});
```

#### Firestore

```typescript
const story = await getDocById(COLLECTIONS.STORIES, storyId);
```

### 3. Find by Field

#### Prisma

```typescript
const story = await prisma.story.findUnique({
  where: { slug: "my-story" },
});
```

#### Firestore

```typescript
const story = await getDocByField(COLLECTIONS.STORIES, "slug", "my-story");
```

### 4. Update

#### Prisma

```typescript
const story = await prisma.story.update({
  where: { id: storyId },
  data: {
    title: "Updated Title",
    published: true,
  },
});
```

#### Firestore

```typescript
const story = await updateDoc(COLLECTIONS.STORIES, storyId, {
  title: "Updated Title",
  published: true,
});
```

### 5. Delete

#### Prisma

```typescript
await prisma.story.delete({
  where: { id: storyId },
});
```

#### Firestore

```typescript
await deleteDoc(COLLECTIONS.STORIES, storyId);
```

### 6. Find Many with Filters

#### Prisma

```typescript
const stories = await prisma.story.findMany({
  where: {
    published: true,
    featured: true,
  },
  orderBy: {
    publishedAt: "desc",
  },
  take: 10,
  skip: 0,
});
```

#### Firestore

```typescript
const snapshot = await adminDB
  .collection(COLLECTIONS.STORIES)
  .where("published", "==", true)
  .where("featured", "==", true)
  .orderBy("publishedAt", "desc")
  .limit(10)
  .offset(0)
  .get();

const stories = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
  publishedAt: doc.data().publishedAt?.toDate() || null,
  createdAt: doc.data().createdAt?.toDate() || null,
  updatedAt: doc.data().updatedAt?.toDate() || null,
}));
```

### 7. Count

#### Prisma

```typescript
const count = await prisma.story.count({
  where: { published: true },
});
```

#### Firestore

```typescript
const snapshot = await adminDB
  .collection(COLLECTIONS.STORIES)
  .where("published", "==", true)
  .get();

const count = snapshot.size;
```

### 8. Increment Field

#### Prisma

```typescript
await prisma.resource.update({
  where: { id: resourceId },
  data: {
    views: { increment: 1 },
  },
});
```

#### Firestore

```typescript
import { incrementField } from "@/lib/firestore-helpers";

await incrementField(COLLECTIONS.RESOURCES, resourceId, "views", 1);
```

### 9. Search/Text Contains

#### Prisma

```typescript
const stories = await prisma.story.findMany({
  where: {
    OR: [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { excerpt: { contains: searchTerm, mode: "insensitive" } },
    ],
  },
});
```

#### Firestore (requires client-side filtering or Algolia/Elasticsearch)

```typescript
// Option 1: Get all and filter (for small datasets)
const snapshot = await adminDB.collection(COLLECTIONS.STORIES).get();

const stories = snapshot.docs
  .map((doc) => ({ id: doc.id, ...doc.data() }))
  .filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

// Option 2: Use Firebase Extensions (Algolia, Elasticsearch)
// Recommended for production search functionality
```

### 10. OR Queries (Limited in Firestore)

#### Prisma

```typescript
const items = await prisma.newsArticle.findMany({
  where: {
    OR: [{ category: "RESEARCH" }, { category: "POLICY" }],
  },
});
```

#### Firestore (use 'in' operator or multiple queries)

```typescript
// Option 1: Using 'in' operator (max 10 values)
const snapshot = await adminDB
  .collection(COLLECTIONS.NEWS_ARTICLES)
  .where("category", "in", ["RESEARCH", "POLICY"])
  .get();

const items = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

// Option 2: Multiple queries and merge
const query1 = adminDB
  .collection(COLLECTIONS.NEWS_ARTICLES)
  .where("category", "==", "RESEARCH")
  .get();

const query2 = adminDB
  .collection(COLLECTIONS.NEWS_ARTICLES)
  .where("category", "==", "POLICY")
  .get();

const [snapshot1, snapshot2] = await Promise.all([query1, query2]);

const items = [
  ...snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ...snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
];
```

### 11. Relations (Need to Denormalize)

#### Prisma (with relations)

```typescript
const story = await prisma.story.findUnique({
  where: { id: storyId },
  include: {
    author: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  },
});
```

#### Firestore (fetch separately or denormalize)

```typescript
// Option 1: Fetch separately
const story = await getDocById(COLLECTIONS.STORIES, storyId);

if (story && story.authorId) {
  const author = await getDocById(COLLECTIONS.USERS, story.authorId);
  story.author = author
    ? {
        id: author.id,
        name: author.name,
        email: author.email,
      }
    : null;
}

// Option 2: Denormalize (recommended)
// Store author info directly in story document
const story = await createDoc(COLLECTIONS.STORIES, {
  title: "My Story",
  slug: "my-story",
  authorId: userId,
  authorName: user.name, // Denormalized
  authorEmail: user.email, // Denormalized
});
```

### 12. Timestamps

#### Prisma (automatic)

```typescript
// createdAt and updatedAt are automatic
```

#### Firestore (handled by helpers)

```typescript
// createDoc and updateDoc automatically add timestamps
import { Timestamp } from "firebase-admin/firestore";

// Manual timestamp
const story = await createDoc(COLLECTIONS.STORIES, {
  title: "My Story",
  customDate: Timestamp.now(),
});
```

## Route-Specific Examples

### /api/events/route.ts

```typescript
// GET - List events
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "12");
  const type = searchParams.get("type");
  const featured = searchParams.get("featured") === "true";

  let query = adminDB
    .collection(COLLECTIONS.EVENTS)
    .where("published", "==", true);

  if (type) {
    query = query.where("type", "==", type);
  }

  if (featured) {
    query = query.where("featured", "==", true);
  }

  query = query.orderBy("date", "asc").limit(limit);

  const snapshot = await query.get();

  const events = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate() || null,
    createdAt: doc.data().createdAt?.toDate() || null,
    updatedAt: doc.data().updatedAt?.toDate() || null,
  }));

  return NextResponse.json({ success: true, data: events });
}

// POST - Create event
export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await getUserFromRequest(request);

  const event = await createDoc(COLLECTIONS.EVENTS, {
    ...body,
    date: Timestamp.fromDate(new Date(body.date)),
    organizerId: user.id,
    attendees: 0,
    published: false,
  });

  return NextResponse.json({ success: true, data: event });
}
```

### /api/events/[slug]/route.ts

```typescript
// GET - Get single event
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const event = await getDocByField(COLLECTIONS.EVENTS, "slug", params.slug);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: event });
}

// PUT - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const event = await getDocByField(COLLECTIONS.EVENTS, "slug", params.slug);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const updated = await updateDoc(COLLECTIONS.EVENTS, event.id, {
    ...body,
    date: body.date ? Timestamp.fromDate(new Date(body.date)) : undefined,
  });

  return NextResponse.json({ success: true, data: updated });
}

// DELETE - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const event = await getDocByField(COLLECTIONS.EVENTS, "slug", params.slug);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  await deleteDoc(COLLECTIONS.EVENTS, event.id);

  return NextResponse.json({ success: true, message: "Event deleted" });
}
```

### /api/resources/[slug]/track/route.ts

```typescript
// POST - Track resource view/download
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { action } = await request.json(); // 'view' or 'download'

  const resource = await getDocByField(
    COLLECTIONS.RESOURCES,
    "slug",
    params.slug
  );

  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const field = action === "download" ? "downloads" : "views";
  await incrementField(COLLECTIONS.RESOURCES, resource.id, field, 1);

  return NextResponse.json({ success: true });
}
```

## Important Notes

1. **Composite Indexes**: Create indexes in Firebase Console for queries with multiple where clauses
2. **Array Queries**: Use `.where('tags', 'array-contains', tagId)` for array fields
3. **Pagination**: Use `.offset()` and `.limit()` or cursor-based pagination with `.startAfter()`
4. **Transactions**: Use `adminDB.runTransaction()` for atomic operations
5. **Batch Writes**: Use `getBatch()` from firestore-helpers for multiple writes
6. **Security**: Always validate user permissions before write operations
7. **Error Handling**: Wrap Firestore calls in try-catch blocks
8. **Timestamps**: Convert Firestore timestamps to Date objects when returning to client

## Next Steps

For each remaining API route:

1. Update imports
2. Replace Prisma queries with Firestore queries
3. Handle timestamp conversions
4. Test the endpoint
5. Update error handling if needed
