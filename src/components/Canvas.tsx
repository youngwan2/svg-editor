import styles from '../styles/Canvas.module.css';

import { MouseEvent, useEffect, useState } from 'react';

interface CanvasProps {
    shapes: any[];
    setShapes: (shapes: any[]) => void;
    selectedShape: any | null;
    setSelectedShape: (shape: any) => void;
    canvasRef: React.RefObject<SVGSVGElement>; // canvasRef 추가
}

export default function Canvas({ shapes, setShapes, selectedShape, setSelectedShape, canvasRef }: CanvasProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && selectedShape) {
                const dx = e.clientX - dragStart.x;
                const dy = e.clientY - dragStart.y;
                const updatedShape = { ...selectedShape, x: dragOffset.x + dx, y: dragOffset.y + dy };
                setSelectedShape(updatedShape);
                setShapes(shapes.map(shape => (shape.id === selectedShape.id ? updatedShape : shape)));
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart, dragOffset, selectedShape, shapes, setShapes, setSelectedShape]);

    const handleMouseDown = (e: any) => {
        if (e.target instanceof SVGElement && e.target.id) {
            const shape = shapes.find(shape => shape.id === e.target.id);
            if (shape) {
                setSelectedShape(shape);
                setIsDragging(true);
                setDragStart({ x: e.clientX, y: e.clientY });
                setDragOffset({ x: shape.x, y: shape.y });
            }
        }
    };

    return (
        <div className={styles['canvas-container']}>
            <svg ref={canvasRef} id="svgCanvas" viewBox="0 0 800 600" onMouseDown={handleMouseDown}>
                {shapes.map(shape => {
                    switch (shape.type) {
                        case 'rect':
                            return <rect key={shape.id} id={shape.id} x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
                        case 'circle':
                            return <circle key={shape.id} id={shape.id} cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} r={shape.width / 2} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
                        case 'ellipse':
                            return <ellipse key={shape.id} id={shape.id} cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} rx={shape.width / 2} ry={shape.height / 2} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
                        default:
                            return null;
                    }
                })}
            </svg>

        </div>
    );
};