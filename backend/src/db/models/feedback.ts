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

@Table({
    timestamps: true,
    tableName: "feedback",
    modelName: "Feedback",
})
class Feedback extends Model<FeedbackAttributes> {
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
    declare clientId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare notes: string;

    @BelongsTo(() => User, 'clientId')
    declare client: User;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Feedback;
