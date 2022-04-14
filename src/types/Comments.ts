export interface Comments {
  id: string;
  content: string;
  createdAt: string;
  author: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    following: [];
    follower: [];
    followerCount: number;
    followingCount: number;
  };
}
