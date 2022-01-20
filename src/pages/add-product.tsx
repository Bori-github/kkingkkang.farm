import { NextPage } from 'next';
import { HeaderBtnSave } from '../components/layouts/Header';

const AddProduct: NextPage = () => {
  return (
    <>
      <HeaderBtnSave />
      <main>
        <section>
          <h2 className="sr-only">상품 등록 페이지</h2>
          <form action="#">
            <div>
              <label htmlFor="upload-img">
                이미지 등록
                <div>
                  <span>이미지 미리보기</span>
                  {/* <img src="" alt="" /> */}
                </div>
                <input type="file" id="uploadImg" accept="img/*" required />
              </label>
            </div>
            <div>
              <label htmlFor="nameProduct">
                상품명
                <input
                  type="text"
                  id="nameProduct"
                  placeholder="2~15자 이내여야 합니다."
                  minLength={2}
                  maxLength={15}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="priceProduct">
                가격
                <input
                  type="number"
                  id="priceProduct"
                  placeholder="숫자만 입력 가능합니다."
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="urlProduct">
                판매 링크
                <input
                  type="text"
                  id="urlProduct"
                  placeholder="URL을 입력해주세요."
                  required
                />
              </label>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddProduct;
