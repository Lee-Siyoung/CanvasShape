export const RotateTriangleXY = (
  point: { x: number; y: number },
  centerX: number,
  centerY: number,
  angle: number
) => {
  const cos = Math.cos((angle * Math.PI) / 180);
  const sin = Math.sin((angle * Math.PI) / 180);
  const dx = point.x - centerX;
  const dy = point.y - centerY;
  const rotatedX = dx * cos - dy * sin;
  const rotatedY = dx * sin + dy * cos;
  return { x: rotatedX + centerX, y: rotatedY + centerY };
};
