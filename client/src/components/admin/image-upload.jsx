import { UploadCloudIcon, X , Skull} from "lucide-react";
import { useEffect, useRef } from "react";
import axios from 'axios';

function Productmage({ image, setImage , imageLoading }) {
    const inputRef = useRef(null);

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) setImage(selectedFile);
    };

    const handleRemove = () => {
        setImage(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    async function uploadImgToCloud() {
        const data = new FormData();
        data.append('my_file', image);

        try {
            const response = await axios.post('http://localhost:3000/api/admin/product/upload-image', data);
            console.log('Image upload success:', response.data);
        } catch (error) {
            console.log('Image upload failed:', error);
        }
    }

    useEffect(() => {
        if (image) uploadImgToCloud();
    },[image]);

    return (
        <div>
            <label>Upload Image</label>
            <div>
                <input
                    id="img"
                    type="file"
                    onChange={handleChange}
                    ref={inputRef}
                    className="hidden"
                />
                {!image ? (
                    <label
                        htmlFor="img"
                        className="flex flex-col items-center justify-center p-5 border rounded-md cursor-pointer"
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Click to upload</span>
                    </label>
                ) : 
                ( imageLoading ? <Skull /> :
                    <div className="flex items-center">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Selected"
                            className="w-32 h-32 object-cover rounded-md"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="ml-4 p-2 bg-red-500 text-white rounded-full"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Productmage;
