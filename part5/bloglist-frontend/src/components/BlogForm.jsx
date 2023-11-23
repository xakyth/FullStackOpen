const BlogForm = ({ handleBlogCreation }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleBlogCreation}>
      <div>title:<input type="text" name="title"></input></div>
      <div>author:<input type="text" name="author"></input></div>
      <div>url:<input type="text" name="url"></input></div>
      <div><button type="submit">create</button></div>
    </form>
  </div>
)

export default BlogForm