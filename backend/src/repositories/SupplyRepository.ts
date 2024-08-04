import BaseRepository from "./BaseRepository";
import Supply from "../db/models/supply";

export default class SupplyRepository extends BaseRepository<SupplyAttributes> {
    constructor() {
        super(Supply);
    }
}