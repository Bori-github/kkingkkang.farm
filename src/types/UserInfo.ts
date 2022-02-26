export interface UserInfo {
  profile: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    isfollow: boolean;
    following: [];
    follower: [];
    followerCount: number;
    followingCount: number;
  };
}
