# Quick Start: Testing File Uploads

## Prerequisites

- Development server running: `npm run dev`
- Logged in as admin: `admin@securethefuture.org / Admin123!`
- Firebase Storage enabled in Firebase Console

## Test Image Upload in Rich Text Editor

1. **Navigate to News Create**:

   - Go to http://localhost:3000/admin/news
   - Click "Add Article" button

2. **Upload an Image**:

   - Scroll to "Content" section
   - Click the **Upload** button (📤) in the toolbar
   - Select any image from your computer (JPEG, PNG, GIF, or WebP)
   - Watch for "Uploading..." message
   - Image should appear in the editor

3. **Verify Upload**:
   - Image displays in editor
   - Can type text around it
   - Image is responsive and rounded

## Test Video Upload in Rich Text Editor

1. **In Same Article**:

   - Click the **Video** button (🎬) in toolbar
   - Select a video file (MP4, WebM, or MOV - max 50MB)
   - Wait for upload
   - Video player should appear with controls

2. **Verify Upload**:
   - Video displays with play button
   - Controls work (play, pause, volume)
   - Video is responsive

## Test Featured Image Upload

1. **Find Featured Image Section**:

   - Scroll up to "Featured Image" field
   - Should see "Upload Image" and "URL" buttons

2. **Upload Image**:

   - Click "Upload Image" button
   - Select image from device
   - Preview should display immediately
   - URL appears below preview

3. **Test Remove**:

   - Hover over image
   - Click X button (top right)
   - Image removed, back to upload buttons

4. **Test URL Method**:
   - Click "URL" button
   - Enter: https://picsum.photos/800/400
   - Click "Add"
   - Image preview displays

## Test Full Article Creation

1. **Fill in Article**:

   - Title: "Test Article with Media"
   - Excerpt: "Testing file uploads"
   - Upload featured image
   - In content editor:
     - Type some text
     - Upload an image
     - Type more text
     - Upload a video

2. **Save Article**:

   - Check "Published"
   - Click "Create Article"

3. **View on Frontend**:
   - Should redirect to edit page
   - Open article in new tab
   - Verify all media displays correctly

## Test on Mobile (Optional)

1. **Open Site on Phone**:
   - Login to admin panel
   - Navigate to news create
   - Try uploading from camera roll
   - Try taking new photo and uploading

## Troubleshooting

### Upload Button Does Nothing

- Check browser console for errors
- Verify you're logged in
- Check user role (must be ADMIN or EDITOR)

### "Unauthorized" Error

- Cookie-based auth issue
- Try logging out and back in
- Check browser allows cookies

### "Upload failed" Error

- Check Firebase Storage is enabled
- Verify storage bucket name in .env
- Check Firebase Admin credentials

### Image/Video Not Showing

- Check browser console for URL
- Try opening URL directly in browser
- Verify Firebase Storage bucket is public

### File Size Error

- Max size is 50MB
- Compress large files
- Use MP4 for videos (best compatibility)

## Expected File Locations

After upload, files are stored at:

```
Firebase Storage Bucket → uploads/ → {timestamp}_{filename}
```

Example:

```
uploads/1729785600000_my-photo.jpg
uploads/1729785601000_video-clip.mp4
```

## Testing Checklist

- [ ] Image upload in rich text editor works
- [ ] Video upload in rich text editor works
- [ ] Featured image upload works
- [ ] Featured image URL input works
- [ ] Preview displays correctly
- [ ] Remove button works
- [ ] Files stored in Firebase Storage
- [ ] Public URLs generated
- [ ] Media displays in saved articles
- [ ] Mobile upload works (if testing on phone)

## Next Steps

Once uploads work:

1. Create a few articles with media
2. Test editing existing articles
3. Try different image formats
4. Test video playback
5. Check responsive design on mobile

## Firebase Console Verification

1. Go to Firebase Console
2. Navigate to Storage
3. Check `uploads/` folder
4. Should see uploaded files
5. Click file → copy URL
6. Paste URL in browser → should display

## Success Criteria

✅ Images upload from device
✅ Videos upload from device  
✅ Featured images upload from device
✅ Files stored in Firebase Storage
✅ Public URLs generated and work
✅ Media displays in editor
✅ Media displays on frontend
✅ Mobile uploads work

You now have a fully functional content management system with local file uploads! 🎉
