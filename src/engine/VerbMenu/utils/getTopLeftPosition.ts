const getTopLeftPosition = (x: number, y:number, childRect: DOMRect, parentRect: DOMRect) => {
  const marginSize = 15;
  //console.log('%c [mr]', 'background-color:Gold; color: black', x , parentRect, window.pageXOffset, document.documentElement.clientLeft);
  let left = Math.min(x - parentRect.x - window.pageXOffset | marginSize);
  if (left + childRect.width + marginSize > parentRect.width) {
    left = parentRect.width - childRect.width - marginSize; // or right?
  }
  let top = Math.min(y - parentRect.y - window.pageYOffset | marginSize);
  if (top + childRect.height + marginSize > parentRect.height) {
    top = parentRect.height - childRect.height - marginSize; // or bottom?
  }

  return {
    top,
    left
  };
};

export default getTopLeftPosition;
