export interface SquareProps
{
    value : string; // set value of square
    onClick : () => any;
}

export function Square(props : SquareProps) { // not a react component(only contains props so do not have to be component)
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }