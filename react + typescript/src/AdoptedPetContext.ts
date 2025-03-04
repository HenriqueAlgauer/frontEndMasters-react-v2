import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void | null]>([
    {
        id: 1337,
        name: 'Fido',
        animal: 'dog',
        description: 'Lorem ipsum',
        breed: 'beagle',
        images: [],
        city: 'Seattle',
        state: 'WA'
    },
    () => { }
]);

export default AdoptedPetContext;
