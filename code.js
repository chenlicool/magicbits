// ============================================================
// MagicBits — ScatterBoard
// 生成模式：选中源组件 → 一键散布
// 重排模式：选中 ScatterBoard → 调参 → 原地重排
// ============================================================

// --------------- 随机 ---------------

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

// --------------- i18n ---------------

var pluginLang = 'en';

var MSG = {
  zh: {
    selectSource: '⚠️ 请先选中源组件',
    generated: function(count) { return '✅ 已生成 ' + count + ' 个实例'; },
    selectBoard: '⚠️ 请先选中一个 ScatterBoard 画板',
    emptyBoard: '⚠️ 画板内没有元素',
    rerolled: function(count) { return '🎲 已重排 ' + count + ' 个元素（缩放未变）'; },
  },
  en: {
    selectSource: '⚠️ Select at least one source layer first',
    generated: function(count) { return '✅ Generated ' + count + ' instance' + (count === 1 ? '' : 's'); },
    selectBoard: '⚠️ Select a ScatterBoard frame first',
    emptyBoard: '⚠️ This board has no items to reroll',
    rerolled: function(count) { return '🎲 Rerolled ' + count + ' item' + (count === 1 ? '' : 's') + ' without changing scale'; },
  },
};

function setLang(lang) {
  pluginLang = lang === 'zh' ? 'zh' : 'en';
}

function t(key) {
  var msg = MSG[pluginLang][key] || MSG.en[key] || key;
  if (typeof msg === 'function') {
    return msg.apply(null, Array.prototype.slice.call(arguments, 1));
  }
  return msg;
}

// --------------- 包围盒 ---------------

function getNodeBounds(node) {
  if ('width' in node && 'height' in node) {
    return { w: node.width, h: node.height };
  }
  if ('absoluteBoundingBox' in node && node.absoluteBoundingBox) {
    return { w: node.absoluteBoundingBox.width, h: node.absoluteBoundingBox.height };
  }
  return { w: 100, h: 100 };
}

// --------------- 配置存取 ---------------

var CONFIG_KEY = 'scatterboard-config';

function saveConfig(frame, config) {
  frame.setPluginData(CONFIG_KEY, JSON.stringify(config));
  frame.setRelaunchData({
    'reroll-random': '随机重排这个 ScatterBoard',
    'reroll-grid': '网格重排这个 ScatterBoard',
  });
}

function loadConfig(frame) {
  var raw = frame.getPluginData(CONFIG_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

// --------------- ScatterBoard 检测 ---------------

function findScatterBoard() {
  var sel = figma.currentPage.selection;
  for (var i = 0; i < sel.length; i++) {
    if (sel[i].type === 'FRAME' && loadConfig(sel[i])) {
      return sel[i];
    }
  }
  return null;
}

// --------------- 源节点 ---------------

function getSourceNodes() {
  var sources = [];
  var sel = figma.currentPage.selection;
  for (var i = 0; i < sel.length; i++) {
    var n = sel[i];
    if (n.type === 'COMPONENT') {
      sources.push({ node: n, isComponent: true });
    } else if (
      n.type === 'FRAME' || n.type === 'GROUP' || n.type === 'INSTANCE' ||
      n.type === 'RECTANGLE' || n.type === 'ELLIPSE' || n.type === 'POLYGON' ||
      n.type === 'STAR' || n.type === 'TEXT' || n.type === 'VECTOR' ||
      n.type === 'BOOLEAN_OPERATION' || n.type === 'LINE'
    ) {
      sources.push({ node: n, isComponent: false });
    }
  }
  return sources;
}

// --------------- 创建副本 ---------------

function createCopy(source) {
  if (source.isComponent) return source.node.createInstance();
  return source.node.clone();
}

// --------------- 碰撞检测 ---------------

function pushApart(nodes, gap, maxIter) {
  maxIter = maxIter || 50;
  for (var iter = 0; iter < maxIter; iter++) {
    var moved = false;
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j];
        var aB = getNodeBounds(a), bB = getNodeBounds(b);
        var ax1 = a.x, ay1 = a.y, ax2 = a.x + aB.w, ay2 = a.y + aB.h;
        var bx1 = b.x, by1 = b.y, bx2 = b.x + bB.w, by2 = b.y + bB.h;
        var ox = Math.min(ax2 - bx1, bx2 - ax1);
        var oy = Math.min(ay2 - by1, by2 - ay1);
        if (ox > -gap && oy > -gap) {
          var px = (ox + gap) / 2, py = (oy + gap) / 2;
          var cxA = ax1 + aB.w/2, cyA = ay1 + aB.h/2;
          var cxB = bx1 + bB.w/2, cyB = by1 + bB.h/2;
          var dx = cxA - cxB, dy = cyA - cyB;
          var d = Math.sqrt(dx*dx + dy*dy) || 1;
          a.x += (dx/d)*px*0.5; a.y += (dy/d)*py*0.5;
          b.x -= (dx/d)*px*0.5; b.y -= (dy/d)*py*0.5;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }
}

// --------------- 布局 ---------------

// 将元素 clamp 在画布边界内
function clampInBounds(node, cfg) {
  var b = getNodeBounds(node);
  if (node.x < 0) node.x = 0;
  if (node.y < 0) node.y = 0;
  if (node.x + b.w > cfg.canvasWidth) node.x = cfg.canvasWidth - b.w;
  if (node.y + b.h > cfg.canvasHeight) node.y = cfg.canvasHeight - b.h;
  // 确保不出现负位置
  if (node.x < 0) node.x = 0;
  if (node.y < 0) node.y = 0;
}

function layoutRandom(nodes, cfg, doRescale) {
  var cx = cfg.canvasWidth / 2, cy = cfg.canvasHeight / 2;
  var maxR = Math.min(cfg.canvasWidth, cfg.canvasHeight) / 2 * 0.8;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var angle = randomRange(0, Math.PI*2);
    var r = maxR * Math.sqrt(Math.random());
    n.x = cx + r * Math.cos(angle);
    n.y = cy + r * Math.sin(angle);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
    if (doRescale) {
      try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    }
    clampInBounds(n, cfg);
  }
}

function layoutGrid(nodes, cfg, doRescale) {
  var total = nodes.length;
  var cols = cfg.gridColumns > 0 ? cfg.gridColumns
    : Math.max(1, Math.ceil(Math.sqrt(total * (cfg.canvasWidth/cfg.canvasHeight))));
  var rows = Math.ceil(total/cols);
  var cW = cfg.canvasWidth/cols, cH = cfg.canvasHeight/rows;
  var ox = (cfg.canvasWidth - cols*cW)/2 + cW/2;
  var oy = (cfg.canvasHeight - rows*cH)/2 + cH/2;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var col = i%cols, row = Math.floor(i/cols);
    n.x = ox + col*cW + randomRange(-cfg.jitterX, cfg.jitterX);
    n.y = oy + row*cH + randomRange(-cfg.jitterY, cfg.jitterY);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
    if (doRescale) {
      try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    }
    clampInBounds(n, cfg);
  }
}

// 黄金螺旋 (Golden Ratio Spiral, 137.5°)
function layoutSpiral(nodes, cfg, doRescale) {
  var cx = cfg.canvasWidth / 2, cy = cfg.canvasHeight / 2;
  var goldenAngle = Math.PI * (3 - Math.sqrt(5));  // ~137.5°
  var spacing = Math.min(cfg.canvasWidth, cfg.canvasHeight) / (Math.sqrt(nodes.length) * 3.5);
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var angle = i * goldenAngle;
    var r = spacing * Math.sqrt(i + 0.5);
    n.x = cx + r * Math.cos(angle);
    n.y = cy + r * Math.sin(angle);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
    if (doRescale) {
      try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    }
    clampInBounds(n, cfg);
  }
}

// 同心圆环
function layoutCircle(nodes, cfg, doRescale) {
  var cx = cfg.canvasWidth / 2, cy = cfg.canvasHeight / 2;
  var maxR = Math.min(cfg.canvasWidth, cfg.canvasHeight) / 2 * 0.85;
  // 每圈放多少元素（第一圈少，往外递增）
  var itemsPerRing = Math.max(4, Math.ceil(Math.sqrt(nodes.length) * 1.5));
  var ringCount = Math.ceil(nodes.length / itemsPerRing);
  var ringSpacing = maxR / ringCount;

  var idx = 0;
  for (var ring = 0; ring < ringCount; ring++) {
    var countInRing = Math.min(itemsPerRing, nodes.length - idx);
    var r = ringSpacing * (ring + 0.7);  // 从内圈开始
    for (var j = 0; j < countInRing; j++) {
      var n = nodes[idx];
      // 每个环的起始角度随机偏移，避免对齐
      var angleOffset = randomRange(0, Math.PI * 2 / countInRing);
      var angle = angleOffset + (j / countInRing) * Math.PI * 2;
      n.x = cx + r * Math.cos(angle);
      n.y = cy + r * Math.sin(angle);
      n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
      if (doRescale) {
        try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
      }
      clampInBounds(n, cfg);
      idx++;
    }
  }
}

// 瀑布流 (Masonry / Pinterest)
function layoutMasonry(nodes, cfg, doRescale) {
  var cols = cfg.gridColumns > 0 ? cfg.gridColumns
    : Math.max(2, Math.ceil(Math.sqrt(nodes.length * 0.7)));
  var padding = 20;
  var colW = (cfg.canvasWidth - padding * (cols + 1)) / cols;

  // 每列的当前高度
  var colHeights = [];
  for (var c = 0; c < cols; c++) colHeights.push(padding);

  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    // 找最短的列
    var minCol = 0;
    for (var c = 1; c < cols; c++) {
      if (colHeights[c] < colHeights[minCol]) minCol = c;
    }

    var b = getNodeBounds(n);
    var itemH = doRescale ? b.h * randomRange(0.6, 1.4) : b.h;
    if (doRescale) {
      var s = randomRange(cfg.scaleMin/100, cfg.scaleMax/100);
      try { n.rescale(s); } catch(e){}
      b = getNodeBounds(n);
      itemH = b.h;
    }

    n.x = padding + minCol * (colW + padding) + (colW - b.w) / 2;
    n.y = colHeights[minCol] + randomRange(-5, 5);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);

    colHeights[minCol] += itemH + padding + randomRange(0, 10);
    clampInBounds(n, cfg);
  }
}

// 六角网格 (Honeycomb)
function layoutHexGrid(nodes, cfg, doRescale) {
  var hexW = Math.min(cfg.canvasWidth, cfg.canvasHeight) / Math.max(3, Math.sqrt(nodes.length) * 0.7);
  var hexH = hexW * 0.866;
  var cols = Math.max(1, Math.floor(cfg.canvasWidth / (hexW * 0.75)));
  var ox = (cfg.canvasWidth - cols * hexW * 0.75) / 2;
  var oy = (cfg.canvasHeight - Math.ceil(nodes.length / cols) * hexH) / 2;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var col = i % cols, row = Math.floor(i / cols);
    var xOff = ox + col * hexW * 0.75;
    var yOff = oy + row * hexH;
    if (row % 2 === 1) xOff += hexW * 0.375;
    n.x = xOff + randomRange(-hexW*0.1, hexW*0.1);
    n.y = yOff + randomRange(-hexH*0.1, hexH*0.1);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
    if (doRescale) try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    clampInBounds(n, cfg);
  }
}

// 爆炸式 - 从中心辐射
function layoutStarburst(nodes, cfg, doRescale) {
  var cx = cfg.canvasWidth/2, cy = cfg.canvasHeight/2;
  var maxR = Math.min(cfg.canvasWidth, cfg.canvasHeight)/2*0.9;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var progress = i/nodes.length;
    var r = maxR*(0.1+progress*0.9)*(0.8+Math.random()*0.4);
    var angle = progress*Math.PI*4+randomRange(-0.8,0.8);
    n.x = cx+r*Math.cos(angle); n.y = cy+r*Math.sin(angle);
    n.rotation = randomRange(-cfg.rotationMax*1.5, cfg.rotationMax*1.5);
    if (doRescale) try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    clampInBounds(n, cfg);
  }
}

// 有机分布 - 正弦波噪声
function layoutOrganic(nodes, cfg, doRescale) {
  var cols = Math.max(2, Math.ceil(Math.sqrt(nodes.length*1.5)));
  var cW = cfg.canvasWidth/cols, cH = cfg.canvasHeight/Math.ceil(nodes.length/cols);
  var fX = randomRange(0.01,0.03), fY = randomRange(0.01,0.03);
  var aX = cW*0.4, aY = cH*0.4;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var col = i%cols, row = Math.floor(i/cols);
    var bx = cW*col+cW/2, by = cH*row+cH/2;
    n.x = bx+Math.sin(by*fX+i*0.7)*aX+randomRange(-20,20);
    n.y = by+Math.cos(bx*fY+i*0.7)*aY+randomRange(-20,20);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
    if (doRescale) try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    clampInBounds(n, cfg);
  }
}

// 引力簇 - 多吸引点
function layoutClusters(nodes, cfg, doRescale) {
  var cx = cfg.canvasWidth/2, cy = cfg.canvasHeight/2;
  var cc = Math.max(2, Math.ceil(Math.sqrt(nodes.length)/2));
  var atts = [];
  for (var a = 0; a < cc; a++) {
    var ar = Math.min(cfg.canvasWidth, cfg.canvasHeight)/2*0.6;
    var aa = (a/cc)*Math.PI*2+randomRange(-0.3,0.3);
    atts.push({x:cx+ar*Math.cos(aa)*(0.6+Math.random()*0.4), y:cy+ar*Math.sin(aa)*(0.6+Math.random()*0.4)});
  }
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i], att = atts[i%cc];
    var spread = Math.min(cfg.canvasWidth, cfg.canvasHeight)/(cc*2.5);
    n.x = att.x+randomRange(-spread,spread);
    n.y = att.y+randomRange(-spread,spread);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
    if (doRescale) try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    clampInBounds(n, cfg);
  }
}

// 蛇形走位
function layoutZigzag(nodes, cfg, doRescale) {
  var cols = Math.max(2, Math.ceil(Math.sqrt(nodes.length)));
  var cW = cfg.canvasWidth/cols, cH = cfg.canvasHeight/Math.ceil(nodes.length/cols);
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var row = Math.floor(i/cols), col = i%cols;
    if (row%2===1) col = cols-1-col;
    n.x = cW*col+cW/2+randomRange(-cW*0.15, cW*0.15);
    n.y = cH*row+cH/2+randomRange(-cH*0.15, cH*0.15);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax);
    if (doRescale) try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    clampInBounds(n, cfg);
  }
}

// 漩涡 - 渐开螺旋
function layoutVortex(nodes, cfg, doRescale) {
  var cx = cfg.canvasWidth/2, cy = cfg.canvasHeight/2;
  var maxR = Math.min(cfg.canvasWidth, cfg.canvasHeight)/2*0.85;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i], p = i/nodes.length;
    var r = maxR*(0.05+p*0.95);
    var angle = p*Math.PI*2*(3+p*5);
    n.x = cx+r*Math.cos(angle); n.y = cy+r*Math.sin(angle);
    n.rotation = randomRange(-cfg.rotationMax, cfg.rotationMax)+angle*(180/Math.PI)*0.1;
    if (doRescale) try { n.rescale(randomRange(cfg.scaleMin/100, cfg.scaleMax/100)); } catch(e){}
    clampInBounds(n, cfg);
  }
}

function applyLayout(nodes, cfg, frame, doRescale) {
  if (cfg.layoutMode === 'grid') {
    layoutGrid(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'spiral') {
    layoutSpiral(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'circle') {
    layoutCircle(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'masonry') {
    layoutMasonry(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'hexgrid') {
    layoutHexGrid(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'starburst') {
    layoutStarburst(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'organic') {
    layoutOrganic(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'clusters') {
    layoutClusters(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'zigzag') {
    layoutZigzag(nodes, cfg, doRescale);
  } else if (cfg.layoutMode === 'vortex') {
    layoutVortex(nodes, cfg, doRescale);
  } else {
    layoutRandom(nodes, cfg, doRescale);
  }
  if (cfg.avoidOverlap) {
    pushApart(nodes, cfg.overlapGap||20);
    // 碰撞检测后重新 clamp
    for (var ci = 0; ci < nodes.length; ci++) {
      clampInBounds(nodes[ci], cfg);
    }
  }
  if (cfg.randomZDepth) {
    for (var zi = nodes.length-1; zi > 0; zi--) {
      var j = Math.floor(Math.random()*(zi+1));
      var t = nodes[zi]; nodes[zi] = nodes[j]; nodes[j] = t;
    }
    for (var ai = 0; ai < nodes.length; ai++) frame.appendChild(nodes[ai]);
  }
}

// --------------- 生成 ---------------

function generate(cfg) {
  setLang(cfg.lang);
  var sources = getSourceNodes();
  if (sources.length === 0) {
    figma.notify(t('selectSource'), { error: true });
    return;
  }

  var nodes = [];
  for (var si = 0; si < sources.length; si++) {
    for (var ci = 0; ci < cfg.copiesPerSource; ci++) {
      var cp = createCopy(sources[si]);
      cp.name = sources[si].node.name + ' #' + (ci+1);
      nodes.push(cp);
    }
  }

  var frame = figma.createFrame();
  frame.name = 'ScatterBoard';
  frame.resize(cfg.canvasWidth, cfg.canvasHeight);
  frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  // 放在选中项下方
  var bb = null;
  for (var bi = 0; bi < sources.length; bi++) {
    var b = sources[bi].node;
    if ('absoluteBoundingBox' in b && b.absoluteBoundingBox) {
      var ab = b.absoluteBoundingBox;
      if (!bb) bb = { x: ab.x, y: ab.y, x2: ab.x+ab.width, y2: ab.y+ab.height };
      else {
        bb.x = Math.min(bb.x, ab.x); bb.y = Math.min(bb.y, ab.y);
        bb.x2 = Math.max(bb.x2, ab.x+ab.width); bb.y2 = Math.max(bb.y2, ab.y+ab.height);
      }
    }
  }
  frame.x = bb ? bb.x : figma.viewport.center.x - cfg.canvasWidth/2;
  frame.y = bb ? bb.y2 + 200 : figma.viewport.center.y - cfg.canvasHeight/2;
  figma.currentPage.appendChild(frame);

  var lc = {
    copiesPerSource: cfg.copiesPerSource,
    scaleMin: cfg.scaleMin, scaleMax: cfg.scaleMax,
    rotationMax: cfg.rotationMax, layoutMode: cfg.layoutMode,
    canvasWidth: frame.width, canvasHeight: frame.height,
    gridColumns: cfg.gridColumns||0, jitterX: cfg.jitterX||0, jitterY: cfg.jitterY||0,
    avoidOverlap: cfg.avoidOverlap, overlapGap: cfg.overlapGap||20,
    randomZDepth: cfg.randomZDepth,
    lang: pluginLang,
  };

  applyLayout(nodes, lc, frame, true);  // true = 允许缩放

  for (var ai = 0; ai < nodes.length; ai++) frame.appendChild(nodes[ai]);
  saveConfig(frame, lc);
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.notify(t('generated', nodes.length));
}

// --------------- 重排 ---------------

function reroll(cfg) {
  setLang(cfg.lang);
  var frame = findScatterBoard();
  if (!frame) {
    figma.notify(t('selectBoard'), { error: true });
    return;
  }

  var children = frame.children.slice();
  if (children.length === 0) {
    figma.notify(t('emptyBoard'), { error: true });
    return;
  }

  var lc = {
    copiesPerSource: cfg.copiesPerSource,
    scaleMin: cfg.scaleMin, scaleMax: cfg.scaleMax,
    rotationMax: cfg.rotationMax, layoutMode: cfg.layoutMode,
    canvasWidth: frame.width, canvasHeight: frame.height,
    gridColumns: cfg.gridColumns||0, jitterX: cfg.jitterX||0, jitterY: cfg.jitterY||0,
    avoidOverlap: cfg.avoidOverlap, overlapGap: cfg.overlapGap||20,
    randomZDepth: cfg.randomZDepth,
    lang: pluginLang,
  };

  applyLayout(children, lc, frame, false);  // false = 不缩放，保持现有大小

  saveConfig(frame, lc);
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.notify(t('rerolled', children.length));
}

// ============================================================
// 插件入口
// ============================================================

function sendState() {
  var board = findScatterBoard();
  figma.ui.postMessage({
    type: 'state',
    sourceCount: getSourceNodes().length,
    hasBoard: !!board,
    boardName: board ? board.name : '',
  });
}

function runRelaunchCommand(command) {
  var frame = findScatterBoard();
  var saved = frame ? loadConfig(frame) : null;
  if (!saved) {
    figma.notify(t('selectBoard'), { error: true });
    figma.closePlugin();
    return;
  }

  setLang(saved.lang);
  saved.layoutMode = command === 'reroll-grid' ? 'grid' : 'random';
  reroll(saved);
  figma.closePlugin();
}

if (figma.command === 'reroll-random' || figma.command === 'reroll-grid') {
  runRelaunchCommand(figma.command);
} else {
  figma.showUI(__html__, {
    width: 400,
    height: 620,
    title: 'MagicBits — ScatterBoard',
  });

  figma.on('selectionchange', sendState);

  figma.ui.onmessage = function (msg) {
    if (msg.type === 'ready') {
      setLang(msg.lang);
      sendState();
    } else if (msg.type === 'generate') {
      generate(msg.config);
      sendState();
    } else if (msg.type === 'reroll') {
      reroll(msg.config);
      sendState();
    } else if (msg.type === 'close') {
      figma.closePlugin();
    }
  };
}
