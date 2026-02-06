import test from 'node:test'
import assert from 'node:assert/strict'
import { lessons } from '../src/data/lessons.js'
import { ALL_ITEMS } from '../src/data/items.js'
import { STARTING_OUTFIT, STARTING_UNLOCKED_ITEMS } from '../src/store/useGameStore.js'

test('lesson ids are unique', () => {
  const ids = lessons.map((lesson) => lesson.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('lesson unlock ids exist in item catalog', () => {
  const itemIds = new Set(ALL_ITEMS.map((item) => item.id))
  for (const lesson of lessons) {
    const unlockId = lesson.rewards?.unlockId
    if (unlockId) {
      assert.ok(itemIds.has(unlockId), `Missing item id for unlock: ${unlockId}`)
    }
  }
})

test('starting outfit items are all unlocked', () => {
  const unlocked = new Set(STARTING_UNLOCKED_ITEMS)
  for (const itemId of Object.values(STARTING_OUTFIT)) {
    assert.ok(unlocked.has(itemId), `Starting outfit item is not unlocked: ${itemId}`)
  }
})
