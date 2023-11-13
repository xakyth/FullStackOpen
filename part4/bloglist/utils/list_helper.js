const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((acc, cur) => acc + cur.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((maxLikes, cur) => (cur.likes > maxLikes.likes ? cur : maxLikes), blogs[0]);
};

module.exports = { dummy, totalLikes, favoriteBlog };
