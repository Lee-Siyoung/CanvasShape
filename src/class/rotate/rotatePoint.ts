export const rotatePoint = (
  point: { x: number; y: number },
  centerX: number,
  centerY: number,
  rotation: number
) => {
  const cos = Math.cos((rotation * Math.PI) / 180);
  const sin = Math.sin((rotation * Math.PI) / 180);
  const dx = point.x - centerX;
  const dy = point.y - centerY;
  return {
    x: dx * cos - dy * sin + centerX,
    y: dx * sin + dy * cos + centerY,
  };
};
