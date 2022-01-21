import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderBtnUpload } from '../components/layouts/Header';

const Upload: NextPage = () => {
  return (
    <>
      <Head>
        <title>게시글 업로드ㅣ낑깡팜</title>
      </Head>
      <HeaderBtnUpload />
      <main>
        <section>
          <div>
            <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
          </div>
          <form action="#">
            <label htmlFor="textUpload">
              <span className="sr-only">게시글을 작성해주세요</span>
              <textarea
                name="textarea"
                id="textUpload"
                placeholder="게시글 입력하기"
              />
            </label>
          </form>
        </section>
      </main>
      <button type="button">
        <span className="sr-only">사진 업로드 버튼</span>
      </button>
    </>
  );
};

export default Upload;
