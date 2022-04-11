import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styled from '@emotion/styled';

interface ImgCarouselProps {
  imgList: string[];
}

export const ImgCarousel = ({ imgList }: ImgCarouselProps) => {
  return (
    <Carousel
      showStatus={false}
      showArrows={false}
      showThumbs={false}
      renderIndicator={(onClickHandler, isSelected, index) => {
        const indicatorStyle = {
          display: 'inline-block',
          width: 8,
          height: 8,
          padding: 0,
          margin: '0 5px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          cursor: 'pointer',
        };
        const style = isSelected
          ? { ...indicatorStyle, backgroundColor: 'white' }
          : { ...indicatorStyle };

        const indicator = imgList.length > 1 && (
          <button
            type="button"
            style={style}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            tabIndex={0}
          >
            <span className="sr-only">포스트 이미지 {index + 1}</span>
          </button>
        );

        return indicator;
      }}
    >
      {imgList.map((img) => {
        return (
          <ItemCarousel key={`post-item-${Math.random()}`}>
            <Img src={img} alt="피드 이미지" />
          </ItemCarousel>
        );
      })}
    </Carousel>
  );
};

const ItemCarousel = styled.div``;

const Img = styled.img`
  border-radius: 5px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;
