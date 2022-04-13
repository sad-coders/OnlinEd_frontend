import { List } from "@mui/material";
import Participant from './Participant'
export default function () {
    const students = [
        { id: 1, name: "Dushyanth", email: "kd@iitbbs.ac.in" },
        { id: 2, name: "Sripad", email: "tss@iitbbs.ac.in" },
        { id: 3, name: "Akash", email: "ak@iitbbs.ac.in" },
    ];
    return (
        <>
            <h2>
                Classmates
            </h2>
            <hr />
            <List>
                {
                    students.map((student) => <Participant key={student.id} student={student} />)
                }
            </List>

        </>
    )
}