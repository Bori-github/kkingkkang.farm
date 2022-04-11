import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { PRIMARY } from '../../constants/colors';

type LoaderProps = {
  height: string;
};

export const Loader = ({ height }: LoaderProps) => {
  return (
    <Section height={height}>
      <h2 className="sr-only">잠시만 기다려주세요.</h2>
      <ContainerSpinner>
        <BorderCircle>
          <CoreCircle />
        </BorderCircle>
      </ContainerSpinner>
    </Section>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
`;

const Section = styled.section<LoaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props && props.height};
  /* height: calc(100vh - 109px); */
`;

const ContainerSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: transparent;
`;

const BorderCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 3px;
  border-radius: 50%;
  background: ${PRIMARY};
  background: linear-gradient(
    0deg,
    rgba(63, 249, 220, 0.1) 33%,
    ${PRIMARY} 100%
  );
  animation: ${spin} 0.8s linear 0s infinite;
`;

const CoreCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
`;
