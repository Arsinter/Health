if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FrequencyItem_Params {
    settingParams?: ITaskItem;
    frequency?: string;
}
interface RemindTimeItem_Params {
    settingParams?: ITaskItem;
}
interface OpenRemindItem_Params {
    settingParams?: ITaskItem;
}
interface TargetSetItem_Params {
    settingParams?: ITaskItem;
}
interface TaskChooseItem_Params {
    settingParams?: ITaskItem;
    CustomTaskTable?;
    customTaskInfo?: TaskData[];
    customtaskname?: string;
    inputTaskName?: string;
}
import type { ITaskItem } from '../../model/TaskInitList';
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import CustomTaskApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/CustomTaskApi";
import type TaskData from '../../viewmodel/TaskData';
function __Text__targetSetCommon(): void {
    Text.fontSize(Const.DEFAULT_16);
    Text.flexGrow(1);
    Text.margin({ right: Const.DEFAULT_8 });
    Text.align(Alignment.End);
}
function __Text__targetSettingStyle(isOpen: boolean, taskID: number): void {
    Text.fontColor(isOpen ? { "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777272, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__remindTimeStyle(isOpen: boolean, isAlarm: boolean): void {
    Text.fontColor(isOpen && isAlarm ? { "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777272, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__frequencyStyle(isOpen: boolean, isAlarm: boolean): void {
    Text.fontSize(Const.DEFAULT_12);
    Text.flexGrow(1);
    Text.margin({ right: Const.DEFAULT_8 });
    Text.textAlign(TextAlign.End);
    Text.fontColor(isOpen && isAlarm ? { "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777272, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
export class TaskChooseItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.CustomTaskTable = new CustomTaskApi(() => {
        });
        this.__customTaskInfo = this.initializeConsume("customTaskInfo", "customTaskInfo");
        this.__customtaskname = this.initializeConsume("customtaskname", "customtaskname");
        this.inputTaskName = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskChooseItem_Params) {
        if (params.CustomTaskTable !== undefined) {
            this.CustomTaskTable = params.CustomTaskTable;
        }
        if (params.inputTaskName !== undefined) {
            this.inputTaskName = params.inputTaskName;
        }
    }
    updateStateVars(params: TaskChooseItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
        this.__customTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__customtaskname.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        this.__customTaskInfo.aboutToBeDeleted();
        this.__customtaskname.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    /*新增自定义任务相关*/
    private CustomTaskTable;
    private __customTaskInfo: ObservedPropertyAbstractPU<TaskData[]>;
    get customTaskInfo() {
        return this.__customTaskInfo.get();
    }
    set customTaskInfo(newValue: TaskData[]) {
        this.__customTaskInfo.set(newValue);
    }
    private __customtaskname: ObservedPropertyAbstractPU<string>;
    get customtaskname() {
        return this.__customtaskname.get();
    }
    set customtaskname(newValue: string) {
        this.__customtaskname.set(newValue);
    }
    private inputTaskName: string;
    /*--------------------------------------*/
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            //Text(this.settingParams.taskName).fontSize(Const.DEFAULT_20).fontWeight(FontWeight.Medium)
            //ID为8时可编辑
            /*---------------------------*/
            if (this.settingParams.taskID === 8) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        //Text(this.settingParams.taskName)
                        Text.create('任务名称:');
                        //Text(this.settingParams.taskName)
                        Text.fontSize(Const.DEFAULT_20);
                        //Text(this.settingParams.taskName)
                        Text.fontWeight(FontWeight.Medium);
                    }, Text);
                    //Text(this.settingParams.taskName)
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: `${this.customtaskname}` });
                        TextInput.fontSize(Const.DEFAULT_20);
                        TextInput.fontWeight(FontWeight.Medium);
                        TextInput.width(100);
                        TextInput.onChange((value) => {
                            this.inputTaskName = String(value);
                            Logger.info('我是用户输入的自定义名称', JSON.stringify(this.inputTaskName));
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('保存');
                        Button.width({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Button.onClick(() => {
                            /*if (this.inputTaskName == '' || this.inputTaskName.length > 30) {
                              //这里可以加一个判断逻辑，不合法时弹窗
                            }*/
                            //保存用户输入逻辑
                            this.customtaskname = this.inputTaskName;
                            this.customTaskInfo[0].name = this.inputTaskName;
                            this.CustomTaskTable.getRdbStore(() => {
                                this.CustomTaskTable.query(1, (result: TaskData[]) => {
                                    this.customTaskInfo.push(result[0]);
                                    this.customTaskInfo[0].name = this.inputTaskName;
                                    Logger.info('inputCustomname我保存用户输入', `${this.inputTaskName}`);
                                    this.CustomTaskTable.updateData(this.customTaskInfo[0], () => {
                                    });
                                    //这里修改名称后，默认之前的任务被关闭，使得更新逻辑正常(也不太正常...)
                                    //让任务关闭时，提醒同步关即可
                                    this.settingParams.isOpen = false;
                                    //if语句新增
                                    if (this.settingParams.isOpen == false) {
                                        this.settingParams.isAlarm = false;
                                    }
                                    /*// 定义一个eventId为1的事件，事件优先级为Low
                                    let event: emitter.InnerEvent = {
                                      eventId: 1,
                                      priority: emitter.EventPriority.LOW
                                    }
                                    // 将修改后的名字发送出去
                                    let eventData: emitter.EventData = {
                                      data: {
                                        content: this.name,
                                        id: 1,
                                        isEmpty: false
                                      }
                                    };
                                    // 发送eventId为1的事件，事件内容为eventData
                                    emitter.emit(event, eventData);*/
                                }, false);
                            });
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.settingParams.taskName);
                        Text.fontSize(Const.DEFAULT_20);
                        Text.fontWeight(FontWeight.Medium);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /*-------------------------*/
            Toggle.create({ type: ToggleType.Switch, isOn: this.settingParams.isOpen });
            /*-------------------------*/
            Toggle.width(Const.DEFAULT_56);
            /*-------------------------*/
            Toggle.height(Const.DEFAULT_32);
            /*-------------------------*/
            Toggle.selectedColor({ "id": 16777268, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            /*-------------------------*/
            Toggle.onChange((isOn) => {
                //让任务关闭时，提醒同步关即可
                this.settingParams.isOpen = isOn;
                //if语句新增
                if (this.settingParams.isOpen == false) {
                    this.settingParams.isAlarm = isOn;
                }
            });
        }, Toggle);
        /*-------------------------*/
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class TargetSetItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TargetSetItem_Params) {
    }
    updateStateVars(params: TargetSetItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.settingParams?.unit === '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.settingParams?.targetValue}`);
                        __Text__targetSetCommon();
                        __Text__targetSettingStyle(this.settingParams?.isOpen, this.settingParams?.taskID);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.settingParams?.targetValue} ${this.settingParams?.unit} ${Const.PER_DAY}`);
                        __Text__targetSetCommon();
                        __Text__targetSettingStyle(this.settingParams?.isOpen, this.settingParams?.taskID);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.DEFAULT_8);
            Image.height(Const.DEFAULT_16);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class OpenRemindItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: OpenRemindItem_Params) {
    }
    updateStateVars(params: OpenRemindItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.settingParams?.isAlarm });
            Toggle.width(Const.DEFAULT_56);
            Toggle.height(Const.DEFAULT_32);
            Toggle.selectedColor({ "id": 16777268, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Toggle.onChange((isOn) => {
                this.settingParams.isAlarm = isOn;
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class RemindTimeItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RemindTimeItem_Params) {
    }
    updateStateVars(params: RemindTimeItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.settingParams?.startTime);
            __Text__targetSetCommon();
            __Text__remindTimeStyle(this.settingParams?.isOpen, this.settingParams?.isAlarm);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.DEFAULT_8);
            Image.height(Const.DEFAULT_16);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class FrequencyItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.__frequency = this.initializeConsume("frequency", "frequency");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FrequencyItem_Params) {
    }
    updateStateVars(params: FrequencyItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
        this.__frequency.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        this.__frequency.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    private __frequency: ObservedPropertyAbstractPU<string>;
    get frequency() {
        return this.__frequency.get();
    }
    set frequency(newValue: string) {
        this.__frequency.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.frequency);
            __Text__targetSetCommon();
            __Text__frequencyStyle(this.settingParams?.isOpen, this.settingParams?.isAlarm);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.DEFAULT_8);
            Image.height(Const.DEFAULT_16);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
