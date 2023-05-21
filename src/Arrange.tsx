import React from "react";


function SideWise(props: { sep?: string, children?: React.ReactNode }) {
    const concatenated = React.Children.map(props.children, (child, idx) => {
        return idx === 0 ? child : [props.sep, child];
    });
    return (
        <div className="flex">
            {concatenated}
        </div>
    );
}


export { SideWise };
