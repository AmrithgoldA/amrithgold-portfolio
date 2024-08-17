import { storage } from '../../../firebase.config';
import { ref, getDownloadURL } from 'firebase/storage';

const getMediaData = async(fileName: string) => {
    try {
        const mediaRef = ref(storage, fileName);
        const url = await getDownloadURL(mediaRef);
        return url
    } catch (error) {
        console.error("Error fetching media file:", error);
    }
}

export { getMediaData }