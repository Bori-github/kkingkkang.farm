import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderChat } from '../components/layouts/Header';
import { SectionInpChat } from '../components/SectionInput';
import { UserAvatar } from '../components/UserAvatar';
import { USER_AVATAR } from '../constants';

const Chat: NextPage = () => {
  return (
    <>
      <Head>
        <title>채팅 유저 이름ㅣ낑깡팜</title>
      </Head>
      <HeaderChat />
      <main>
        <div>
          <UserAvatar
            size={USER_AVATAR.sm.size}
            padding={USER_AVATAR.sm.padding}
          />
          <div>
            <div>
              <span>
                옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
                뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할
                넣는 풍부하게 뛰노는 인생의 힘있다.
              </span>
            </div>
            <span>12:39</span>
          </div>
        </div>
        <div>
          <UserAvatar
            size={USER_AVATAR.sm.size}
            padding={USER_AVATAR.sm.padding}
          />
          <div>
            <div>
              <span>안녕하세요. 낑깡 사고싶어요오오오오</span>
            </div>
            <span>12:41</span>
          </div>
        </div>
        <div>
          <div>
            <div>
              <span>네 말씀하세요.</span>
            </div>
            <span>12:50</span>
          </div>
        </div>
      </main>
      <SectionInpChat />
    </>
  );
};

export default Chat;
