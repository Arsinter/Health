/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { BadgePanel, DegreeBadgePanel, SingleBadgePanel } from './BadgePanelComponent';
import { TitleBar } from './TitleBarComponent';
import Logger from '../common/utils/Logger';

@Component
export struct AchievementIndex {
  aboutToAppear() {
    Logger.debug('AchievementIndex', 'aboutToAppear')
  }

  onPageShow() {
    Logger.debug('AchievementIndex', 'onPageShow')
  }

  build() {
    Column({ space: Const.DEFAULT_20 }) {
      Scroll(){
        Column(){
          TitleBar()
          BadgePanel()
          SingleBadgePanel()
          DegreeBadgePanel()
        }
      }

    }
    .padding(Const.DEFAULT_10)
    .height(Const.FULL_HEIGHT)
    .width(Const.FULL_WIDTH)
    .backgroundColor($r('app.color.black'))

  }
}
