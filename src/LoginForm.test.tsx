import LoginForm from "./LoginForm";
import * as ReactDOM from "react-dom";

describe('login component tests', () => {
    let container:HTMLDivElement;

    beforeEach(()=>{
        container=document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<LoginForm />,container);
    });


    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
    });

    it("Renders correctly initial document", ()=>{
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(2);
        expect(container.querySelector("[data-test='login-form']")).toBeInTheDocument();

    });
    
});


