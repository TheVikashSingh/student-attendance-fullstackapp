import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

export const Homepage = () => {

    const [studentName, setStudentName] = useState("");
    const [studentGender, setStudentGender] = useState("");
    const [studentDate, setStudentDate] = useState("");
    const [studentPresent, setStudentPresent] = useState(false);
    const queryClient = useQueryClient();

    const [selectedID, setSelectedID] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [updatedGender, setUpdatedGender] = useState("");
    const [updatedDate, setUpdatedDate] = useState("");
    const [updatedPresent, setUpdatedPresent] = useState(false);

    const {data,isPending,isError,error} = useQuery({
        queryKey: ["show-all"],
        queryFn: async () =>{
            const response = await fetch("http://localhost:8080/");
            if(!response.ok){
                throw new Error("A problem occurred!");
            }
            const data = await response.json();
            return data;
        }
    });




    const {mutate} = useMutation({
        mutationFn: async (newStudent) => {
            const response = await fetch("http://localhost:8080/",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(newStudent)
            })
            if(!response.ok){
                throw new Error("Some error occurred!");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey : ["show-all"]});
        }
    });



    const updateMutation = useMutation({
        mutationFn: async(updatedStudent) => {
            const response = await fetch(`http://localhost:8080/${updatedStudent.id}`,{
                method : "PUT",
                headers : {"Content-Type": "application/json"},
                body : JSON.stringify(updatedStudent)
            })
            if(!response.ok){
                throw new Error("Failed to update");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["show-all"]})
        }
    });


    const deleteMutation = useMutation({
        mutationFn: async(id) => {
            const response = await fetch(`http://localhost:8080/${id}`,{
                method: "DELETE"
            })
        },
        onSuccess: queryClient.invalidateQueries({queryKey:["show-all"]})
    });


    function addStudentName(e){
        setStudentName(e.target.value);
    }

    function addStudentGender(e){
        setStudentGender(e.target.value);
    }

    function addStudentDate(e){
        setStudentDate(e.target.value);
    }

    function addStudentPresent(e){
        setStudentPresent(e.target.value === "true");
    }

    function addStudent(){
        const newStudent = {
            "studentname":studentName,
            "studentgender":studentGender,
            "date":studentDate,
            "ispresent":studentPresent
        };
        mutate(newStudent);
        setStudentName("");
        setStudentGender("");
        setStudentDate("");
        setStudentPresent(false);
    }

    function handleDropDownChange(e){
        setSelectedID(Number(e.target.value));
        const student = data.find((s) => s.id === Number(e.target.value));
        if(student){
            setUpdatedName(student.studentname);
            setUpdatedGender(student.studentgender);
            setUpdatedDate(student.date);
            setUpdatedPresent(student.ispresent);
        }else{
            throw new Error("Student Not Found!");
        }
    }

    function updateStudent(){
        const updatedStudent = {
            "id":selectedID,
            "studentname":updatedName,
            "studentgender":updatedGender,
            "date":updatedDate,
            "ispresent":updatedPresent
        }
        updateMutation.mutate(updatedStudent);
        setUpdatedName("");
        setUpdatedGender("");
        setUpdatedDate("");
        setUpdatedPresent(false);
    }

    function deleteStudent(id){
        deleteMutation.mutate(id);
    }

    if(isPending){
        return <h2>Loading...</h2>
    }

  return (
    <>
    <div className="main-text">
        <h1>Welcome to Student's Attendance Register</h1>
    </div>

    <div className="add-section">
        <button onClick={addStudent}>Add Student</button>
        <input type="text" onChange={addStudentName} 
        value={studentName} placeholder="Student Name..."/>

        <input type="text" onChange={addStudentGender} 
         value={studentGender} placeholder="Student's Gender..."/>

        <input type="text" onChange={addStudentDate} 
         value={studentDate} placeholder="Class Date..."/>

        <select value={studentPresent} onChange={addStudentPresent}>
            <option value={true}>Present in Class</option>
            <option value={false}>Absent in Class</option>
        </select>
        
    </div>



    <div className="update-section">
        <button onClick={updateStudent}>Update Student</button>
        <select value={selectedID} onChange={handleDropDownChange}>
            <option value="">Select ID</option>
            {data.map((s) => <option value={s.id} key={s.id}> {s.id} </option>)}
            
        </select>
        <input type="text" value={updatedName} 
        onChange={e => setUpdatedName(e.target.value)} 
        placeholder="Student Name..."/>

        <input type="text" value={updatedGender} 
        onChange={e => setUpdatedGender(e.target.value)} 
        placeholder="Student's Gender..."/>

        <input type="text" value={updatedDate} 
        onChange={e => setUpdatedDate(e.target.value)} 
        placeholder="Class Date..."/>

        <select value={updatedPresent} onChange={e => setUpdatedPresent(e.target.value === "true")}>
            <option value={true}>Present in Class</option>
            <option value={false}>Absent in Class</option>
        </select>        
    </div>




    <div style={{display:"flex", justifyContent:"center"}}>
        {data.length > 0 ? (
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Date</th>
                    <th>Present</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {data.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.studentname}</td>
                            <td>{s.studentgender}</td>
                            <td>{s.date}</td>
                            <td>{s.ispresent ? "Yes" : "No"}</td>
                            <td><button onClick={() => deleteStudent(s.id)}>DELETE</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ):(<h2 className='no-data'>"No Student Data Yet!"</h2>)}
    </div>
    </>
  )
}

export default Homepage 
