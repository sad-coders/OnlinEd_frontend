export default function(){
    const author ={
        name :"Sir",
        email : "sir@iitbbs.ac.in"
    }
    return (
        <>
        <h2>
            Teacher
        </h2>
        <hr/>
        <Participant student={author} />
        </>
    )
}