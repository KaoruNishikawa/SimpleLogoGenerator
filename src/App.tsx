import { Container } from './Container';
import { defaultProperty } from './properties';
import './index.css';


function App() {
    return (
        <>
            <h1>Simple Logo Generator</h1>
            <Container defaults={defaultProperty} />
        </>
    );
}

export { App as default };
