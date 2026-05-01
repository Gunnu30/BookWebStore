
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import './admin.css'


   const dropZoneStyle = {
    border:'3px dashed #4bbe79c3',
    padding: '20px',
    cursor: 'pointer',
    marginTop: '10px',
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const ADminAddBook = () => {
    const theme = useSelector((state) => state.theme.theme);
    const isLight = theme === 'light';
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [coverUrl , setCoverUrl] = useState("");
    const [genreList , setGenreList] = useState([]);

    const Api_Url = import.meta.env.VITE_API_URL;

    const availableGenres = [
        {id:"g1",name:"Romance",score:0},
        {id:"g2",name:"Psychology",score:0},
        {id:"g3",name:"Poems",score:0},
        {id:"g4",name:"Self Development",score:0},
        {id:"g5",name:"Fiction",score:0},
        {id:"g6",name:"Science",score:0},
        {id:"g7",name:"History",score:0},
        {id:"g8",name:"Philosophy",score:0},
        {id:"g9",name:"Crime",score:0},
        {id:"g10",name:"Thriller",score:0},
        {id:"g11",name:"Fantasy",score:0},  
        {id:"g12",name:"Biography",score:0},
        {id:"g13",name:"Health",score:0},
        {id:"g14",name:"Business",score:0},
        {id:"g15",name:"Non-Fiction",score:0},
        {id:"g16",name:"Comedy",score:0}
    ]
    const updateGenreRow = (index, field, value) => {
        console.log("Updating row", index, "field", field, "to value", value);
    const updated = [...genreList];
    updated[index][field] = value;
    
    // If we changed the ID, we also update the name for convenience
    if (field === 'genre_id') {
        const genreObj = availableGenres.find((g) => g.id === value);
        updated[index]["genre"] = genreObj?.name || "";
    }
    console.log(updated[index]);
    setGenreList(updated);
};

    const addGenreButtonF = () =>{
        setGenreList([...genreList,{"genre_id":"","genre":"",score:1}]);
    }
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    const openwidget = () => {
        if (!title) {
        alert("Please enter a Book Name first so we can name the image correctly!");
        return;
        }
        if (!window.cloudinary) {
        alert("Cloudinary script is still loading... please try again in a second.");
        return;
    }
        if(window.cloudinary){
            window.cloudinary.createUploadWidget({
                cloudName:"di7jkwhzr",
                uploadPreset:"book_covers",
                publicId:`${title.replace(/\s+/g,'-').toLowerCase()}-cover`,
                sources:['local','url','camera'],
                multiple:false
            },(error,result) =>{
                console.log("ImageErrro",error,"Image error");
                if(!error && result && result.event === 'success'){
                    console.log(result.info , "HIIIIi");
                    if(result.info.existing){
                        alert("Note: This image already exists in your library. Linking to existing file.");
                    }
                    console.log(result.info);// it give url for that image. we need to send it to backend and then to db.
                    setCoverUrl(result.info.secure_url);
                }
            }).open();
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!title || !author || !description || !price || !coverUrl || genreList.length === 0){
            alert("Please fill all fields, upload a cover and add at least one genre!");
            return;
        }
        console.log("Submitting Book:",{title,author,price,coverUrl,description,genreList});

        try{
            const res = await fetch(`${Api_Url}/admin/add-book`,{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    title,
                    author,
                    price:Number(price),
                    cover_url:coverUrl,
                    description,
                    genres:genreList
                }),
            })
            console.log("Server response:",res);
            if(res.ok){
                alert("Book and Genres saved successfully!");
                setTitle("");
                setAuthor("");
                setDescription("");
                setPrice("");
                setCoverUrl("");
                setGenreList([]);
            }else {
            alert("Server returned an error. Please check your data.");
            }
        }catch(err){
            console.error("Error saving book:",err);
            alert("Failed to save book. Please try again.");
        }
    }
    return (
        <div className={`flex flex-col items-center h-[calc(100vh-80px)] w-full transition-colors duration-300 ${isLight ? 'bg-gray-100 text-gray-900' : 'text-white '}`}>
            
            <form onSubmit={handleSubmit} className="add-book-card flex flex-row justify-between h-full w-full gap-8 p-6">
                
                {/* Left Section: Book Details */}
                <div className="flex flex-col justify-center items-center md:w-1/2 gap-4">
                    <div className={`flex left-card-section flex-col p-6 rounded-lg shadow-lg w-full ${isLight ? 'bg-white border border-gray-200' : 'bg-[#0F1C3F]'}`}>
                        
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Book Name:</label>
                            <input 
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title} 
                                className={`input-text p-2 rounded ${isLight ? 'bg-gray-50 border border-gray-300 text-black' : 'bg-[#1a2a4d] text-white border-none'}`} 
                                type="text" 
                                placeholder="Enter book title" 
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <label className="font-semibold">Author Name:</label>
                            <input 
                                onChange={(e) => setAuthor(e.target.value)} 
                                value={author} 
                                className={`input-text p-2 rounded ${isLight ? 'bg-gray-50 border border-gray-300 text-black' : 'bg-[#1a2a4d] text-white border-none'}`} 
                                type="text" 
                                placeholder="Enter author name" 
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Description:</label>
                            <input
                            onChange={(e) =>{setDescription(e.target.value)}} 
                            value={description}
                            className={`input-text p-2 rounded ${isLight ? 'bg-gray-50 border border-gray-300 text-black' : 'bg-[#1a2a4d] text-white border-none'}`}
                            type="text"
                            placeholder="Enter Book Discription"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                            <label className="font-semibold">Price in Rupees:</label>
                            <input 
                                className={`input-text p-2 rounded ${isLight ? 'bg-gray-50 border border-gray-300 text-black' : 'bg-[#1a2a4d] text-white border-none'}`} 
                                onChange={(e) => setPrice(e.target.value)} 
                                value={price} 
                                placeholder="0.00" 
                                type="number" 
                            />
                        </div>

                        <div 
                            onClick={openwidget} 
                            className={`flex sm:max-w-md self-center transition-all ${isLight ? 'hover:bg-gray-50 bg-white' : 'hover:bg-[#1a2a4d]'}`} 
                            style={{...dropZoneStyle, borderColor: isLight ? '#ccc' : '#54c983c3'}}
                        >
                            {coverUrl ? <img src={coverUrl} alt="preview" className="h-20" /> : "Click to Upload Cover"}
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <button type="submit" className="add-genre-btn bg-[#54c983] text-white px-6 py-2 rounded hover:bg-[#42a86c] transition-colors font-bold w-full">
                            Add Book With Genres
                        </button>
                    </div>
                </div>

                {/* Right Section: Genres */}
                <div className="flex flex-col justify-center items-center md:w-1/2 gap-4 options-card">
                    <div className={`flex flex-col w-full p-6 rounded-lg shadow-lg ${isLight ? 'bg-white border border-gray-200' : ""}`}>

                        
                        {genreList.map((genre, index) => (
                            <div key={index} className="flex h-full items-center gap-2 overflow-y-auto scrollbar-thin custom-scrollbar ">
                                <select 
                                    value={genre.genre_id} 
                                    onChange={(e) => updateGenreRow(index, 'genre_id', e.target.value)}
                                    className={`input-text flex-grow p-2 rounded ${isLight ? 'bg-gray-50 border border-gray-300' : 'bg-[#1a2a4d] text-white'}`}
                                >
                                    <option value="">Select Genre</option>
                                    {availableGenres.filter(g => 
                                        genreList.every(selected => selected.genre_id !== g.id || selected === genre)
                                    ).map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                                
                                <input
                                    type="range" min='1' max="10" step="1"
                                    className="accent-[#54c983] w-26"
                                    value={genre.score}
                                    onChange={(e) => updateGenreRow(index, "score", Number(e.target.value))} 
                                />
                                <span className={isLight ? 'text-black' : 'text-white'}>{genre.score}</span>

                                <button 
                                    type="button"
                                    onClick={() => setGenreList(genreList.filter((_, i) => i !== index))}
                                    className="text-red-500 hover:text-red-700 font-bold px-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <button 
                            type="button" 
                            onClick={addGenreButtonF}
                            className={`add-genre-btn border-2 border-dashed rounded transition-colors ${isLight 
                                ? 'border-gray-300 text-gray-500 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50' 
                                : 'border-gray-700 text-gray-400 hover:border-[#54c983] hover:text-[#54c983] hover:bg-[#54c983]/10'
                            }`}
                        >
                            + Add Genre Row
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ADminAddBook