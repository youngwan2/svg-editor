import { Shape } from '../types/shape.types';

export const startDrag = (
    e: React.MouseEvent<SVGElement>,
    shapes: Shape[],
    setSelectedShape: React.Dispatch<React.SetStateAction<Shape | null>>,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setDragStart: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    setOriginalPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
): void => {
    if (e.target instanceof SVGSVGElement) return;

    const shapeId = (e.target as SVGElement).id;
    const shape = shapes.find(s => s.id === shapeId);
    if (shape) {
        setSelectedShape(shape);
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setOriginalPos({ x: shape.x, y: shape.y });
    }
};

export const drag = (
    e: React.MouseEvent,
    isDragging: boolean,
    selectedShape: Shape | null,
    dragStart: { x: number; y: number },
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    originalPos: { x: number; y: number }
): void => {
    if (!isDragging || !selectedShape) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setShapes(prevShapes =>
        prevShapes.map(shape =>
            shape.id === selectedShape.id
                ? { ...shape, x: originalPos.x + dx, y: originalPos.y + dy }
                : shape
        )
    );
};

export const endDrag = (
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    setIsDragging(false);
};
