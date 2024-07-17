import { ACHIEVEMENT_LEVEL_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import type GlobalInfo from '../viewmodel/GlobalInfo';
import GlobalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi";
export const ACHIEVEMENT_LEVEL_KEY = 'AchievementLevelKey';
export const SINGLE_LEVEL_KEYS = ['AchievementGetEarly', 'AchievementDrink', 'AchievementApple',
    'AchievementSmile', 'AchievementBrush', 'AchievementSleepEarly', 'AchievementRun'];
export const SINGLE_LEVEL_KEY_LIST = 'SingleLevelKeyList';
export function getAchievementLevel() {
    GlobalInfoApi.query((res: GlobalInfo) => {
        let globalInfo: GlobalInfo = res;
        let achievementStr = globalInfo.achievements ?? '';
        let achievements = achievementStr.split(',');
        if (achievements.length > 0) {
            AppStorage.set<Number>(ACHIEVEMENT_LEVEL_KEY, Number(achievements[achievements.length - 1]));
        }
    });
}
export function getSingleLevel() {
    let successiveDays: Array<number> = [];
    for (let i = 1; i <= 7; i++) {
        GlobalInfoApi.query((res: GlobalInfo) => {
            let globalInfo: GlobalInfo = res;
            let achievementStr = globalInfo.achievements ?? '';
            let achievements = achievementStr.split(',');
            if (achievements.length > 0) {
                AppStorage.set<Number>(SINGLE_LEVEL_KEYS[i - 1], Number(achievements[achievements.length - 1]));
            }
            if (achievements.length > 1) {
                successiveDays.push(Number(achievements[achievements.length - 1]));
            }
            else
                successiveDays.push(0);
        }, i);
    }
    AppStorage.set<Array<number>>(SINGLE_LEVEL_KEY_LIST, successiveDays);
}
export function isReachNewAchievement(globalInfo: GlobalInfo): boolean {
    let achievementStr = globalInfo.achievements ?? '';
    let achievements = achievementStr.split(',');
    if (ACHIEVEMENT_LEVEL_LIST.indexOf(globalInfo.checkInDays) >= 0 && achievements.indexOf(String(globalInfo.checkInDays)) < 0) {
        return true;
    }
    return false;
}
