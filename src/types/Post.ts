export interface Post {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  hearted: boolean;
  heartCount: number;
  comments: [];
  commentCount: number;
  author: {
    _id: string;
    username: string;
    accountname: string;
    image: string;
    following: [];
    follower: [];
    followerCount: number;
    followingCount: number;
  };
}
