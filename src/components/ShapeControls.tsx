import styles from '../styles/ShapeControls.module.css';
import { ChangeEvent } from 'react';
import { Shape, ShapeTypeL } from '../types/shape.types';
import { createShape } from '../utils/shapes';
import toast from 'react-hot-toast/headless';


interface ShapeControlsProps {
    shapes: Shape[];
    selectedShape: Shape | null;
    setSelectedShape: (shape: Shape | null) => void;
    updateShapes: (shapes: Shape[]) => void;
    onExportSvg: () => void;
}

export default function ShapeControls({ shapes, selectedShape, setSelectedShape, updateShapes, onExportSvg }: ShapeControlsProps) {

    const handleShapeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const shape = shapes.find(s => s.id === e.target.value);
        if (!Array.isArray(shape)) return

        setSelectedShape(shape);
    };

    // 모양 삭제(전체)
    const handleAllRemoveShape = () => {
        if (shapes.length < 1) return toast("No created shapes")
        const isRemove = confirm("Are you sure? Deleting this will remove everything. Can you be confident you won't regret it?");
        if (isRemove) {
            updateShapes([])
        }
    }


    // 모양 삭제
    const handleRemoveShape = () => {
        if (!selectedShape) return toast("No selected shape")

        const isRemove = confirm("Are you sure? The selected shape will be deleted");

        if (isRemove) {
            updateShapes(shapes.filter(s => s.id !== selectedShape.id));
            setSelectedShape(null)
        }
    }


    // 모양 추가
    const handleAddShape = (selectedType: ShapeTypeL) => {
        const newShape = createShape(shapes.length + 1, selectedType)
        updateShapes([...shapes, newShape]);
    };

    return (
        <div className={styles.controls}>
            {/* 내보내기 */}
            <div className={styles['control-group']}>
                <button
                    className={styles.exportButton}
                    onClick={onExportSvg} // 내보내기 함수 호출
                >
                    Export SVG
                </button>
            </div>
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

            {/* 선택된 도형 속성 선택기 */}
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
                            if (value >= 0) {
                                updateShapeProperty('strokeWidth', value);
                            }
                        }} min="0" max="20" />
                    <label>Shape Width</label>
                    <input type="number" value={selectedShape.width}
                        onChange={e => {
                            const value = parseInt(e.target.value);
                            if (value >= 0) {
                                updateShapeProperty('width', value);
                            }
                        }} min="0" max="1000" />
                    <label>Shape Height</label>
                    <input type="number" value={selectedShape.height}
                        onChange={e => {
                            const value = parseInt(e.target.value);
                            if (value >= 0) {
                                updateShapeProperty('height', value);
                            }
                        }} min="0" max="1000" />
                </div>
            )}

            {/* 도형 삭제 */}
            <div className={styles['control-group']}>
                <h3>Deletion Risk Zone</h3>
                <button
                    className={styles.removeButton}
                    onClick={handleRemoveShape}
                >
                    Remove Selected SVG
                </button>
                <button
                    className={styles.removeButton}
                    onClick={handleAllRemoveShape}
                >
                    All Remove Selected SVG
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