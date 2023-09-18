export interface OperationRequest {
    startTime: string,
    endTime: string,
    partName: string,
    status: string,
    offset?: number,
    limit?: number
}