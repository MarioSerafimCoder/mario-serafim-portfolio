import assert from "node:assert/strict";
import test from "node:test";
import { storyTime, storyScene } from "../components/motion/story-timeline.ts";

test("scroll mantém pausas e limites do vídeo", () => {
  assert.equal(storyTime(-1,8),0);
  assert.equal(storyTime(.08,8),0);
  assert.equal(storyTime(.25,8),storyTime(.32,8));
  assert.equal(storyTime(2,8),7.84);
  assert.equal(storyScene(0),0);
  assert.equal(storyScene(.4),1);
  assert.equal(storyScene(.6),2);
  assert.equal(storyScene(1),3);
});
test("fast scroll e reverse scroll mantêm tempo contínuo e reversível", () => {
  const positions = Array.from({length:101}, (_, i) => i/100);
  const times = positions.map(p => storyTime(p,8));
  for(let i=1;i<times.length;i++) {
    assert.ok(times[i] >= times[i-1]);
    assert.ok(times[i]-times[i-1]<.15);
  }
  assert.deepEqual(positions.toReversed().map(p=>storyTime(p,8)),times.toReversed());
});
