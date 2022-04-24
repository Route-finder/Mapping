import classes from './Wrapper.module.css';
function Wrapper (props){
    return (
        <div className = {classes.card}>
            {props.children}

        </div>
    );
}

export default Wrapper;