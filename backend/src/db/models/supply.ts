import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BelongsToMany,
} from "sequelize-typescript";
import TimeTracking from "./timeTracking";
import TimeTrackingSupply from "./timeTrackingSupply";

@Table({
    timestamps: true,
    tableName: "supply",
    modelName: "Supply",
})
class Supply extends Model<SupplyAttributes> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    declare price: number;

    @BelongsToMany(() => TimeTracking, () => TimeTrackingSupply)
    declare timeTrackings: TimeTracking[];

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Supply;
