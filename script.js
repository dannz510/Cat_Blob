function init() {  
  const tiles = [
    { id: 'h_edge', criteria: ['xoxx'] },
    { id: 'h', criteria: ['xoxo', 'ooxo'] },
    { id: 't_joint_down', criteria: ['xooo','oooo'], criteria2: ['xx'] },
    { id: 'h_edge_h', criteria: ['xxxo'] },
    { id: 'v_up_edge', criteria: ['xxox'] },
    { id: 'l_corner', criteria: ['ooxx'] },
    { id: 'l_corner_h', criteria: ['oxxo'] },
    { id: 'r_corner', criteria: ['xoox'], criteria2: ['xx','xo'] },
    { id: 'r_corner_h', criteria: ['xxoo'], criteria2: ['xx','ox'] },
    { id: 'v', criteria: ['oxox'] },
    { id: 'dot', criteria: ['xxxx'] },
    { id: 'v_down_edge', criteria: ['oxxx'] },
    { id: 'block_edge', criteria: ['ooox'], criteria2: ['oo', 'ox'] },
    { id: 'block_edge_h', criteria: ['oxoo'], criteria2: ['oo','xo'] },
    { id: 'block', criteria: ['oooo','xooo'], criteria2: ['oo'] },
    { id: 'block_corner', criteria: ['xoox'], criteria2: ['oo','ox'] },
    { id: 'block_corner_h', criteria: ['oxox'], criteria2: ['oo','xo'] },
    { id: 'block_edge_v', criteria: ['xoxo'], criteria2: ['ox','oo'] },
    { id: 'block_edge_v_h', criteria: ['ooxo'], criteria2: ['xo','oo'] },
    { id: 'block_t_joint_down', criteria: ['xoxx'], criteria2: ['oo'] },
    { id: 'block_t_joint_down_h', criteria: ['ooxx'], criteria2: ['oo'] },
    { id: 'block_t_joint_up', criteria: ['xxoo'], criteria2: ['oo'] },
    { id: 'block_t_joint_up_h', criteria: ['xxox'], criteria2: ['oo'] },
    { id: 'block_t_joint_left', criteria: ['xoxo'], criteria2: ['xo','xx'] },
    { id: 'block_t_joint_left_h', criteria: ['oxox'], criteria2: ['ox','xx'] },
    { id: 'block_t_joint_right', criteria: ['xoxo'], criteria2: ['ox','xx'] },
    { id: 'block_t_joint_right_h', criteria: ['oxox'], criteria2: ['xo','xx'] },
    { id: 'block_t_joint_right_v', criteria: ['oxxx'], criteria2: ['oo','xo'] },
    { id: 'block_t_joint_left_v', criteria: ['ooxx'], criteria2: ['oo','ox'] },
    { id: 'block_t_joint_up_v', criteria: ['xxxx'], criteria2: ['oo','ox'] },
    { id: 'block_t_joint_down_v', criteria: ['xxoo'], criteria2: ['ox','xx'] },
    { id: 'block_end_v_h', criteria: ['ooxx'], criteria2: ['ox','xo'] },
    { id: 'block_corner_v', criteria: ['xoxx'], criteria2: ['ox'] },
    { id: 'block_corner_v_h', criteria: ['xoxx'], criteria2: ['xo'] },
    { id: 'block_end_h', criteria: ['oxxx'], criteria2: ['xx','ox'] },
    { id: 'block_end_h_h', criteria: ['oxxx'], criteria2: ['xx','xo'] },
    { id: 'block_end_v', criteria: ['xoxx'], criteria2: ['xx','ox'] },
    { id: 'block_end_v_h2', criteria: ['xxxx'], criteria2: ['xo','xx'] }
  ]
  const gameStatus = {
    WAITING_FOR_START: 0,
    PLAYING: 1,
    PAUSE: 2,
    GAME_OVER: 3,
    GAME_WON: 4,
    DEMO: 5
  }
  const settings = {
    FPS: 30,
    frame: 0,
    status: gameStatus.WAITING_FOR_START,
    spriteInterval: null,
    npcMotioninterval: null,
    timeLimit: 90,
    difficulty: 1, // 1 to 5
    isWindowActive: true,
    gameOver: false,
    gameWon: false,
    demoMode: true,
    map: {
      el: document.querySelector('.map-image'),
      ctx: document.querySelector('.map-image').getContext('2d'),
      wrapperEl: document.querySelector('.map-image-wrapper'),
      coverEl: document.querySelector('.map-cover'),
      width: null,
      height: null,
      unit: 16,
      mapTiles: document.querySelector('.map-tiles'),
      blocks: [],
      data: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      ],
      width: 40,
      height: 40,
      columns: 40,
      rows: 40
    },
    player: {
      el: document.querySelector('.player'),
      x: 1,
      y: 1,
      offsetX: null,
      offsetY: null,
      walkingDirection: null,
      walkingInterval: null,
      speed: 1,
      life: 4,
      invincible: false,
      mouseBlobCaught: {
        max: 20,
        no: 0
      },
      itemScore: 0
    },
    npcs: [],
    items: [],
    cursor: {
      el: document.querySelector('.cursor'),
      x: null,
      y: null
    }
  }

  const elements = {
    overlay: document.querySelector('.overlay'),
    messageWindow: document.querySelector('.message-window'),
    startButton: document.querySelector('.start'),
    lifeMarkers: document.querySelectorAll('.life-marker'),
    mouseBlobCounter: document.querySelector('.catch-no'),
    timeIndicator: document.querySelector('.time-indicator'),
    control: document.querySelector('.control'),
    controlUp: document.createElement('div'),
    controlDown: document.createElement('div'),
    controlLeft: document.createElement('div'),
    controlRight: document.createElement('div'),
    howToPlay: document.querySelector('.how-to-play')
  }

  function setupMap() {
    settings.map.el.width = settings.map.width * settings.map.unit
    settings.map.el.height = settings.map.height * settings.map.unit
    
    settings.map.ctx.drawImage(settings.map.mapTiles, 0, 0)
    
    settings.map.blocks = []
    settings.map.data.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === 1) {
          const block = {
            x: columnIndex,
            y: rowIndex
          }
          settings.map.blocks.push(block)
        }
      })
    })

    drawMap()

  }

  function drawMap() {
    settings.map.ctx.clearRect(0,0,settings.map.el.width,settings.map.el.height)
    settings.map.ctx.drawImage(settings.map.mapTiles, 0, 0)
    settings.map.blocks.forEach(block => {
      const neighbors = getNeighbors(block.x, block.y)
      const criteria = getCriteria(neighbors)
      const tile = tiles.find(tile => {
        return tile.criteria.includes(criteria)
      })
      if (tile) {
        let x = block.x * settings.map.unit
        let y = block.y * settings.map.unit
        let sx = settings.map.unit * tiles.indexOf(tile)
        let sy = 0
        settings.map.ctx.drawImage(settings.map.mapTiles, sx, sy, settings.map.unit, settings.map.unit, x, y, settings.map.unit, settings.map.unit)
      }
    })
  }

  function getNeighbors(x, y) {
    const neighbors = {
      up: settings.map.data[y-1] ? settings.map.data[y-1][x] : null,
      down: settings.map.data[y+1] ? settings.map.data[y+1][x] : null,
      left: settings.map.data[y][x-1],
      right: settings.map.data[y][x+1]
    }
    return neighbors
  }

  function getCriteria(neighbors) {
    let criteria = ''
    for (let direction in neighbors) {
      if (neighbors[direction] === 1) {
        criteria += 'x'
      } else if (neighbors[direction] === 0) {
        criteria += 'o'
      } else {
        criteria += 'o'
      }
    }
    return criteria
  }

  function start() {
    settings.status = gameStatus.PLAYING
    elements.overlay.classList.add('d-none')
    initPlayerPosition()
    updateMapSize()
    startTimer()
    startSpriteAnimation()
    startNpcMotion()
    spawnNpc()
    spawnItems()
  }

  function initPlayerPosition() {
    settings.player.x = 1
    settings.player.y = 1
    settings.player.el.style.left = settings.player.x * settings.map.unit + 'px'
    settings.player.el.style.top = settings.player.y * settings.map.unit + 'px'
    settings.player.el.classList.remove('d-none')
  }
  
  function updateMapSize() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const mapWidth = settings.map.width * settings.map.unit
    const mapHeight = settings.map.height * settings.map.unit
    settings.map.wrapperEl.style.width = mapWidth + 'px'
    settings.map.wrapperEl.style.height = mapHeight + 'px'
    
    settings.player.offsetX = windowWidth/2 - settings.map.unit/2 - settings.player.x * settings.map.unit
    settings.player.offsetY = windowHeight/2 - settings.map.unit/2 - settings.player.y * settings.map.unit
    settings.map.wrapperEl.style.transform = `translate(${settings.player.offsetX}px, ${settings.player.offsetY}px)`
  }

  function adjustMapWidthAndHeight() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (windowWidth > windowHeight) {
      settings.map.width = 40
      settings.map.height = 30
      settings.map.el.width = settings.map.width * settings.map.unit
      settings.map.el.height = settings.map.height * settings.map.unit
    } else {
      settings.map.width = 20
      settings.map.height = 40
      settings.map.el.width = settings.map.width * settings.map.unit
      settings.map.el.height = settings.map.height * settings.map.unit
    }
    
    updateMapSize()
    setupMap()
  }

  function startSpriteAnimation() {
    settings.spriteInterval = setInterval(() => {
      if (settings.isWindowActive) {
        settings.frame++
        if (settings.frame > 3) {
          settings.frame = 0
        }
        document.querySelectorAll('.sprite').forEach(sprite => {
          sprite.style.backgroundPositionX = -settings.frame * settings.map.unit * 2 + 'px'
        })
      }
    }, 1000/settings.FPS)
  }

  function startNpcMotion() {
    settings.npcMotioninterval = setInterval(() => {
      if (settings.isWindowActive) {
        settings.npcs.forEach(npc => {
          if (npc.status === 'alive') {
            moveNpc(npc)
          }
        })
      }
    }, 300)
  }

  function spawnNpc() {
    const totalNpc = settings.difficulty * 2
    for (let i = 0; i < totalNpc; i++) {
      const npc = {
        el: document.createElement('div'),
        x: null,
        y: null,
        direction: null,
        type: 'dogblob',
        status: 'alive',
        motionTimer: null
      }
      npc.el.classList.add('sprite-container')
      npc.el.innerHTML = '<div class="dogblob sprite"></div>'
      settings.map.coverEl.appendChild(npc.el)

      let newX = Math.floor(Math.random() * settings.map.columns)
      let newY = Math.floor(Math.random() * settings.map.rows)
      while (!canMoveTo(newX, newY, npc)) {
        newX = Math.floor(Math.random() * settings.map.columns)
        newY = Math.floor(Math.random() * settings.map.rows)
      }
      npc.x = newX
      npc.y = newY
      npc.el.style.left = npc.x * settings.map.unit + 'px'
      npc.el.style.top = npc.y * settings.map.unit + 'px'
      
      settings.npcs.push(npc)
    }
  }

  function moveNpc(npc) {
    let newX = npc.x
    let newY = npc.y
    const possibleMoves = []

    if (canMoveTo(npc.x, npc.y - 1, npc)) {
      possibleMoves.push('up')
    }
    if (canMoveTo(npc.x, npc.y + 1, npc)) {
      possibleMoves.push('down')
    }
    if (canMoveTo(npc.x - 1, npc.y, npc)) {
      possibleMoves.push('left')
    }
    if (canMoveTo(npc.x + 1, npc.y, npc)) {
      possibleMoves.push('right')
    }

    if (possibleMoves.length > 0) {
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
      switch (randomMove) {
        case 'up': newY--; break
        case 'down': newY++; break
        case 'left': newX--; break
        case 'right': newX++; break
      }
      npc.x = newX
      npc.y = newY
      npc.el.style.left = npc.x * settings.map.unit + 'px'
      npc.el.style.top = npc.y * settings.map.unit + 'px'

      if (randomMove === 'left') {
        npc.el.querySelector('.sprite').classList.add('left')
        npc.el.querySelector('.sprite').classList.remove('right')
      } else if (randomMove === 'right') {
        npc.el.querySelector('.sprite').classList.add('right')
        npc.el.querySelector('.sprite').classList.remove('left')
      }
    }
  }

  function spawnItems() {
    const totalMouseblobs = settings.player.mouseBlobCaught.max
    for (let i = 0; i < totalMouseblobs; i++) {
      const mouseBlob = {
        el: document.createElement('div'),
        x: null,
        y: null,
        type: 'mouseblob',
        status: 'alive'
      }
      mouseBlob.el.classList.add('sprite-container')
      mouseBlob.el.innerHTML = '<div class="mouseblob sprite"></div>'
      settings.map.coverEl.appendChild(mouseBlob.el)

      let newX = Math.floor(Math.random() * settings.map.columns)
      let newY = Math.floor(Math.random() * settings.map.rows)
      while (!canMoveTo(newX, newY, mouseBlob)) {
        newX = Math.floor(Math.random() * settings.map.columns)
        newY = Math.floor(Math.random() * settings.map.rows)
      }
      mouseBlob.x = newX
      mouseBlob.y = newY
      mouseBlob.el.style.left = mouseBlob.x * settings.map.unit + 'px'
      mouseBlob.el.style.top = mouseBlob.y * settings.map.unit + 'px'
      
      settings.items.push(mouseBlob)
    }

    // Spawn 2 bombs and 1 heart
    const specialItems = [
      { type: 'bomb', count: 2 },
      { type: 'heart', count: 1 },
      { type: 'invincible', count: 1 }
    ]

    specialItems.forEach(item => {
      for (let i = 0; i < item.count; i++) {
        const specialItem = {
          el: document.createElement('div'),
          x: null,
          y: null,
          type: item.type,
          status: 'alive'
        }
        specialItem.el.classList.add('sprite-container')
        specialItem.el.innerHTML = `<div class="${item.type} sprite"></div>`
        settings.map.coverEl.appendChild(specialItem.el)

        let newX = Math.floor(Math.random() * settings.map.columns)
        let newY = Math.floor(Math.random() * settings.map.rows)
        while (!canMoveTo(newX, newY, specialItem)) {
          newX = Math.floor(Math.random() * settings.map.columns)
          newY = Math.floor(Math.random() * settings.map.rows)
        }
        specialItem.x = newX
        specialItem.y = newY
        specialItem.el.style.left = specialItem.x * settings.map.unit + 'px'
        specialItem.el.style.top = specialItem.y * settings.map.unit + 'px'
        
        settings.items.push(specialItem)
      }
    })
  }

  function canMoveTo(x, y, obj) {
    // Check if the coordinates are within map boundaries
    if (x < 0 || x >= settings.map.columns || y < 0 || y >= settings.map.rows) {
      return false
    }

    // Check for collision with blocks (walls)
    const collision = settings.map.blocks.some(block => block.x === x && block.y === y)
    if (collision) {
      return false
    }

    // Check for collision with player if object is NPC or Item
    if ((obj.type === 'dogblob' || obj.type === 'mouseblob' || obj.type === 'bomb' || obj.type === 'heart' || obj.type === 'invincible') && x === settings.player.x && y === settings.player.y) {
      return false
    }

    // Check for collision with other NPCs if object is NPC
    if (obj.type === 'dogblob') {
      const npcCollision = settings.npcs.some(npc => npc !== obj && npc.x === x && npc.y === y)
      if (npcCollision) {
        return false
      }
    }

    // Check for collision with other items if object is Item
    if (obj.type === 'mouseblob' || obj.type === 'bomb' || obj.type === 'heart' || obj.type === 'invincible') {
      const itemCollision = settings.items.some(item => item !== obj && item.x === x && item.y === y)
      if (itemCollision) {
        return false
      }
    }

    return true
  }


  function updatePlayerPosition() {
    let newX = settings.player.x
    let newY = settings.player.y

    if (settings.player.walkingDirection === 'up') {
      newY--
      settings.player.el.querySelector('.sprite').style.backgroundPositionY = -settings.map.unit * 2 * 3 + 'px' // Up animation
    } else if (settings.player.walkingDirection === 'down') {
      newY++
      settings.player.el.querySelector('.sprite').style.backgroundPositionY = -settings.map.unit * 2 * 0 + 'px' // Down animation
    } else if (settings.player.walkingDirection === 'left') {
      newX--
      settings.player.el.querySelector('.sprite').style.backgroundPositionY = -settings.map.unit * 2 * 2 + 'px' // Left animation
    } else if (settings.player.walkingDirection === 'right') {
      newX++
      settings.player.el.querySelector('.sprite').style.backgroundPositionY = -settings.map.unit * 2 * 1 + 'px' // Right animation
    }

    if (canMoveTo(newX, newY, settings.player)) {
      settings.player.x = newX
      settings.player.y = newY
      settings.player.el.style.left = settings.player.x * settings.map.unit + 'px'
      settings.player.el.style.top = settings.player.y * settings.map.unit + 'px'

      settings.player.offsetX = window.innerWidth/2 - settings.map.unit/2 - settings.player.x * settings.map.unit
      settings.player.offsetY = window.innerHeight/2 - settings.map.unit/2 - settings.player.y * settings.map.unit
      settings.map.wrapperEl.style.transform = `translate(${settings.player.offsetX}px, ${settings.player.offsetY}px)`
    }
    
    checkCollisions()
  }

  function checkCollisions() {
    // Check collision with NPCs
    settings.npcs.forEach(npc => {
      if (npc.status === 'alive' && npc.x === settings.player.x && npc.y === settings.player.y) {
        if (!settings.player.invincible) {
          updateLife({ damage: true })
          settings.player.el.classList.add('blink')
          settings.player.invincible = true
          setTimeout(() => {
            settings.player.invincible = false
            settings.player.el.classList.remove('blink')
          }, 2000)
        }
      }
    })

    // Check collision with items
    settings.items.forEach(item => {
      if (item.status === 'alive' && item.x === settings.player.x && item.y === settings.player.y) {
        item.status = 'collected'
        item.el.classList.add('d-none')
        
        if (item.type === 'mouseblob') {
          settings.player.mouseBlobCaught.no++
          updateMouseBlobCounter()
        } else if (item.type === 'bomb') {
          blastNpc()
          settings.player.itemScore++
        } else if (item.type === 'heart') {
          updateLife({ damage: false })
          settings.player.itemScore++
        } else if (item.type === 'invincible') {
          settings.player.invincible = true
          settings.player.el.querySelector('.sprite').classList.add('invincible')
          setTimeout(() => {
            settings.player.invincible = false
            settings.player.el.querySelector('.sprite').classList.remove('invincible')
          }, 5000)
          settings.player.itemScore++
        }
      }
    })
  }

  function blastNpc() {
    settings.npcs.forEach(npc => {
      if (npc.status === 'alive') {
        npc.status = 'dead'
        npc.el.querySelector('.sprite').classList.add('dogblob-dead')
        setTimeout(() => {
          npc.el.remove()
          settings.npcs = settings.npcs.filter(n => n.status !== 'dead')
        }, 500)
      }
    })
  }

  function updateLife({ damage }) {
    if (damage) {
      settings.player.life--
    } else {
      settings.player.life++
      if (settings.player.life > 4) settings.player.life = 4
    }

    elements.lifeMarkers.forEach((marker, index) => {
      if (index < settings.player.life) {
        marker.classList.remove('d-none')
      } else {
        marker.classList.add('d-none')
      }
    })

    if (settings.player.life <= 0) {
      gameOver()
    }
  }

  function updateMouseBlobCounter() {
    elements.mouseBlobCounter.innerHTML = settings.player.mouseBlobCaught.no
    if (settings.player.mouseBlobCaught.no >= settings.player.mouseBlobCaught.max) {
      gameWon()
    }
  }

  function startTimer() {
    elements.timeIndicator.classList.remove('no')
    let timeLeft = settings.timeLimit
    elements.timeIndicator.innerHTML = timeLeft
    const timer = setInterval(() => {
      timeLeft--
      elements.timeIndicator.innerHTML = timeLeft
      if (timeLeft <= 0) {
        clearInterval(timer)
        gameOver()
      }
    }, 1000)
  }

  function gameOver() {
    settings.status = gameStatus.GAME_OVER
    elements.messageWindow.querySelector('.title').innerHTML = 'GAME OVER'
    elements.messageWindow.querySelector('.how-to-play').innerHTML = `
      <p>Mouseblobs caught: ${settings.player.mouseBlobCaught.no}</p>
      <p>Items collected: ${settings.player.itemScore}</p>
    `
    elements.messageWindow.querySelector('.start').innerHTML = 'Restart'
    elements.overlay.classList.remove('d-none')
    settings.player.el.classList.add('d-none')
    settings.npcs.forEach(npc => npc.el.remove())
    settings.items.forEach(item => item.el.remove())
  }

  function gameWon() {
    settings.status = gameStatus.GAME_WON
    elements.messageWindow.querySelector('.title').innerHTML = 'YOU WIN!'
    elements.messageWindow.querySelector('.how-to-play').innerHTML = `
      <p>Mouseblobs caught: ${settings.player.mouseBlobCaught.no}</p>
      <p>Items collected: ${settings.player.itemScore}</p>
    `
    elements.messageWindow.querySelector('.start').innerHTML = 'Play Again'
    elements.overlay.classList.remove('d-none')
    settings.player.el.classList.add('d-none')
    settings.npcs.forEach(npc => npc.el.remove())
    settings.items.forEach(item => item.el.remove())
  }


  function moveCursor(e) {
    if (settings.status === gameStatus.PLAYING) {
      elements.cursor.classList.remove('d-none')
      const x = e.clientX
      const y = e.clientY
      elements.cursor.style.left = x + 'px'
      elements.cursor.style.top = y + 'px'
      settings.cursor.x = Math.floor((x - settings.map.wrapperEl.getBoundingClientRect().left) / settings.map.unit)
      settings.cursor.y = Math.floor((y - settings.map.wrapperEl.getBoundingClientRect().top) / settings.map.unit)
    }
  }

  function placeBlock(e) {
    if (settings.status === gameStatus.PLAYING) {
      const blockX = settings.cursor.x
      const blockY = settings.cursor.y

      // Prevent placing blocks on player or NPCs
      if ((blockX === settings.player.x && blockY === settings.player.y) ||
          settings.npcs.some(npc => npc.x === blockX && npc.y === blockY)) {
        return // Cannot place block here
      }

      const existingBlockIndex = settings.map.blocks.findIndex(block => block.x === blockX && block.y === blockY)
      if (existingBlockIndex !== -1) {
        // Block exists, remove it
        settings.map.blocks.splice(existingBlockIndex, 1)
        settings.map.data[blockY][blockX] = 0 // Update map data
      } else {
        // Block does not exist, add it
        const newBlock = { x: blockX, y: blockY }
        settings.map.blocks.push(newBlock)
        settings.map.data[blockY][blockX] = 1 // Update map data
      }
      drawMap()
    }
  }


  // Controls for mobile
  elements.controlUp.classList.add('control-key', 'up')
  elements.controlDown.classList.add('control-key', 'down')
  elements.controlLeft.classList.add('control-key', 'left')
  elements.controlRight.classList.add('control-key', 'right')

  elements.control.appendChild(elements.controlUp)
  elements.control.appendChild(elements.controlDown)
  elements.control.appendChild(elements.controlLeft)
  elements.control.appendChild(elements.controlRight)


  elements.controlUp.addEventListener('touchstart', (e) => {
    e.preventDefault()
    playerMove('up')
  })
  elements.controlUp.addEventListener('touchend', (e) => {
    e.preventDefault()
    playerStop()
  })
  elements.controlDown.addEventListener('touchstart', (e) => {
    e.preventDefault()
    playerMove('down')
  })
  elements.controlDown.addEventListener('touchend', (e) => {
    e.preventDefault()
    playerStop()
  })
  elements.controlLeft.addEventListener('touchstart', (e) => {
    e.preventDefault()
    playerMove('left')
  })
  elements.controlLeft.addEventListener('touchend', (e) => {
    e.preventDefault()
    playerStop()
  })
  elements.controlRight.addEventListener('touchstart', (e) => {
    e.preventDefault()
    playerMove('right')
  })
  elements.controlRight.addEventListener('touchend', (e) => {
    e.preventDefault()
    playerStop()
  })

  function playerMove(direction) {
    if (settings.status === gameStatus.PLAYING) {
      settings.player.walkingDirection = direction
      clearInterval(settings.player.walkingInterval) // Clear any existing interval
      settings.player.walkingInterval = setInterval(updatePlayerPosition, 1000/settings.FPS)
      updatePlayerPosition() // Initial move immediately
    }
  }

  function playerStop() {
    clearInterval(settings.player.walkingInterval)
    settings.player.walkingDirection = null
  }

  // Event Listeners
  elements.startButton.addEventListener('click', () => {
    if (settings.status === gameStatus.WAITING_FOR_START || settings.gameOver || settings.gameWon) {
      settings.gameOver = false
      settings.gameWon = false
      elements.messageWindow.querySelector('.how-to-play').innerHTML = `
        <p>Catch all mouseblobs within the time limit, while avoiding dogblobs.</p>
        <p>Move around with the arrow keys or the onscreen control UI.</p>
        <p>Create/destroy pink blocks by clicking or touching map.</p>
      `
      elements.messageWindow.querySelector('.title').innerHTML = 'catblob 2'
      elements.messageWindow.querySelector('.start').innerHTML = 'start'
      start()
    }
  })

  window.addEventListener('focus', ()=> settings.isWindowActive = true)
  window.addEventListener('blur', ()=> settings.isWindowActive = false)
  
  window.addEventListener('resize', adjustMapWidthAndHeight)
  window.addEventListener('mousemove', moveCursor )
  settings.map.el.addEventListener('click', placeBlock)
  window.addEventListener('keyup', (e) => {
    // FIX: Changed 'player' to 'settings.player'
    if (e.key === 'ArrowUp' && settings.player.walkingDirection === 'up' ||
        e.key === 'ArrowDown' && settings.player.walkingDirection === 'down' ||
        e.key === 'ArrowLeft' && settings.player.walkingDirection === 'left' ||
        e.key === 'ArrowRight' && settings.player.walkingDirection === 'right') {
        settings.player.walkingDirection = null; // Corrected line
        clearInterval(settings.player.walkingInterval); // Corrected line
    }
  })
  window.addEventListener('keydown', (e) => {
    if (settings.status === gameStatus.PLAYING) {
      let direction = null
      if (e.key === 'ArrowUp') direction = 'up'
      else if (e.key === 'ArrowDown') direction = 'down'
      else if (e.key === 'ArrowLeft') direction = 'left'
      else if (e.key === 'ArrowRight') direction = 'right'

      if (direction && settings.player.walkingDirection !== direction) {
        playerMove(direction)
      }
    }
  })
  
  // Initial setup for demo mode
  if (settings.demoMode) {
    settings.status = gameStatus.DEMO;
    // Potentially add logic here for demo mode visuals or reduced functionality
  } else {
    elements.howToPlay.remove() // Remove instructions if not in demo mode
  }
  
  adjustMapWidthAndHeight() // Call once on load
  setupMap() // Draw initial map

}

init() // Initialize the game
