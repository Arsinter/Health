if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FrequencyDialog_Params {
    settingParams?: ITaskItem;
    frequency?: string;
    controller?: CustomDialogController;
    currentFrequency?: string;
    frequencyChooseRange?: FrequencyContentType[];
}
interface RemindTimeDialog_Params {
    settingParams?: ITaskItem;
    controller?: CustomDialogController;
    currentTime?: string;
}
interface TargetSettingDialog_Params {
    settingParams?: ITaskItem;
    controller?: CustomDialogController;
    drinkRange?: string[];
    appleRange?: string[];
    smileRange?: string[];
    teethRange?: string[];
    runRange?: string[];
    currentValue?: string;
    currentTime?: string;
}
import promptAction from "@ohos:promptAction";
import type { ITaskItem } from '../../model/TaskInitList';
import { frequencyRange } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { returnTimeStamp, createAppleRange, createDrinkRange, createSmileRange, createTeethRange, createRunRange, formatTime } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel";
import { taskType } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type { FrequencyContentType } from '../../model/TaskInitList';
export class TargetSettingDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.drinkRange = createDrinkRange();
        this.appleRange = createAppleRange();
        this.smileRange = createSmileRange();
        this.teethRange = createTeethRange();
        this.runRange = createRunRange();
        this.currentValue = this.settingParams.targetValue;
        this.currentTime = Const.DEFAULT_TIME;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TargetSettingDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.drinkRange !== undefined) {
            this.drinkRange = params.drinkRange;
        }
        if (params.appleRange !== undefined) {
            this.appleRange = params.appleRange;
        }
        if (params.smileRange !== undefined) {
            this.smileRange = params.smileRange;
        }
        if (params.teethRange !== undefined) {
            this.teethRange = params.teethRange;
        }
        if (params.runRange !== undefined) {
            this.runRange = params.runRange;
        }
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
    }
    updateStateVars(params: TargetSettingDialog_Params) {
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
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private drinkRange: string[];
    private appleRange: string[];
    private smileRange: string[]; //新增笑次数
    private teethRange: string[]; //新增刷牙次数
    private runRange: string[]; //新增跑步范围
    private currentValue: string;
    private currentTime: string;
    compareTime(startTime: string, endTime: string) {
        if (returnTimeStamp(this.currentTime) < returnTimeStamp(startTime) ||
            returnTimeStamp(this.currentTime) > returnTimeStamp(endTime)) {
            promptAction.showToast({
                message: Const.CHOOSE_TIME_OUT_RANGE
            });
            return false;
        }
        return true;
    }
    setTargetValue() {
        if (this.settingParams?.taskID === taskType.getup) {
            if (!this.compareTime(Const.GET_UP_EARLY_TIME, Const.GET_UP_LATE_TIME)) {
                return;
            }
            this.settingParams.targetValue = this.currentTime;
            return;
        }
        if (this.settingParams?.taskID === taskType.sleepEarly) {
            if (!this.compareTime(Const.SLEEP_EARLY_TIME, Const.SLEEP_LATE_TIME)) {
                return;
            }
            this.settingParams.targetValue = this.currentTime;
            return;
        }
        this.settingParams.targetValue = this.currentValue;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(67:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_560);
            Column.padding(Const.DEFAULT_12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(68:7)");
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777267, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(69:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ right: Const.DEFAULT_12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.settingParams?.taskID === taskType.getup ?
                Const.GET_UP_TIME_RANGE :
                this.settingParams?.taskID === taskType.sleepEarly ?
                    Const.SLEEP_TIME_RANGE : '');
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(70:9)");
            Text.fontSize(Const.DEFAULT_16);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ([taskType.getup, taskType.sleepEarly].indexOf(this.settingParams?.taskID) > Const.HAS_NO_INDEX) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TimePicker.create({
                            selected: new Date(`${new Date().toDateString()} 8:00:00`)
                        });
                        TimePicker.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(80:9)");
                        TimePicker.height(Const.THOUSANDTH_800);
                        TimePicker.useMilitaryTime(true);
                        TimePicker.onChange((value: TimePickerResult) => {
                            this.currentTime = formatTime(value);
                        });
                    }, TimePicker);
                    TimePicker.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        //新增修改
                        //TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange })
                        TextPicker.create({
                            range: this.settingParams?.taskID === taskType.drinkWater
                                ? this.drinkRange
                                : this.settingParams?.taskID === taskType.eatApple
                                    ? this.appleRange
                                    : this.settingParams?.taskID === taskType.smile
                                        ? this.smileRange
                                        : this.settingParams?.taskID === taskType.brushTeeth
                                            ? this.teethRange
                                            : this.settingParams?.taskID === taskType.run
                                                ? this.runRange
                                                : []
                        });
                        TextPicker.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(91:9)");
                        //新增修改
                        //TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange })
                        TextPicker.width(Const.THOUSANDTH_900);
                        //新增修改
                        //TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange })
                        TextPicker.height(Const.THOUSANDTH_800);
                        //新增修改
                        //TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange })
                        TextPicker.onChange((value: string | string[]) => {
                            this.currentValue = (value as string)?.split(' ')[0];
                        });
                    }, TextPicker);
                    //新增修改
                    //TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange })
                    TextPicker.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(111:7)");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(112:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777371, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.currentTime = Const.DEFAULT_TIME;
                this.currentValue = '';
                this.controller.close();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(119:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777371, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.setTargetValue();
                this.controller.close();
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class RemindTimeDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.currentTime = Const.DEFAULT_TIME;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RemindTimeDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
    }
    updateStateVars(params: RemindTimeDialog_Params) {
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
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private currentTime: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(143:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_560);
            Column.padding(Const.DEFAULT_12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(144:7)");
            Column.width(Const.THOUSANDTH_900);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(145:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ top: Const.DEFAULT_10 });
            Text.width(Const.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TimePicker.create({
                selected: new Date(`${new Date().toDateString()} 8:00:00`)
            });
            TimePicker.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(153:7)");
            TimePicker.height(Const.THOUSANDTH_800);
            TimePicker.useMilitaryTime(true);
            TimePicker.onChange((value: TimePickerResult) => {
                this.currentTime = formatTime(value);
            });
        }, TimePicker);
        TimePicker.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(162:7)");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(163:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777371, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.currentTime = Const.DEFAULT_TIME;
                this.controller.close();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(169:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777371, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.settingParams.startTime = this.currentTime;
                this.controller.close();
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class FrequencyDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.__frequency = this.initializeConsume("frequency", "frequency");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.currentFrequency = Const.EVERYDAY;
        this.frequencyChooseRange = frequencyRange();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FrequencyDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.currentFrequency !== undefined) {
            this.currentFrequency = params.currentFrequency;
        }
        if (params.frequencyChooseRange !== undefined) {
            this.frequencyChooseRange = params.frequencyChooseRange;
        }
    }
    updateStateVars(params: FrequencyDialog_Params) {
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
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private currentFrequency: string;
    private frequencyChooseRange: FrequencyContentType[];
    setFrequency() {
        const checkedArr = this.frequencyChooseRange.filter((item) => item?.isChecked);
        if (checkedArr.length === this.frequencyChooseRange.length || checkedArr.length === Const.NO_LENGTH) {
            this.currentFrequency = Const.EVERYDAY;
            this.settingParams.frequency = Const.INIT_WEEK_IDS;
            return;
        }
        this.currentFrequency = checkedArr.reduce((sum, current) => {
            return sum + ' ' + current?.label;
        }, '');
        this.settingParams.frequency = checkedArr.reduce((sum, current) => {
            return sum === '' ? sum + current?.id : sum + ',' + current?.id;
        }, '');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(210:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_900);
            Column.padding(Const.DEFAULT_12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(211:7)");
            Column.width(Const.THOUSANDTH_900);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777261, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(212:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ top: Const.DEFAULT_10 });
            Text.width(Const.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(220:7)");
            List.divider({
                strokeWidth: Const.DEFAULT_2,
                color: { "id": 16777373, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            List.flexGrow(1);
            List.padding(Const.DEFAULT_12);
            List.width(Const.THOUSANDTH_1000);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(222:11)");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(223:13)");
                            Row.width(Const.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.height(Const.DEFAULT_60);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item?.label);
                            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(224:15)");
                            Text.fontSize(Const.DEFAULT_20);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Toggle.create({ type: ToggleType.Checkbox });
                            Toggle.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(225:15)");
                            Toggle.onChange((isOn) => {
                                item.isChecked = isOn;
                            });
                        }, Toggle);
                        Toggle.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.frequencyChooseRange, forEachItemGenFunction, (item: FrequencyContentType) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(244:7)");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_900);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(245:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777371, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.controller.close();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/dialog/TaskSettingDialog.ets(250:9)");
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777371, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.setFrequency();
                this.frequency = this.currentFrequency;
                this.controller.close();
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
