const getTopLeftPosition = (x: number, y:number, childRect: DOMRect, parentRect: DOMRect) => {
  const marginSize = 15;

  let left = Math.min(x - childRect.x | marginSize);
  if (left + childRect.width + marginSize > parentRect.width) {
    left = parentRect.width - childRect.width - marginSize; // or right?
  }
  let top = Math.min(y - childRect.y | marginSize);
  if (top + childRect.height + marginSize > parentRect.height) {
    top = parentRect.height - childRect.height - marginSize; // or bottom?
  }

  return {
    top,
    left
  }
}

export default getTopLeftPosition;
