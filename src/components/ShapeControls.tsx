import styles from '../styles/ShapeControls.module.css';
import { ChangeEvent } from 'react';


interface ShapeControlsProps {
    shapes: any[];
    selectedShape: any | null;
    setSelectedShape: (shape: any) => void;
    updateShapes: (shapes: any[]) => void;
    onExportSvg: () => void;
}

export default function ShapeControls({ shapes, selectedShape, setSelectedShape, updateShapes, onExportSvg }: ShapeControlsProps) {

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
                <button onClick={() => handleAddShape('polygon')}>Add Polygon</button>
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
                    <input type="number" value={selectedShape.strokeWidth}
                        onChange={e => {
                            const value = parseInt(e.target.value);
                            if (value > 0) {
                                updateShapeProperty('strokeWidth', value);
                            }
                        }} min="0" max="20" />
                    <label>Shape Width</label>
                    <input type="number" value={selectedShape.width}
                        onChange={e => {
                            const value = parseInt(e.target.value);
                            if (value > 0) {
                                updateShapeProperty('width', value);
                            }
                        }} min="1" max="1000" />
                    <label>Shape Height</label>
                    <input type="number" value={selectedShape.height}
                        onChange={e => {
                            const value = parseInt(e.target.value);
                            if (value > 0) {
                                updateShapeProperty('height', value);
                            }
                        }} min="1" max="1000" />
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

    /** 선택된 모양의 속성 업데이트 */
    function updateShapeProperty(prop: string, value: any) {
        if (selectedShape) {
            const updatedShape = { ...selectedShape, [prop]: value };
            setSelectedShape(updatedShape);
            updateShapes(shapes.map(shape => (shape.id === selectedShape.id ? updatedShape : shape)));
        }
    }
}