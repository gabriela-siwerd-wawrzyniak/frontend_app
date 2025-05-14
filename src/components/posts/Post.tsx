import { formatDate } from 'utils/formatting';

import styles from 'components/posts/Posts.module.scss';

export enum BlogPostStatus {
  Posted = 'posted',
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
}

export type BlogPost = {
  id: number;
  title: string;
  content: string;
  created: string;
  published: string;
  status: BlogPostStatus;
};

type PostProps = {
  post: BlogPost;
};

const Post = ({ post }: PostProps) => {
  return (
    <div className={styles['post-container']}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p className={styles['post-meta']}>
        Created: {formatDate(post.created)}
        <br />
      </p>
    </div>
  );
};

export default Post;