import styled from "@emotion/styled";

const ImageComponent = (props) => {
  const { height = 50, width = 100, isCover = false } = props;
  return (
    <ImageComponentElement height={height} width={width} isCover={isCover}>
      <img {...props} />
    </ImageComponentElement>
  );
};
export default ImageComponent;

const ImageComponentElement = styled.div`
  /*  */
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width}%;
  transition: 0.3s;
  padding-bottom: ${({ height }) => height}%;

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: ${({ isCover }) => (isCover ? "cover" : "contain")};
    -webkit-touch-callout: none;
    user-select: none;
  }
`;
