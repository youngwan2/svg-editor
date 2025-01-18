import styles from '../styles/ShapeControls.module.css';
import React, { ChangeEvent } from 'react';


interface ShapeControlsProps {
    shapes: any[];
    selectedShape: any | null;
    setSelectedShape: (shape: any) => void;
    updateShapes: (shapes: any[]) => void;
    onExportSvg: () => void;
}

const ShapeControls: React.FC<ShapeControlsProps> = ({ shapes, selectedShape, setSelectedShape, updateShapes, onExportSvg }) => {

    const handleShapeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const shape = shapes.find(s => s.id === e.target.value);
        setSelectedShape(shape);
    };

    const handleAddShape = (type: string) => {
        const newShape = {
            id: `shape${shapes.length + 1}`,
            type,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            fill: '#ff0000',
            stroke: '#000000',
            strokeWidth: 1
        };
        updateShapes([...shapes, newShape]);
    };

    return (
        <div className={styles.controls}>
            <div className={styles['control-group']}>
                <h3>Add Shape</h3>
                <button onClick={() => handleAddShape('rect')}>Add Rectangle</button>
                <button onClick={() => handleAddShape('circle')}>Add Circle</button>
                <button onClick={() => handleAddShape('ellipse')}>Add Ellipse</button>
            </div>

            <div className={styles['control-group']}>
                <h3>Selected Shape</h3>
                <select value={selectedShape ? selectedShape.id : ''} onChange={handleShapeSelect}>
                    <option value="">Select a shape</option>
                    {shapes.map(shape => (
                        <option key={shape.id} value={shape.id}>{`${shape.type} ${shape.id}`}</option>
                    ))}
                </select>
            </div>

            {selectedShape && (
                <div className={styles['control-group']}>
                    <h3>Properties</h3>
                    <label>Fill Color</label>
                    <input type="color" value={selectedShape.fill} onChange={e => updateShapeProperty('fill', e.target.value)} />
                    <label>Stroke Color</label>
                    <input type="color" value={selectedShape.stroke} onChange={e => updateShapeProperty('stroke', e.target.value)} />
                    <label>Stroke Width</label>
                    <input type="number" value={selectedShape.strokeWidth} onChange={e => updateShapeProperty('strokeWidth', parseInt(e.target.value))} min="0" max="20" />
                </div>
            )}
            <div className={styles['control-group']}>
                <button
                    className={styles.exportButton}
                    onClick={onExportSvg} // 내보내기 함수 호출
                >
                    Export SVG
                </button>
            </div>
        </div>
    );

    function updateShapeProperty(prop: string, value: any) {
        if (selectedShape) {
            const updatedShape = { ...selectedShape, [prop]: value };
            setSelectedShape(updatedShape);
            updateShapes(shapes.map(shape => (shape.id === selectedShape.id ? updatedShape : shape)));
        }
    }
}

export default ShapeControls;