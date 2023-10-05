import { useState, useCallback, useLayoutEffect } from "react";

type Dimensions = {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
};

export const useDimensions = <H extends Element>(liveMeasure: boolean) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  });
  const [node, setNode] = useState<H>();

  const ref = useCallback((node: H) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));
      measure();
      if (liveMeasure) {
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure);
        return () => {
          window.removeEventListener("resize", measure);
          window.removeEventListener("scroll", measure);
        };
      }
    }
  }, [node]);

  const getDimensionObject = (node: H): Dimensions => {
    const rect = node.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      x: rect.x,
      y: rect.y,
      right: rect.right,
      bottom: rect.bottom,
    };
  };

  return {
    ref,
    dimensions,
  };
};
