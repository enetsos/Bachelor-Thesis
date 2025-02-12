import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    BelongsToMany
} from "sequelize-typescript";
import User from "./user";
import TimeTrackingSupply from "./timeTrackingSupply";
import Supply from "./supply";

@Table({
    timestamps: true,
    tableName: "timetracking",
    modelName: "TimeTracking",
})
class TimeTracking extends Model<TimeTrackingAttributes> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare employeeId: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare clientId: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare startTime: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare endTime: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare status: TimeTrackingStatus;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare longStartTime: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    declare longEndTime: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare latStartTime: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    declare latEndTime: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare notes: string;

    @BelongsTo(() => User, { as: 'employee', foreignKey: 'employeeId' })
    declare employee: User;

    @BelongsTo(() => User, { as: 'client', foreignKey: 'clientId' })
    declare client: User;

    @BelongsToMany(() => Supply, () => TimeTrackingSupply)
    declare supplies: Supply[];

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default TimeTracking;
