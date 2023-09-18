import {useGetStatusList} from "../../utils/api/status-list";

export const useCreateSelectStatusList = (): string[]|undefined => {
    const {data: statusOperationsList,} = useGetStatusList();
    return statusOperationsList?.map(s => s.statusName);
};