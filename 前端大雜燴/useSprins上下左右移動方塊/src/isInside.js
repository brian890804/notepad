export const isInside = (element, coordinate) => {
  const { left, right, bottom, top } = element.getBoundingClientRect();
  // if bottom and right not exist then it's a point
  if (!coordinate.right || !coordinate.bottom) {
    console.log(coordinate.left, right);
    if (coordinate.left > right || coordinate.left < left) {
      return false;
    }

    if (coordinate.top > bottom || coordinate.top < top) {
      return false;
    }
  } else {
    if (
      coordinate.left < left ||
      coordinate.top < top ||
      coordinate.right > right ||
      coordinate.bottom > bottom
    ) {
      return false;
    }
  }

  return true;
};
