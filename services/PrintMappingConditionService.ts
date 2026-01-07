/**
 * PrintMappingConditionService - 打印映射条件池服务
 * 
 * 管理订单条件过滤，只有满足条件的订单才会执行路由映射和打印。
 * 设计原则：低耦合，独立管理条件逻辑。
 */

export type ConditionType = 'prefix' | 'zipRange' | 'regex' | 'routeInclude' | 'fileList';

export interface MappingCondition {
    id: string;
    type: ConditionType;
    value: string;
    enabled: boolean;
    description?: string;
    // 用于 fileList 类型：存储从文件加载的订单ID列表
    fileListData?: string[];
    fileName?: string;
}

export interface ConditionCheckResult {
    allowed: boolean;
    matchedCondition?: MappingCondition;
    reason?: string;
}

const STORAGE_KEY = 'LOGISTICS_PRINT_CONDITIONS';

class PrintMappingConditionService {
    private conditions: MappingCondition[] = [];
    private enabled: boolean = false;
    private idCounter: number = 0;

    constructor() {
        this.loadFromStorage();
    }

    /**
     * 检查订单是否满足条件池的任一条件
     * @param orderId - 订单ID
     * @param zipCode - 可选的ZIP码
     * @param route - 可选的路由名称
     * @returns 检查结果
     */
    checkOrder(orderId: string, zipCode?: string, route?: string): ConditionCheckResult {
        // 如果功能未启用，允许所有
        if (!this.enabled) {
            return { allowed: true, reason: 'Condition pool disabled' };
        }

        // 获取启用的条件
        const activeConditions = this.conditions.filter(c => c.enabled);

        // 如果没有启用的条件，允许所有（安全默认）
        if (activeConditions.length === 0) {
            return { allowed: true, reason: 'No active conditions' };
        }

        // OR 逻辑：匹配任一条件即可
        for (const condition of activeConditions) {
            if (this.matchCondition(condition, orderId, zipCode, route)) {
                return {
                    allowed: true,
                    matchedCondition: condition,
                    reason: `Matched: ${condition.type}=${condition.value}`
                };
            }
        }

        // 没有匹配任何条件
        return {
            allowed: false,
            reason: `No matching condition (${activeConditions.length} active rules)`
        };
    }

    /**
     * 检查单个条件是否匹配
     */
    private matchCondition(
        condition: MappingCondition,
        orderId: string,
        zipCode?: string,
        route?: string
    ): boolean {
        const upperOrderId = orderId.toUpperCase();
        const upperValue = condition.value.toUpperCase();

        switch (condition.type) {
            case 'prefix':
                // 支持通配符 * 作为后缀
                const prefixPattern = upperValue.replace(/\*+$/, '');
                return upperOrderId.startsWith(prefixPattern);

            case 'zipRange':
                if (!zipCode) return false;
                // 格式: "90000-91999" 或 "90210"
                if (condition.value.includes('-')) {
                    const [start, end] = condition.value.split('-').map(s => parseInt(s.trim(), 10));
                    const zipNum = parseInt(zipCode.split('-')[0], 10); // 取5位ZIP
                    return zipNum >= start && zipNum <= end;
                } else {
                    return zipCode.startsWith(condition.value);
                }

            case 'regex':
                try {
                    const regex = new RegExp(condition.value, 'i');
                    return regex.test(orderId);
                } catch {
                    console.warn(`[PrintCondition] Invalid regex: ${condition.value}`);
                    return false;
                }

            case 'routeInclude':
                if (!route) return false;
                const upperRoute = route.toUpperCase();
                // 支持通配符 *
                if (upperValue.includes('*')) {
                    const pattern = upperValue.replace(/\*/g, '.*');
                    return new RegExp(`^${pattern}$`).test(upperRoute);
                }
                return upperRoute === upperValue;

            case 'fileList':
                // 检查订单ID是否在文件列表中
                if (!condition.fileListData || condition.fileListData.length === 0) {
                    return false;
                }
                return condition.fileListData.some(item =>
                    item.toUpperCase() === upperOrderId
                );

            default:
                return false;
        }
    }

    /**
     * 检查服务是否启用
     */
    isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * 启用/禁用服务
     */
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        this.saveToStorage();
        console.log(`[PrintCondition] Service ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * 获取所有条件
     */
    getConditions(): MappingCondition[] {
        return [...this.conditions];
    }

    /**
     * 添加条件
     */
    addCondition(condition: Omit<MappingCondition, 'id'>): MappingCondition {
        const newCondition: MappingCondition = {
            ...condition,
            id: `cond-${++this.idCounter}-${Date.now()}`
        };
        this.conditions.push(newCondition);
        this.saveToStorage();
        console.log(`[PrintCondition] Added condition:`, newCondition);
        return newCondition;
    }

    /**
     * 删除条件
     */
    removeCondition(id: string): void {
        this.conditions = this.conditions.filter(c => c.id !== id);
        this.saveToStorage();
        console.log(`[PrintCondition] Removed condition: ${id}`);
    }

    /**
     * 更新条件
     */
    updateCondition(id: string, updates: Partial<MappingCondition>): void {
        this.conditions = this.conditions.map(c =>
            c.id === id ? { ...c, ...updates } : c
        );
        this.saveToStorage();
    }

    /**
     * 切换条件启用状态
     */
    toggleCondition(id: string): void {
        const condition = this.conditions.find(c => c.id === id);
        if (condition) {
            condition.enabled = !condition.enabled;
            this.saveToStorage();
        }
    }

    /**
     * 清空所有条件
     */
    clearConditions(): void {
        this.conditions = [];
        this.saveToStorage();
    }

    /**
     * 从 LocalStorage 加载
     */
    private loadFromStorage(): void {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                this.conditions = data.conditions || [];
                this.enabled = data.enabled ?? false;
                this.idCounter = data.idCounter || 0;
                console.log(`[PrintCondition] Loaded ${this.conditions.length} conditions, enabled=${this.enabled}`);
            }
        } catch (e) {
            console.warn('[PrintCondition] Failed to load from storage:', e);
        }
    }

    /**
     * 保存到 LocalStorage
     */
    private saveToStorage(): void {
        try {
            const data = {
                conditions: this.conditions,
                enabled: this.enabled,
                idCounter: this.idCounter
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('[PrintCondition] Failed to save to storage:', e);
        }
    }

    /**
     * Get display label for condition type
     */
    static getConditionTypeLabel(type: ConditionType): string {
        const labels: Record<ConditionType, string> = {
            prefix: 'Prefix Match',
            zipRange: 'ZIP Range',
            regex: 'Regex',
            routeInclude: 'Route Filter',
            fileList: 'File List'
        };
        return labels[type] || type;
    }

    /**
     * Get placeholder for condition type
     */
    static getConditionPlaceholder(type: ConditionType): string {
        const placeholders: Record<ConditionType, string> = {
            prefix: 'ZX, OR*, AB***',
            zipRange: '90000-91999 or 902',
            regex: '^[A-Z]{2}\\d{6}$',
            routeInclude: 'LA-001, SF-*',
            fileList: 'Import from TXT file'
        };
        return placeholders[type] || '';
    }
}

export const printMappingConditionService = new PrintMappingConditionService();
