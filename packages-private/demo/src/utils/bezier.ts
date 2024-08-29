/**
 * Bezier curve function
 * @example
 * const P0 = [120.872, 30.032]; // start point
 * const P1 = [120.873, 30.0325]; // control point
 * const P2 = [120.873, 30.031]; // end point
 * const curvePoints = [];
 * for (let t = 0; t <= 1; t += 0.01) {
 *  curvePoints.push(bezier(t, P0, P1, P2));
 * }
 */
export default function bezier(t: number, P0: number[], P1: number[], P2: number[]): number[] {
  const x = (1 - t) * (1 - t) * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0]
  const y = (1 - t) * (1 - t) * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1]
  return [x, y]
}
