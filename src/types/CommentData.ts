export interface CommentData {
  id: string;
  content: string;
  createdAt: string;
  author: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  };
}
