import { API_KEY, BLOG_POSTS_URL } from 'constants/api';
import { rootPath } from 'constants/routes';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from 'store/authStore';

import { formatDate } from 'utils/formatting';

import styles from 'styles/Home.module.scss';

enum BlogPostStatus {
  Posted = 'posted',
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
}

type BlogPost = {
  id: number;
  title: string;
  content: string;
  created: string;
  published: string;
  status: BlogPostStatus;
};

const Home = () => {
  const navigate = useNavigate();
  const { id, firstName, loginDate, clearAuth } = useAuthStore();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    clearAuth();
    navigate(rootPath);
  };

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
    <main>
      <header className={styles['header']}>
        <h1>Home Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <section className={styles['home-container']}>
        <div className={styles['home-text']}>Welcome, {firstName ?? 'Guest'}</div>
        <div className={styles['home-text']}>
          Last time you logged in was: {formatDate(loginDate)}
        </div>
        {loading ? (
          <span className={styles['spinner']} />
        ) : error ? (
          <p className={styles['error']}>{error}</p>
        ) : (
          <div className={styles['posts-list']}>
            {blogPosts
              .filter(post => post.status === BlogPostStatus.Posted)
              .map(post => (
                <div key={post.id} className={styles['post-container']}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <p className={styles['post-meta']}>
                    Created: {formatDate(post.created)}
                    <br />
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
