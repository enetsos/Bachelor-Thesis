import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
} from "sequelize-typescript";
import TimeTracking from "./timeTracking";
import Supply from "./supply";

@Table({
    tableName: "timetracking_supply",
    modelName: "TimeTrackingSupply",
})
class TimeTrackingSupply extends Model {
    @ForeignKey(() => TimeTracking)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare timeTrackingId: string;

    @ForeignKey(() => Supply)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare supplyId: string;

}

export default TimeTrackingSupply;
