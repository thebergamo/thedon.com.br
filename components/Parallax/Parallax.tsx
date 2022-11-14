import React, { useRef, useEffect, useState, PropsWithChildren } from 'react';
import { useScrollInfo } from '@faceless-ui/scroll-info';
import { useWindowInfo } from '@faceless-ui/window-info';

type TParallax = {
  className?: string;
  yDistance?: number;
  htmlElement?: React.ElementType;
  style?: React.CSSProperties;
};

export const Parallax: React.FC<PropsWithChildren<TParallax>> = (props) => {
  const {
    htmlElement: HtmlElement = 'div',
    children,
    yDistance = 50,
    className,
    style
  } = props;

  const windowInfo = useWindowInfo();
  const scrollInfo = useScrollInfo();

  const scrollYPos = scrollInfo ? scrollInfo.y : 0;
  const windowHeight = windowInfo ? windowInfo.height : 0;

  const [localWindowHeight, setLocalWindowHeight] = useState(windowHeight);
  const [translateY, setTranslateY] = useState(0);
  const ref = useRef(null);
  const { current: node } = ref;

  useEffect(() => {
    if (node) {
      const { y: nodeYPos, height: nodeHeight } = node.getBoundingClientRect();
      const isNotAboveViewport = nodeYPos + nodeHeight > 0;
      const isNotBelowViewport = localWindowHeight - nodeYPos > -1000;

      if (isNotAboveViewport && isNotBelowViewport) {
        const percentOfWindowTraveled = nodeYPos / localWindowHeight;
        setTranslateY(percentOfWindowTraveled * yDistance);
      }
    }
  }, [node, scrollYPos, yDistance, localWindowHeight]);

  useEffect(() => {
    const sizeDifference = 200;
    if (
      windowHeight > localWindowHeight + sizeDifference ||
      windowHeight < localWindowHeight - sizeDifference
    ) {
      setLocalWindowHeight(windowHeight);
    }
  }, [localWindowHeight, windowHeight]);

  const combinedStyles = {
    ...style,
    transform: `translate3d(0, ${translateY}px, 0)`
  };

  return (
    <HtmlElement
      ref={ref}
      className={['animate-parallax', className].filter(Boolean).join(' ')}
      style={combinedStyles}
    >
      {children}
    </HtmlElement>
  );
};

export default Parallax;
