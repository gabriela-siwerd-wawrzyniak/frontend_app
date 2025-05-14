import { API_KEY, BLOG_POSTS_URL } from 'constants/api';

import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from 'store/authStore';

import Post, { BlogPost, BlogPostStatus } from "components/posts/Post";

import styles from 'components/posts/Posts.module.scss';

const PostsList = () => {
  const { id } = useAuthStore();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserBlogPosts = async () => {
    try {
      if (!id) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(BLOG_POSTS_URL(id), {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data: BlogPost[] = await response.json();
      setBlogPosts(data);
    } catch (err) {
      setError('Error fetching blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchUserBlogPosts();
  }, []);

  return (
    <>
        {loading ? (
          <span className={styles['spinner']} />
        ) : error ? (
          <p className={styles['error']}>{error}</p>
        ) : (
          <div className={styles['posts-list']}>
            {blogPosts
              .filter(post => post.status === BlogPostStatus.Posted)
              .map(post => (
                <Post key={post.id} post={post} />
              ))}
          </div>
        )}
    </>
  );
};

export default PostsList;
