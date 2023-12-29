export enum CRUDMode { CRE, DIS, UPD }

export class CRUDComponent {
    /**
     *
     */
    constructor(private mode: CRUDMode) { }

    getComponent() {
        switch (this.mode) {
            case CRUDMode.CRE:
                return this.getCreateComponent()

            case CRUDMode.DIS:
                return this.getDisplayComponent()

            case CRUDMode.UPD:
                return this.getUpdateComponent()
            default:
                break;
        }
    }

    getDisplayComponent(): JSX.Element {
        throw new Error("Method not implemented.")
    }

    getCreateComponent(): JSX.Element {
        throw new Error("Method not implemented.")
    }

    getUpdateComponent(): JSX.Element {
        throw new Error("Method not implemented.")
    }
}

export function CRUD({ mode, cls }: { mode: CRUDMode, cls: any }) {
    const ref = Reflect.construct(cls, [ mode ]) as CRUDComponent
    return ref.getComponent()
}