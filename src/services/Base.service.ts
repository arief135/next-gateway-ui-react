export interface CRUDService {

    get(): Array<any>

    getSingle(): any

    create(e: any): void

    update(e: any): void

}
