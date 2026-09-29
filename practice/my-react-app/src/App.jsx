function App() {


    const name = "mahesh bob";
    const age = 51;
    const department = "TFI";


    return (
        <div>
            <h1 style={{fontFamily:'cursive'}}>Student Information</h1>


            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Department: {department}</p>


            <button onClick={() => alert("Welcome " + name)}>
                Welcome
            </button>
        </div>
    );
}


export default App;
