import { Dimension } from "../../types";

function LogoTextOffset(
    props: { offset: Dimension, setOffset: (offset: Dimension) => void }
): JSX.Element {
    function handleChangeX(e: React.ChangeEvent<HTMLInputElement>) {
        const newX = parseInt(e.target.value);
        props.setOffset({ ...props.offset, x: newX });
    }

    function handleChangeY(e: React.ChangeEvent<HTMLInputElement>) {
        const newY = parseInt(e.target.value);
        props.setOffset({ ...props.offset, y: newY });
    }

    return (
        <tr>
            <td>Text Offset</td>
            <td>
                <input type="number" value={props.offset.x} onChange={handleChangeX} />
                <span className="sep">&times;</span>
                <input type="number" value={props.offset.y} onChange={handleChangeY} />
                <span className="unit">%</span>
            </td>
        </tr>
    )
}


export default LogoTextOffset;
