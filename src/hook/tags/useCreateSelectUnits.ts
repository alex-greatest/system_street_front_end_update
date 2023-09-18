import {useGetUnits} from "../../utils/api/unit";

export const useCreateSelectUnits = (): string[]|undefined => {
    const {data: units} = useGetUnits();
    return units?.map(r => r.name);
};