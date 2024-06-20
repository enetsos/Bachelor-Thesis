import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
} from "sequelize-typescript";


@Table({
    timestamps: true,
    tableName: "users",
    modelName: "User",
})
class User extends Model<UserAttributes> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;


    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
    })
    declare pw: string;

    @Column({
        type: DataType.STRING,
    })
    declare role: Role;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default User;