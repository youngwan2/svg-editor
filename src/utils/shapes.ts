import { Shape } from '../types/shape.types';

export const addShape = (
    shapes: Shape[],
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    shapeCounter: number,
    type: 'rect' | 'circle' | 'ellipse'
): void => {
    const newShape: Shape = {
        id: `shape${shapeCounter}`,
        type,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        fill: '#ff0000',
        stroke: '#000000',
        strokeWidth: 1,
    };

    setShapes([...shapes, newShape]);
};

export const deleteSelected = (
    selectedShape: Shape | null,
    shapes: Shape[],
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    setSelectedShape: React.Dispatch<React.SetStateAction<Shape | null>>
): void => {
    if (selectedShape) {
        setShapes(shapes.filter(s => s.id !== selectedShape.id));
        setSelectedShape(null);
    }
};

export const importSVG = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    shapeCounter: number
): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
        const text = await file.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');

        if (svgElement) {
            const importableElements = svgElement.querySelectorAll('rect, circle, ellipse');
            const newShapes: Shape[] = [];

            importableElements.forEach(element => {
                const shape: Shape = {
                    id: `shape${shapeCounter + newShapes.length}`,
                    type: element.tagName as 'rect' | 'circle' | 'ellipse',
                    fill: element.getAttribute('fill') || '#000000',
                    stroke: element.getAttribute('stroke') || '#000000',
                    strokeWidth: parseInt(element.getAttribute('stroke-width') || '1', 10),
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                };

                if (element.tagName === 'rect') {
                    shape.x = parseInt(element.getAttribute('x') || '0', 10);
                    shape.y = parseInt(element.getAttribute('y') || '0', 10);
                    shape.width = parseInt(element.getAttribute('width') || '100', 10);
                    shape.height = parseInt(element.getAttribute('height') || '100', 10);
                } else if (element.tagName === 'circle') {
                    const cx = parseInt(element.getAttribute('cx') || '0', 10);
                    const cy = parseInt(element.getAttribute('cy') || '0', 10);
                    const r = parseInt(element.getAttribute('r') || '50', 10);
                    shape.width = r * 2;
                    shape.height = r * 2;
                    shape.x = cx - r;
                    shape.y = cy - r;
                } else if (element.tagName === 'ellipse') {
                    const cx = parseInt(element.getAttribute('cx') || '0', 10);
                    const cy = parseInt(element.getAttribute('cy') || '0', 10);
                    const rx = parseInt(element.getAttribute('rx') || '50', 10);
                    const ry = parseInt(element.getAttribute('ry') || '25', 10);
                    shape.width = rx * 2;
                    shape.height = ry * 2;
                    shape.x = cx - rx;
                    shape.y = cy - ry;
                }

                newShapes.push(shape);
            });

            setShapes(prevShapes => [...prevShapes, ...newShapes]);
        }
    } catch (error) {
        console.error('Error importing SVG:', error);
        alert('Error importing SVG file. Please check the file format.');
    }
};

export const exportSVG = (canvasRef: React.RefObject<SVGSVGElement>): void => {
    if (canvasRef.current) {
        const svgCode = canvasRef.current.outerHTML;
        navigator.clipboard.writeText(svgCode).then(() => {
            alert('SVG copied to clipboard!');
        });
    }
};
