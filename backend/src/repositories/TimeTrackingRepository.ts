import BaseRepository from "./BaseRepository";
import TimeTracking from "../db/models/timeTracking";
import User from "../db/models/user"; // Importa il modello Client
import Supply from "../db/models/supply"; // Importa il modello Supply

export default class TimeTrackingRepository extends BaseRepository<TimeTrackingAttributes> {
    protected allowedSortByFields = [
        "startTime",
        "endTime",
        "created_at",
        "updated_at",
    ];

    protected allowedFilterByFields = ["employeeId", "clientId", "status"];

    constructor() {
        super(TimeTracking);
    }

    async create(data: Record<string, any>): Promise<TimeTrackingAttributes> {
        try {
            const { employeeId } = data;
            const now = new Date();

            // Check if there is an active time tracking for this employee
            const activeTimeTracking = await this.modelClass.findOne({
                where: { employeeId, status: 'active' }
            });

            console.log('activeTimeTracking:', activeTimeTracking);

            if (activeTimeTracking) {
                // Conclude the existing time tracking
                await this.updateActiveTimeTracking(activeTimeTracking.id, { endTime: now, status: 'concluded' });
            }

            // Create a new time tracking entry
            const newTimeTracking = await this.modelClass.create({
                ...data,
                startTime: now,
                status: 'active'
            });

            return newTimeTracking;
        } catch (error) {
            console.error('Error creating time tracking:', error);
            throw error;
        }
    }

    private async updateActiveTimeTracking(id: string, updates: Record<string, any>): Promise<TimeTrackingAttributes> {
        return super.update(id, updates);
    }

    getAll(options: Record<string, any> = {}): Promise<Array<TimeTrackingAttributes>> {
        const opts = {
            ...options,
            include: [
                { model: User, as: 'employee' }, // Include l'employee associato
                { model: User, as: 'client' },   // Include il client associato
                { model: Supply }  // Include i Supply associati
            ],
        };
        return super.getAll(opts);
    }

    getById(id: string, options?: Record<string, any>): Promise<TimeTrackingAttributes> {
        const opts = {
            include: [
                { model: User, as: 'employee' }, // Include l'employee associato
                { model: User, as: 'client' },   // Include il client associato
                { model: Supply }  // Include i Supply associati
            ],
            ...options,
        };
        return super.getById(id, opts);
    }

    findByClientId(clientId: string): Promise<Array<TimeTrackingAttributes>> {
        const opts = {
            where: { clientId },
            include: [
                { model: User, as: 'employee' }, // Include l'employee associato
                { model: User, as: 'client' },   // Include il client associato
                { model: Supply }  // Include i Supply associati
            ],
        };
        return this.modelClass.findAll(opts);
    }

    findByEmployeeId(employeeId: string): Promise<Array<TimeTrackingAttributes>> {
        const opts = {
            where: { employeeId },
            include: [
                { model: User, as: 'employee' }, // Include l'employee associato
                { model: User, as: 'client' },   // Include il client associato
                { model: Supply }  // Include i Supply associati
            ],
        };
        return this.modelClass.findAll(opts);
    }

    async stopTimer(id: string, body: Record<string, any>): Promise<TimeTrackingAttributes | null> {
        try {
            const timeTracking = await this.modelClass.findByPk(id, {
                include: [
                    { model: User, as: 'employee' }, // Include l'employee associato
                    { model: User, as: 'client' },   // Include il client associato
                    { model: Supply }  // Include i Supply associati
                ]
            });
            if (!timeTracking) {
                throw new Error(`Time tracking entry with id ${id} not found`);
            }
            timeTracking.endTime = body.endTime;
            timeTracking.status = 'completed';
            await timeTracking.save();
            return timeTracking;
        } catch (error) {
            console.error(`Error stopping timer for id ${id}:`, error);
            throw error;
        }
    }
}    