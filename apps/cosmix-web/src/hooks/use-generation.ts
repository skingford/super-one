"use client";

import { useCallback, useRef } from "react";
import { useGenerationStore } from "@/stores/generation";
import { useSettingsStore } from "@/stores/settings";
import { getTemplateById } from "@/lib/templates";
import { playSound } from "@/lib/utils";

const MOCK_CONTENT = `《逆袭之路》

林小雨站在教室门口，手里紧握着那张写满红叉的试卷。

"哈哈，又是倒数第一！"张强的嘲笑声在走廊里回荡。

周围的同学纷纷投来异样的目光，有的窃窃私语，有的掩嘴偷笑。林小雨低着头，快步穿过人群，找了个角落坐下。

三个月前，她从乡下转来这所重点高中。城里的教学进度比农村快太多，她根本跟不上。更糟糕的是，班上的"小团体"似乎专门盯上了她。

"乡巴佬，回你的山沟沟去吧！"这样的话，她每天都要听好几遍。

但她不知道的是，命运的转折点，就在下一秒。

"林小雨同学，请到校长办公室来一趟。"广播里突然传来通知。

所有人都愣住了。校长亲自叫人？这可是前所未有的事。

十分钟后，林小雨从校长办公室出来，手里多了一封信——国际数学奥林匹克竞赛的参赛邀请函。

原来，她在网上匿名发表的数学论文，引起了国家队教练的注意。那些看似简单的"差生"作业本上，藏着的是她对高等数学的深刻理解。

"从明天开始，林小雨同学将代表我校参加国际比赛。"当校长在全校大会上宣布这个消息时，张强的脸，绿了。

三个月后，林小雨站在领奖台上，手捧金牌。

台下，曾经嘲笑她的人，此刻只能仰望。

"记住，"她微笑着说，"永远不要小看任何人。"

（未完待续）`;

export function useGeneration() {
  const store = useGenerationStore();
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const abortRef = useRef<(() => void) | null>(null);

  const generate = useCallback(async () => {
    const { idea, templateId } = store;

    if (!idea.trim() || !templateId) {
      return;
    }

    const template = getTemplateById(templateId);
    if (!template) return;

    store.startGeneration();

    // Mock streaming generation
    const words = MOCK_CONTENT.split("");
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        store.appendContent(words[index]);
        index++;
      } else {
        clearInterval(interval);
        store.completeGeneration(words.length);
        if (soundEnabled) {
          playSound("complete");
        }
      }
    }, 20);

    abortRef.current = () => {
      clearInterval(interval);
      store.completeGeneration(index);
    };
  }, [store, soundEnabled]);

  const abort = useCallback(() => {
    if (abortRef.current) {
      abortRef.current();
      abortRef.current = null;
    }
  }, []);

  return {
    ...store,
    generate,
    abort,
  };
}
