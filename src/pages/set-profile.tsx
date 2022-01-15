import { NextPage } from 'next';
import Head from 'next/head';

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>프로필 설정ㅣ낑깡팜</title>
      </Head>
      <main>
        <h2>프로필 설정</h2>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
        <div>
          <img src="/default-profile-w.png" alt="기본 프로필 이미지" />
          <button type="button">업로드</button>
        </div>
        <form>
          <div>
            <label htmlFor="name">
              사용자 이름
              <input
                type="text"
                id="name"
                placeholder="2~10자 이내여야 합니다."
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="id">
              계정 ID
              <input
                type="text"
                id="id"
                placeholder="영문, 숫자, 특주문자(.),(_)만 사용 가능합니다."
                required
              />
            </label>
            <span>*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.</span>
            <span>*이미 사용 중인 ID 입니다.</span>
          </div>
          <div>
            <label htmlFor="introduce">
              소개
              <input
                type="text"
                id="introduce"
                placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
                required
              />
            </label>
          </div>
          <button type="submit">낑깡팜 시작하기</button>
        </form>
      </main>
    </>
  );
};

export default Signup;
