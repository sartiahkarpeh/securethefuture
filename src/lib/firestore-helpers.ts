// Firestore helper utilities
import { adminDB, COLLECTIONS } from './firebase-admin';
import { 
  Timestamp,
  FieldValue,
} from 'firebase-admin/firestore';

// Type for generic document data
type DocumentData = Record<string, any>;

// Generate a unique ID (similar to Prisma's cuid)
export function generateId(): string {
  return adminDB.collection('_temp').doc().id;
}

// Convert Firestore timestamp to ISO string
export function timestampToDate(timestamp: any): Date | null {
  if (!timestamp) return null;
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
}

// Convert Date to Firestore Timestamp
export function dateToTimestamp(date: Date | string | null): Timestamp | null {
  if (!date) return null;
  if (typeof date === 'string') {
    return Timestamp.fromDate(new Date(date));
  }
  return Timestamp.fromDate(date);
}

// Generic function to get a document by ID
export async function getDocById<T = DocumentData>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> {
  const docRef = adminDB.collection(collectionName).doc(id);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    return null;
  }
  
  return {
    id: doc.id,
    ...doc.data(),
  } as T & { id: string };
}

// Generic function to get documents with query
export async function getDocs<T = DocumentData>(
  collectionName: string,
  queryConstraints?: any[]
): Promise<(T & { id: string })[]> {
  let query: any = adminDB.collection(collectionName);
  
  if (queryConstraints && queryConstraints.length > 0) {
    queryConstraints.forEach(constraint => {
      query = query.where(...constraint);
    });
  }
  
  const snapshot = await query.get();
  
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  })) as (T & { id: string })[];
}

// Generic function to create a document
export async function createDoc<T = DocumentData>(
  collectionName: string,
  data: T,
  customId?: string
): Promise<T & { id: string }> {
  const docRef = customId 
    ? adminDB.collection(collectionName).doc(customId)
    : adminDB.collection(collectionName).doc();
  
  const timestamp = Timestamp.now();
  const docData = {
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  
  await docRef.set(docData);
  
  return {
    id: docRef.id,
    ...docData,
  } as T & { id: string };
}

// Generic function to update a document
export async function updateDoc<T = DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<(T & { id: string }) | null> {
  const docRef = adminDB.collection(collectionName).doc(id);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    return null;
  }
  
  const updateData = {
    ...data,
    updatedAt: Timestamp.now(),
  };
  
  await docRef.update(updateData);
  
  const updatedDoc = await docRef.get();
  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  } as T & { id: string };
}

// Generic function to delete a document
export async function deleteDoc(
  collectionName: string,
  id: string
): Promise<boolean> {
  const docRef = adminDB.collection(collectionName).doc(id);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    return false;
  }
  
  await docRef.delete();
  return true;
}

// Get document by field value
export async function getDocByField<T = DocumentData>(
  collectionName: string,
  field: string,
  value: any
): Promise<(T & { id: string }) | null> {
  const snapshot = await adminDB
    .collection(collectionName)
    .where(field, '==', value)
    .limit(1)
    .get();
  
  if (snapshot.empty) {
    return null;
  }
  
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as T & { id: string };
}

// Increment a numeric field
export async function incrementField(
  collectionName: string,
  id: string,
  field: string,
  amount: number = 1
): Promise<void> {
  const docRef = adminDB.collection(collectionName).doc(id);
  await docRef.update({
    [field]: FieldValue.increment(amount),
    updatedAt: Timestamp.now(),
  });
}

// Batch operations helper
export function getBatch() {
  return adminDB.batch();
}

// Convert Firestore document to plain object with dates
export function docToObject<T = any>(doc: any): (T & { id: string }) | null {
  if (!doc || !doc.exists) return null;
  
  const data = doc.data();
  const converted: any = { id: doc.id };
  
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      converted[key] = value.toDate();
    } else {
      converted[key] = value;
    }
  }
  
  return converted as T & { id: string };
}

// Convert array of Firestore documents to plain objects
export function docsToArray<T = any>(docs: any[]): (T & { id: string })[] {
  return docs.map(doc => docToObject<T>(doc)).filter(Boolean) as (T & { id: string })[];
}

export { adminDB, COLLECTIONS };
