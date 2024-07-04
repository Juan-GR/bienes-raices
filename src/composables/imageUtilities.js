import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { uid } from 'uid';
import { computed } from 'vue';

export default function useImageUtilities() {

    const storage = useFirebaseStorage();
    const storageRefPath = storageRef(storage, `/properties/${uid()}.jpg`);

    const { url, upload } = useStorageFile(storageRefPath);

    function uploadImage(file) {
        if (!file) return;
        upload(file);
    }

    const image = computed(() => url.value);

    return {
        uploadImage,
        uploadedImage: image,
        url
    }
}