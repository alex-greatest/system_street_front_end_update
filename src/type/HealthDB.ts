export interface HealthDB {
    "status": string,
    "details": {
        "database": string,
        "validationQuery": string
    }
}