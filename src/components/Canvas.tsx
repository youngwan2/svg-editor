import styles from '../styles/Canvas.module.css';

import { useEffect, useState } from 'react';

import { getPolygonPoints } from '../utils/shapes';


interface CanvasProps {
    shapes: any[];
    setShapes: (shapes: any[]) => void;
    selectedShape: any | null;
    setSelectedShape: (shape: any) => void;
    canvasRef: React.RefObject<SVGSVGElement>; // canvasRef 추가
}

export default function Canvas({ shapes, setShapes, selectedShape, setSelectedShape, canvasRef }: CanvasProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // 드래그 시작 좌표
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // 도형의 초기 위치(도형 드래그 시 지속적으로 상태가 업데이트 됨)


    useEffect(() => {
        //  도형 이동
        const handleMouseMove = (e: any) => {
            if (isDragging && selectedShape) {
                const dx = e.clientX - dragStart.x; // 도형의 실제 시작 위치
                const dy = e.clientY - dragStart.y; // -- 위와 동일 --
                const updatedShape = { ...selectedShape, x: dragOffset.x + dx, y: dragOffset.y + dy }; // 도형이 이동한 상대적 위치를 계산하여 상태 업데이트
                setSelectedShape(updatedShape);
                setShapes(shapes.map(shape => (shape.id === selectedShape.id ? updatedShape : shape)));
            }
        };


        // 드래그 상태 관리

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

    const getPolygonPoints = (x: number, y: number, width: number, height: number, sides: number) => {
        const angle = (2 * Math.PI) / sides;
        const points = [];
        for (let i = 0; i < sides; i++) {
            const px = x + width * Math.cos(i * angle);
            const py = y + height * Math.sin(i * angle);
            points.push(`${px},${py}`);
        }
        return points.join(' ');
    };

    return (
        <div className={styles.canvas__container}>
            <svg ref={canvasRef} className={styles.canvas} viewBox="0 0 800 600" onMouseDown={handleMouseDown}>
                {shapes.map(shape => {
                    switch (shape.type) {
                        case 'rect':
                            return <rect key={shape.id} id={shape.id} x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
                        case 'circle':
                            return <circle key={shape.id} id={shape.id} cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} r={shape.width / 2} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
                        case 'ellipse':
                            return <ellipse key={shape.id} id={shape.id} cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} rx={shape.width / 2} ry={shape.height / 2} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
                        case 'polygon':
                            const points = getPolygonPoints(shape.x, shape.y, shape.width / 2, shape.height / 2, shape.sides || 6); // 6 sides by default
                            return (
                                <polygon
                                    key={shape.id}
                                    id={shape.id}
                                    points={points}
                                    fill={shape.fill}
                                    stroke={shape.stroke}
                                    strokeWidth={shape.strokeWidth}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </svg>

        </div>
    );
};