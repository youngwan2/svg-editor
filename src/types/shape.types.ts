

export interface ShapeType {
    id: string;


    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
};

export interface Shape extends ShapeType {
    type: 'rect' | 'circle' | 'ellipse' | 'polygon'
}

export type ShapeTypeL = 'rect' | 'circle' | 'ellipse' | 'polygon'
