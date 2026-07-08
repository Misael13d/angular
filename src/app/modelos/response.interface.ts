import { Student } from "./student.interfaces"

export interface ApiResponse {
    httpHeaders: any
    httpStatusCode: number
    message: string
    otherParams: any
    data: Student[]
    data2: any
}