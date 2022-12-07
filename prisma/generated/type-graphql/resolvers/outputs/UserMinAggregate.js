"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMinAggregate = void 0;
const tslib_1 = require("tslib");
const TypeGraphQL = tslib_1.__importStar(require("type-graphql"));
const Role_1 = require("../../enums/Role");
let UserMinAggregate = class UserMinAggregate {
};
tslib_1.__decorate([
    TypeGraphQL.Field(_type => String, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], UserMinAggregate.prototype, "id", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => Date, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", Date)
], UserMinAggregate.prototype, "createdAt", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => String, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], UserMinAggregate.prototype, "email", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => Role_1.Role, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], UserMinAggregate.prototype, "role", void 0);
UserMinAggregate = tslib_1.__decorate([
    TypeGraphQL.ObjectType("UserMinAggregate", {
        isAbstract: true
    })
], UserMinAggregate);
exports.UserMinAggregate = UserMinAggregate;
