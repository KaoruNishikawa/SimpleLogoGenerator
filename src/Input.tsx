function Input(props: { unit?: string, [key: string]: any }) {
    const { unit, ...rest } = props;
    return (
        <div>
            <input {...rest} />
            {unit && <span>{unit}</span>}
        </div>
    );
}


export { Input };
