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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("typeorm");
let TaskService = class TaskService {
    constructor(tsakRepo) {
        this.tsakRepo = tsakRepo;
    }
    async create(createTaskDto, user) {
        const addTask = await this.tsakRepo.create(Object.assign(Object.assign({}, createTaskDto), { user: user }));
        return this.tsakRepo.save(addTask);
    }
    async findAllAndCount(user) {
        return this.tsakRepo.count({ where: { user }, relations: ['user'] });
    }
    async findAll(user) {
        return this.tsakRepo.find({ where: { user }, relations: ['user'] });
    }
    async findOne(id) {
        return this.tsakRepo.findOne({ where: { id } });
    }
    async update(id, updateTaskDto, user) {
        const task = await this.tsakRepo.findOne({ where: { id } });
        if (!task) {
            throw new Error(`Task with Id ${id} not found`);
        }
        const updateTask = Object.assign(Object.assign({ user: user }, task), updateTaskDto);
        const savedTask = await this.tsakRepo.save(updateTask);
        const updatedTaskFromDB = await this.tsakRepo.findOne({ where: { id } });
        if (!updatedTaskFromDB) {
            throw new Error(`Failed to fetch updated task from the database`);
        }
        return updatedTaskFromDB;
    }
    async remove(id, user) {
        const deleteTask = await this.tsakRepo.softDelete(id);
        if (deleteTask) {
            const deleteby = await this.tsakRepo.update(id, { user: user });
            return "deleted";
        }
        if (!deleteTask.affected)
            throw new common_1.NotFoundException(id);
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map