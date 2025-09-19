import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

export const Homepage = () => {

    const [students, setStudents] = useState([]);

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

    if(isPending){
        return <h2>Loading...</h2>
    }

    function showAllStudents(){
        setStudents(data);
    }

  return (
    <>
    <div className="main-text">
        <h1>Welcome to Student's Attendance Register</h1>
    </div>
    <div style={{display:"flex", justifyContent:"center"}}>
        <button onClick={showAllStudents}>Show All</button>
    </div>

    <div style={{display:"flex", justifyContent:"center"}}>
        {students.length > 0 ? (
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Date</th>
                    <th>Present</th>
                </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.studentname}</td>
                            <td>{s.studentgender}</td>
                            <td>{s.date}</td>
                            <td>{s.ispresent ? "Yes" : "No"}</td>
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
