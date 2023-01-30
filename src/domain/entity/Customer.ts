import { Address } from "./Address"

export class Customer {
    private _id: string
    private _name: string = ""
    private _address!: Address
    private _active: boolean = true
    private _rewardsPoints: number = 0

    constructor(id: string, name: string) {
        this._id = id
        this._name = name
        this.validate()
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required")
        }

        if (this._id.length === 0) {
            throw new Error("Id is required")
        }
    }

    changeName(name: string) {
        this._name = name
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a costumer")
        }
        
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    set Address(address: Address) {
        this._address = address;
    }

    get name(): string {
        return this._name
    }

    isActive(): boolean {
        return this._active
    }

    addRewardsPoints(points: number) {
        this._rewardsPoints += points
    }

    get rewardPoints(): number {
        return this._rewardsPoints
    }

    get id(): string {
        return this._id
    }

    get Address(): Address {
        return this._address;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    addRewardPoints(points: number) {
        this._rewardsPoints += points;
    }
}
