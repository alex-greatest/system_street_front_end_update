import {useListNameReferences} from "../../../utils/api/reference";


export const useCreateSelectModelDescription = (): string[]|undefined => {
    const {data: listReferences} = useListNameReferences();
    return listReferences?.map(r => r.modelDescription);
};