import { ref } from 'vue';

export default function useLocationMap() {
    const zoom = ref(18);
    const center = ref([40.431663, -3.6765998]);

    function pinchZoom (e) {
        const marker = e.target.getLatLng();
        center.value = [marker.lat, marker.lng];
    }

    return {
        zoom,
        center,
        pinchZoom
    }
}