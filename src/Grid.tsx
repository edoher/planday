import { GridElement } from './types';

type Props = {
    elements: GridElement[];
};

const Grid = ({ elements }: Props) => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3  lg:grid-cols-4">
        {elements.map(({ title, description, imagePath }, index) => (
            <div key={`grid-element-${index}`}>
                <img src={imagePath} />
                <h3 className="font-bold">{title}</h3>
                <p>{description}</p>
            </div>
        ))}
    </div>
);

export default Grid;
