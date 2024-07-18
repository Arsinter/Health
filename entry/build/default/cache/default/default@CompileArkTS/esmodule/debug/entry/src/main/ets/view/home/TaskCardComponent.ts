if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskCard_Params {
    taskInfoStr?: string;
    clickAction?: Function;
    taskInfo?: TaskInfo;
    CustomTaskTable?;
    customTaskInfo?: TaskData[];
    customtaskname?: string;
}
import { TaskMapById } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import HealthText from "@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import CustomTaskApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/CustomTaskApi";
import TaskData from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskData";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
function __Text__labelTextStyle(): void {
    Text.fontSize({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(Const.FONT_WEIGHT_500);
    Text.opacity(Const.OPACITY_6);
    Text.fontFamily({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
export class TaskCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__taskInfoStr = new SynchedPropertySimpleOneWayPU(params.taskInfoStr, this, "taskInfoStr");
        this.clickAction = (isClick: boolean) => {
        };
        this.__taskInfo = new ObservedPropertyObjectPU(new TaskInfo(-1, '', -1, '', false, '', '', '', false, '', false), this, "taskInfo");
        this.CustomTaskTable = new CustomTaskApi(() => {
        });
        this.__customTaskInfo = new ObservedPropertyObjectPU([], this, "customTaskInfo");
        this.__customtaskname = new ObservedPropertySimplePU('--', this, "customtaskname");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskCard_Params) {
        if (params.taskInfoStr === undefined) {
            this.__taskInfoStr.set('');
        }
        if (params.clickAction !== undefined) {
            this.clickAction = params.clickAction;
        }
        if (params.taskInfo !== undefined) {
            this.taskInfo = params.taskInfo;
        }
        if (params.CustomTaskTable !== undefined) {
            this.CustomTaskTable = params.CustomTaskTable;
        }
        if (params.customTaskInfo !== undefined) {
            this.customTaskInfo = params.customTaskInfo;
        }
        if (params.customtaskname !== undefined) {
            this.customtaskname = params.customtaskname;
        }
    }
    updateStateVars(params: TaskCard_Params) {
        this.__taskInfoStr.reset(params.taskInfoStr);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__taskInfoStr.purgeDependencyOnElmtId(rmElmtId);
        this.__taskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__customTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__customtaskname.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__taskInfoStr.aboutToBeDeleted();
        this.__taskInfo.aboutToBeDeleted();
        this.__customTaskInfo.aboutToBeDeleted();
        this.__customtaskname.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __taskInfoStr: SynchedPropertySimpleOneWayPU<string>;
    get taskInfoStr() {
        return this.__taskInfoStr.get();
    }
    set taskInfoStr(newValue: string) {
        this.__taskInfoStr.set(newValue);
    }
    private clickAction: Function;
    private __taskInfo: ObservedPropertyObjectPU<TaskInfo>;
    get taskInfo() {
        return this.__taskInfo.get();
    }
    set taskInfo(newValue: TaskInfo) {
        this.__taskInfo.set(newValue);
    }
    /*新增，读数据库获得用户自定义数据*/
    private CustomTaskTable;
    private __customTaskInfo: ObservedPropertyObjectPU<TaskData[]>;
    get customTaskInfo() {
        return this.__customTaskInfo.get();
    }
    set customTaskInfo(newValue: TaskData[]) {
        this.__customTaskInfo.set(newValue);
    }
    private __customtaskname: ObservedPropertySimplePU<string>;
    get customtaskname() {
        return this.__customtaskname.get();
    }
    set customtaskname(newValue: string) {
        this.__customtaskname.set(newValue);
    }
    /*----------*/
    aboutToAppear() {
        this.taskInfo = JSON.parse(this.taskInfoStr);
        //为了自定义任务新增
        //数据库中取出用户自定义的数据
        this.CustomTaskTable.getRdbStore(() => {
            this.CustomTaskTable.query(8, (result: TaskData[]) => {
                if (result && result.length > 0) {
                    this.customTaskInfo.push(result[0]);
                    this.customtaskname = this.customTaskInfo[0].name;
                    Logger.info('CustomInfo查到了', `${this.customTaskInfo[0].name}`);
                }
                else {
                    // 如果没有查询到数据，插入新数据
                    let newCustomInfo = new TaskData();
                    this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
                        newCustomInfo.id = id;
                        this.customTaskInfo.push(newCustomInfo);
                        this.customtaskname = this.customTaskInfo[0].name;
                        Logger.info('CustomInfo没有新建的', `${this.customTaskInfo[0].id}`);
                    });
                }
            }, false);
        });
        /*-----------------------------*/
    }
    targetValueBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.taskInfo.isDone) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HealthText(ViewPU.__proto__ !== NativeViewPartialUpdate && parent instanceof PUV2ViewBase ? parent : this, { title: '', titleResource: { "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 80 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: '',
                                        titleResource: { "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: ''
                                });
                            }
                        }, { name: "HealthText" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HealthText(ViewPU.__proto__ !== NativeViewPartialUpdate && parent instanceof PUV2ViewBase ? parent : this, {
                                    title: this.taskInfo.finValue || `--`,
                                    fontSize: { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 87 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: this.taskInfo.finValue || `--`,
                                        fontSize: { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: this.taskInfo.finValue || `--`
                                });
                            }
                        }, { name: "HealthText" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`);
                        __Text__labelTextStyle();
                        Text.fontWeight(Const.FONT_WEIGHT_400);
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.borderRadius({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.padding({ left: Const.THOUSANDTH_50, right: Const.THOUSANDTH_33 });
            Row.backgroundColor({ "id": 16777290, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.onClick(() => this.clickAction(true));
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction(() => this.clickAction(false));
            LongPressGesture.pop();
            Gesture.pop();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: Const.DEFAULT_6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(TaskMapById[this.taskInfo.taskID - 1].icon);
            Image.width({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HealthText(this, {
                        //修改title发过去的任务名称不为空，就可以显示出自定义名字
                        //title: '',
                        title: this.taskInfo.taskID === 8 ? this.customtaskname : '',
                        titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
                        fontFamily: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/home/TaskCardComponent.ets", line: 104 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            //修改title发过去的任务名称不为空，就可以显示出自定义名字
                            //title: '',
                            title: this.taskInfo.taskID === 8 ? this.customtaskname : '',
                            titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
                            fontFamily: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        //修改title发过去的任务名称不为空，就可以显示出自定义名字
                        //title: '',
                        title: this.taskInfo.taskID === 8 ? this.customtaskname : ''
                    });
                }
            }, { name: "HealthText" });
        }
        Row.pop();
        this.targetValueBuilder.bind(this)(this);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
