import { useRef, useState } from "react";

const NotesForm = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const fileInputRef = useRef(null);
    
    const [notes, setNotes] = useState([]);

    const formSubmissionHandler = (e) =>{
        console.log('A New Note Originated');
        e.preventDefault();
        console.log('Form Default Behavior Prevented');

        const newNote = [...notes];
        newNote.push({title, description, image});
console.log(newNote);

        setNotes(newNote);

        console.log('A New Note Saved');
        setTitle('');
        setDescription('');
        setImage('');
        fileInputRef.current.value = '';
        console.log('Old Fields Cleared');
    }

    const deleteNote = (indx) =>{
const updatedNotes = [...notes];
updatedNotes.splice(indx, 1);
setNotes(updatedNotes);
    }

    return (
        <div className='flex flex-col min-h-screen p-5 gap-10'>
            
            <div className='flex flex-col gap-5 items-center h-full'>
                <h1 className='text-center font-bold text-4xl w-full'>Keep Notes</h1>
                <form
                    onSubmit={(e)=>{
                    formSubmissionHandler(e);
                }}
                    className='flex flex-col gap-3 w-lg bg-gray-300 p-5 rounded-2xl'
                >
                    <input 
                        name="note_title"
                        type='text' 
                        placeholder='Title' 
                        required 
                        value={title}
                        className='bg-white text-black px-5 py-3 rounded-xl shadow-2xl transition-transform duration-500 focus:scale-105' 
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}
                    />
                    <textarea 
                        name="note_description"
                        type='text' 
                        placeholder='Description' 
                        required 
                        value={description}
                        className='bg-white text-black px-5 py-3 rounded-xl shadow-2xl transition-transform duration-500 focus:scale-105' 
                        onChange={(e)=>{
                            setDescription(e.target.value);
                        }}
                    />
                    <input
                      type="file"
                      id="docpicker"
                      accept=".png, .jpg, .jpeg"
                      ref={fileInputRef}
                      onChange={(e)=>{
                        const imageURL = e.target.files[0];
                            if (imageURL) {
                                const fileURL = URL.createObjectURL(imageURL);
                                setImage(fileURL);
                                }
                      }}
                      className="bg-white w-fit p-2 rounded-xl"
                     />
                    <button type='submit' className='bg-green-400 hover:bg-green-600 text-white p-2 rounded-xl shadow-2xl transition-transform duration-500 hover:scale-105'>Save</button>
                </form>
            </div>
            
            <div className='h-full flex flex-col gap-10 p-5 rounded-2xl shadow-xl border-gray-300 border'>
                <h2 className='text-center font-bold text-2xl w-full'>
                    Notes Details
                </h2>
                <div className="columns-3 gap-3 overflow-auto h-full w-full px-0 py-5 justify-between">
                       {
                            notes.map((elem, indx)=>{
                                return <div 
                                        key={indx} 
                                        className='bg-gray-300 p-5 flex flex-col gap-2 shadow-xl rounded-2xl w-full mb-3 break-inside-avoid transition-transform duration-700 hover:scale-102' >
                                            <span 
                                                className="font-semibold text-xl bg-white px-4 py-2 rounded-full w-fit">
                                                    {indx+1}
                                            </span>
                                            <h3 
                                                className="mt-6 font-semibold text-2xl">
                                                    {elem.title}
                                            </h3>
                                            <p 
                                                className="text-gray-500 w-50">
                                                    {elem.description}
                                            </p>
                                            {elem.image && (
  <img src={elem.image} alt="Image" className="rounded-2xl" />
)}
                                            <button onClick={()=>{
                                                deleteNote(indx)
                                            }} className="bg-red-400 hover:bg-red-600 rounded p-1 text-white font-bold text-xs cursor-pointer active:scale-95">Remove</button>
                                    </div> 
                            })
                        }
                </div>
            </div>
        
        </div>
    )
}

export default NotesForm