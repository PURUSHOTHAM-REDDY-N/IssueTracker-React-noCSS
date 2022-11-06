import  { useState, useEffect } from "react";


//getting values from local storage
const getDataFromLs = () => {
    const issue = localStorage.getItem("issue");
    if (issue) {
        return JSON.parse(issue);
    } else {
        return [];
    }
};

function App() {

    const [data, setData] = useState(getDataFromLs)

    //values
    const [values, setValues] = useState({
        title: "",
        owner: "",
        status: "",
        effort: "",
        due: "",
        date: new Date().toLocaleDateString(),
        btn: "Add Issue"

    })

    //filter values
    const [filter, setFilter] = useState({
        status: "",
        search: ""
    })

    //saving data in local storage
    useEffect(() => {
        localStorage.setItem("issue", JSON.stringify(data));
    }, [data]);

    //seting values
    const settingValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    //submitting values
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(values);

        setData([...data, values]);

        setValues({
            title: "",
            owner: "",
            status: "",
            effort: "",
            due: "",
            date: values.date,
            btn: "Add Issue"
        })

    }


    //deleting the issuef
    const deleteIssue = (title) => {
        const ftitle = data.filter((element, index) => {
            return element.title !== title
        })
        setData(ftitle)
    }

    //Editing the issu
    const editIssue = (data) => {

        setValues({
            title: data.title,
            owner: data.owner,
            status: data.status,
            effort: data.effort,
            due: data.due,
            date: data.date,
            btn: "Update Issue"
        })
        deleteIssue(data.title);
    }

    //setting filter values in state
    const settingFilter=(e)=>{
        setFilter({...filter,[e.target.name]:e.target.value})
    }

    //reset filter values
    const filterReset = ()=>{
        setFilter({status:"",search:""})
    }



    const style = { display: "flex", flexDirection: "column", padding: "5px", margin: "2px" }

    return (
        <div className="App" style={style}>
            <h2>Issue Tracker</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" required name="title" value={values.title} onChange={(e) => settingValues(e)} placeholder="title" style={style} />
                <input type="text" required name="owner" value={values.owner} onChange={(e) => settingValues(e)} placeholder="owner" style={style} />
                <select name="status" required value={values.status} onChange={(e) => settingValues(e)} style={style}>
                    <option value="">status</option>
                    <option value="New">New</option>
                    <option value="Assaigned">Assaigned</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Closed">Closed</option>
                </select>
                <input type="number" required name="effort" value={values.effort} onChange={(e) => settingValues(e)} placeholder="effort" style={style} />
                <input type="date" required name="due" value={values.due} onChange={(e) => settingValues(e)} style={style} />

                <button type="submit">{values.btn}</button>

            </form>

            {/* showing data in the form of table when issues are >0*/}
            {data.length > 0 && (

                <div>
                <div style={{display: "flex"}}>
                    <select name="status" required value={filter.status} onChange={(e) => settingFilter(e)} style={style}>
                        <option value="">status</option>
                        <option value="New">New</option>
                        <option value="Assaigned">Assaigned</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <input type="text" value={filter.search} name="search" placeholder="search title" onChange={(e) => settingFilter(e)}/>
                    <button onClick={filterReset}>Reset</button>
                </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Owner</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Effort</th>
                                <th>Due Date</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.filter((data)=> filter.status===""?data.title.toLowerCase().includes(filter.search.toLocaleLowerCase()):data.status===filter.status && data.title.toLowerCase().includes(filter.search.toLocaleLowerCase())).map((data, index) => (
                                <tr key={data.title}>
                                    <td>{index + 1}</td>
                                    <td>{data.title}</td>
                                    <td>{data.owner}</td>
                                    <td>{data.date}</td>
                                    <td>{data.status}</td>
                                    <td>{data.effort}</td>
                                    <td>{data.due}</td>

                                    <td><button onClick={() => editIssue(data)} >Edit</button></td>
                                    <td><button onClick={() => deleteIssue(data.title)} >delete</button></td>

                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default App;
