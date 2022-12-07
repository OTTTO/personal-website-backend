"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateManyInput = void 0;
const tslib_1 = require("tslib");
const TypeGraphQL = tslib_1.__importStar(require("type-graphql"));
const Role_1 = require("../../enums/Role");
let UserCreateManyInput = class UserCreateManyInput {
};
tslib_1.__decorate([
    TypeGraphQL.Field(_type => String, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], UserCreateManyInput.prototype, "id", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => Date, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", Date)
], UserCreateManyInput.prototype, "createdAt", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => String, {
        nullable: false
    }),
    tslib_1.__metadata("design:type", String)
], UserCreateManyInput.prototype, "email", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => Role_1.Role, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], UserCreateManyInput.prototype, "role", void 0);
UserCreateManyInput = tslib_1.__decorate([
    TypeGraphQL.InputType("UserCreateManyInput", {
        isAbstract: true
    })
], UserCreateManyInput);
exports.UserCreateManyInput = UserCreateManyInput;
