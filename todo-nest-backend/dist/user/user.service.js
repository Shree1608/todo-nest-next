"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(userRepo, jwtservice) {
        this.userRepo = userRepo;
        this.jwtservice = jwtservice;
    }
    async signup(userdto) {
        const { name, email, password } = userdto;
        const findemail = await this.userRepo.findOneBy({ email });
        if (findemail) {
            throw new common_1.ConflictException('email already exist');
        }
        const hashPass = await (0, bcrypt_1.hash)(password, 10);
        const user = await this.userRepo.create({
            name,
            email,
            password: hashPass
        });
        console.log(user);
        return this.userRepo.save(user);
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const finmail = await this.userRepo.findOneBy({ email });
        if (!finmail) {
            throw new common_1.NotFoundException('Email not found');
        }
        console.log(password);
        console.log(finmail.password);
        const isPassMatch = await bcrypt.compare(password, finmail.password);
        console.log(isPassMatch);
        if (!isPassMatch) {
            throw new common_1.UnauthorizedException('invalid password');
        }
        const token = await this.jwtservice.sign({ id: finmail.id });
        const updatetoken = await this.userRepo.update(finmail.id, { token: token });
        return { token };
    }
    async findOne(id) {
        return this.userRepo.findOneBy({ id });
    }
    async logout(user) {
        console.log(user);
        const logout = this.userRepo.update(user.id, { token: null });
        return logout;
    }
    async forgotpassword(userdto) {
        const { email, password } = userdto;
        const finmail = await this.userRepo.findOneBy({ email });
        if (!finmail) {
            throw new common_1.NotFoundException('Email not found');
        }
        const hashPass = await (0, bcrypt_1.hash)(password, 10);
        const updatePass = await this.userRepo.update(finmail.id, { password: hashPass });
        return;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map