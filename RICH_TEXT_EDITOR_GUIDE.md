# Quick Start Guide: Using the Rich Text Editor

## For Content Editors

### Creating a New News Article

1. **Navigate to News Management**

   - Go to Admin Panel → News
   - Click "Add Article" button (top right)

2. **Fill in Basic Information**

   - **Title:** Enter your article title (required)
   - **Slug:** Auto-generated from title, can be edited
   - **Category:** Select appropriate category from dropdown
   - **Featured Image URL:** Enter image URL (optional)
   - **Excerpt:** Brief summary for preview (required)

3. **Use the Rich Text Editor**

   #### Formatting Text

   - **Bold:** Select text → Click **B** button (or Ctrl+B)
   - **Italic:** Select text → Click _I_ button (or Ctrl+I)
   - **Code:** Select text → Click `<>` button for inline code

   #### Adding Headings

   - **H1:** Main heading - Click H1 button
   - **H2:** Section heading - Click H2 button
   - **H3:** Sub-section heading - Click H3 button

   #### Creating Lists

   - **Bullet List:** Click • button, type items, press Enter for new item
   - **Numbered List:** Click 1. button, type items, press Enter for new item
   - **Exit List:** Press Enter twice

   #### Adding Links

   - Select the text you want to link
   - Click the 🔗 (Link) button
   - Enter the URL in the prompt
   - Link appears in teal with underline

   #### Adding Images

   - Click the 🖼️ (Image) button
   - Enter the image URL in the prompt
   - Image appears inline in your content
   - Images are responsive and rounded

   #### Other Features

   - **Blockquote:** Click " button for highlighted quotes
   - **Horizontal Rule:** Click — button for section dividers
   - **Undo/Redo:** Click ↶/↷ buttons at top left

4. **Publishing Options**

   - **Published Date:** Select date for article
   - **Featured Article:** Check to feature on homepage
   - **Published:** Check to make article live (uncheck for draft)

5. **Save Your Work**
   - Click "Preview" to see how it looks (coming soon)
   - Click "Create Article" to save

### Editing an Existing Article

1. **Find Your Article**

   - Go to Admin Panel → News
   - Use search or filters to find article
   - Click Edit (✏️) button

2. **Make Your Changes**

   - All fields are pre-filled with existing content
   - Rich text editor shows formatted content
   - Edit any section as needed

3. **Save Changes**
   - Click "Save Changes" button
   - If you changed the slug, URL will update

## For Developers

### Component Usage

```tsx
import RichTextEditor from "@/components/ui/RichTextEditor";

function MyComponent() {
  const [content, setContent] = useState("");

  return (
    <RichTextEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
      className="min-h-[400px]"
    />
  );
}
```

### Props

- `content: string` - HTML content to display/edit
- `onChange: (content: string) => void` - Called when content changes
- `placeholder?: string` - Placeholder text (default: "Start writing...")
- `className?: string` - Additional CSS classes

### Content Storage

Content is stored as HTML in Firestore:

```typescript
// Saving to Firebase
await db.collection("NEWS_ARTICLES").doc(id).set({
  content: editorContent, // HTML string from editor
  // ... other fields
});

// Loading from Firebase
const article = await db.collection("NEWS_ARTICLES").doc(id).get();
setEditorContent(article.data().content); // HTML string
```

### Toolbar Features

| Button | Feature         | Keyboard Shortcut |
| ------ | --------------- | ----------------- |
| ↶      | Undo            | Ctrl+Z            |
| ↷      | Redo            | Ctrl+Y            |
| H1     | Heading 1       | Ctrl+Alt+1        |
| H2     | Heading 2       | Ctrl+Alt+2        |
| H3     | Heading 3       | Ctrl+Alt+3        |
| **B**  | Bold            | Ctrl+B            |
| _I_    | Italic          | Ctrl+I            |
| `<>`   | Inline Code     | Ctrl+E            |
| •      | Bullet List     | Ctrl+Shift+8      |
| 1.     | Numbered List   | Ctrl+Shift+7      |
| "      | Blockquote      | Ctrl+Shift+B      |
| 🔗     | Insert Link     | -                 |
| 🖼️     | Insert Image    | -                 |
| —      | Horizontal Rule | -                 |

### Customization

#### Adding New Extensions

```tsx
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CustomExtension from "@tiptap/extension-custom";

const editor = useEditor({
  extensions: [
    StarterKit,
    CustomExtension.configure({
      // configuration options
    }),
  ],
});
```

#### Custom Toolbar Buttons

```tsx
const ToolbarButton = ({
  onClick,
  active = false,
  disabled = false,
  children,
  title,
}: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded hover:bg-gray-100 ${
      active ? "bg-gray-200 text-teal-600" : "text-gray-600"
    }`}
  >
    {children}
  </button>
);
```

### Styling

TipTap uses the `.ProseMirror` class for the editor content area. Custom styles are in `globals.css`:

```css
.ProseMirror h1 {
  @apply text-3xl font-bold mb-4 mt-6;
}

.ProseMirror p {
  @apply mb-3;
}

.ProseMirror a {
  @apply text-teal-600 hover:text-teal-800 underline;
}
```

## Troubleshooting

### Editor Not Loading

- Check that TipTap packages are installed: `npm list @tiptap/react`
- Ensure component has `'use client'` directive
- Check browser console for errors

### Content Not Saving

- Verify `onChange` callback is connected to state
- Check that form submission includes `content` field
- Verify Firebase permissions allow writes

### Formatting Not Appearing

- Check that `globals.css` is imported in layout
- Verify TipTap styles are loaded
- Check browser inspector for conflicting CSS

### Links/Images Not Working

- Ensure URL prompts are not blocked by browser
- Verify entered URLs are valid and accessible
- Check that extensions are configured correctly

## Best Practices

### Content Creation

1. **Use Headings Hierarchically:** H1 → H2 → H3 (don't skip levels)
2. **Keep Paragraphs Short:** 2-3 sentences for readability
3. **Use Lists for Steps:** Bullet or numbered lists for clarity
4. **Add Alt Text:** For images (future enhancement)
5. **Test Links:** Ensure all links work before publishing

### Technical

1. **Store HTML in Database:** Don't convert to markdown/plain text
2. **Sanitize Output:** Use DOMPurify if displaying user-generated content
3. **Version Control:** Consider saving draft versions separately
4. **Lazy Load Editor:** For better performance on slow connections
5. **Validate Content:** Check for required fields before saving

## Examples

### Simple Article

```html
<h1>Breaking News: New Treatment Program</h1>
<p>We're excited to announce the launch of our new treatment program.</p>
<h2>What's Included</h2>
<ul>
  <li>Individual counseling</li>
  <li>Group therapy</li>
  <li>Family support</li>
</ul>
<p>Learn more at <a href="/programs">our programs page</a>.</p>
```

### Article with Quote

```html
<h1>Recovery Story: Sarah's Journey</h1>
<p>Sarah has been in recovery for 5 years.</p>
<blockquote>"Recovery gave me my life back. Every day is a gift."</blockquote>
<p>Her story inspires us all.</p>
```

### Article with Image

```html
<h1>Annual Recovery Walk Success</h1>
<p>Over 500 people attended our annual recovery walk.</p>
<img src="/images/recovery-walk-2024.jpg" alt="Recovery Walk 2024" />
<p>Thank you to everyone who participated!</p>
```

## Resources

- [TipTap Documentation](https://tiptap.dev/)
- [TipTap Examples](https://tiptap.dev/examples)
- [TipTap Extensions](https://tiptap.dev/extensions)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## Support

For technical issues, contact the development team or check:

- Browser console for JavaScript errors
- Network tab for API failures
- Firebase console for database errors
