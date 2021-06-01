layers(['obj', 'ui'], 'obj')

const map = [
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '      %   =*=%=                       ',
  '                                      ',
  '                    -+                ',
  '              ^   ^ ()                ',
  'xxxxxxxxxxxxxxxxxxxxxxxx  xxxxxxxxxxxx',
]

  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    'x': [sprite('brick'), solid()],
    '$': [sprite('coin')],
    '%': [sprite('question'), 'coin-surprise', solid()],
    '*': [sprite('question'), 'mushroom-surprise', solid()],
    '}': [sprite('unboxed')],
    '(': [sprite('pipe-left'), scale(0.5), solid()],
    ')': [sprite('pipe-right'), scale(0.5, solid())],
    '-': [sprite('pipe-top-left-side'), scale(0.5), solid()],
    '+': [sprite('pipe-top-right-side'), scale(0.5), solid()],
    '^': [sprite('evil-shroom-1'), solid()],
    '#': [sprite('mushroom')],
}

const gameLevel = addLevel(map, levelCfg)

const scoreLabel = add([
  text('0'),
  pos(30,6),
  layer('ui'),
  {
    value: '0'
  }
])

add([text('level ' + '0'), pos(40, 6)])

const player = add([sprite('mario-standing'), 
pos(30, 0),
body()
])

const MOVE_SPEED = 120

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

const JUMP_FORCE = 300

keyPress('space', () => {
  if(player.grounded())
  player.jump(JUMP_FORCE)
})

player.on('headbump', (obj) => {
  if(obj.is('coin-surprise')) {
    gameLevel.spawn('$', obj.gridPos.sub(0,1))
    destroy(obj)
  }
})