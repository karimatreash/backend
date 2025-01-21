// import { DataTypes,Model } from "sequelize";

// import { sequelize } from "../sequelize";
// interface ProductAttributes { 
//     id:number;
//     name:string;
//     descriptions:string ;
//     price:number;
// createdate?:Date;
// updatedate?:Date
// }
// interface ProductCreationAttributes extends Omit<ProductAttributes,'id'>{}
// class Product extends Model<ProductAttributes,ProductCreationAttributes>implements ProductAttributes{
//    public name!: string;
//     public descriptions!: string;
//    public  price!: number;
//      public readonly createdate?: Date | undefined;
//      public readonly updatedate?: Date | undefined;
//     public id!:number;
    

// }
// Product.init(
//     {
//         id: {
//             type: DataTypes.INTEGER.UNSIGNED,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         name: {
//             type: DataTypes.STRING(255),
//             allowNull: false,
//         },
//         descriptions: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         price: {
//             type: DataTypes.DECIMAL(10, 2),
//             allowNull: false,
//         },
//         createdate: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW,
//         },
//         updatedate: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW,
//         },
//     },
//     {
//         sequelize,
//         modelName: 'Product',
//         tableName: 'products',
//         timestamps: true,
//         underscored: true,
//     }
// );
// export default Product;