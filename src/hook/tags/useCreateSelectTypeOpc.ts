import {useGetTypesOpc} from "../../utils/api/typeOpc";


export const useCreateSelectTypeOpc = (): string[]|undefined => {
    const {data: typesOpc} = useGetTypesOpc();
    return typesOpc?.map(r => r.name);
};