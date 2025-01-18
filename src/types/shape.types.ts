export type Shape = {
    id: string;
    type: 'rect' | 'circle' | 'ellipse';
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
};
