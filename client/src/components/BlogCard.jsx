import { Link } from "react-router-dom";

function stripMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/#{1,6}\s?/g, '')       // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1')     // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
    .replace(/!\[.*?\]\(.+?\)/g, '') // Remove images
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Remove inline/block code
    .replace(/\n/g, ' ')             // Replace newlines with spaces
    .replace(/\s+/g, ' ')           // Collapse multiple spaces
    .trim()
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

const BlogCard = ({ blog }) => {
  
  const snippet = stripMarkdown(blog.content).slice(0, 150)

  return (
    <article className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
            <Link to={`/blogs/${blog._id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                {blog.title}
            </Link>

            <p className="text-gray-700 mt-2">{snippet}{snippet.length >= 150 ? '...' : ''}</p>

            <div className="mt-4 text-sm text-gray-500">
                <span>By {blog.author.name}</span> | <span>{formatDate(blog.createdAt)}</span>
            </div>
        </div>
    </article>
    )
    }

    export default BlogCard