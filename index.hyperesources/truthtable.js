var DOCUMENT_NAME = 'index';

var motion_answer = [
  [
    "That's correct! No one is at the door, so the light is not needed.",
    "The correct answer is 0. No one is at the door, so the light is not needed.",
    0
  ],
  [
    "That's correct! It is daytime and no one is at the door, so the light is not needed.",
    "The correct answer is 0. It is daytime and no one is at the door, so the light is not needed.",
    0
  ],
  [
    "The correct answer is 1. The person detected by the motion sensor needs the light on to see at night.",
    "That's correct! The person detected by the motion sensor needs the light on to see at night.",
    1
  ],
  [
    "That's correct! The person detected by the motion sensor does not need the light on to see in the day.",
    "The correct answer is 0. The person detected by the motion sensor does not need the light on to see in the day.",
    0
  ]
];

var switch_answer = [
  [
    "That's correct! The light switch is off and no one is at the door, so the light is not needed.",
    "The correct answer is 0. The light switch is off and no one is at the door, so the light is not needed.",
    0
  ],
  [
    "The correct answer is 1. The light switch is on, so the light must also be on.",
    "That's correct! The light switch is on, so the light must also be on.",
    1
  ],
  [
    "That's correct! The light switch is off, it is daytime and no one is at the door, so the light is not needed.",
    "The correct answer is 0. The light switch is off, it is daytime and no one is at the door, so the light is not needed.",
    0
  ],
  [
    "The correct answer is 1. The light switch is on, so the light must also be on.",
    "That's correct! The light switch is on, so the light must also be on.",
    1
  ],
    [
    "The correct answer is 1. The light switch is off but the person detected by the motion sensor needs the light on to see at night.",
    "That's correct! The light switch is off but the person detected by the motion sensor needs the light on to see at night.",
    1
  ],
  [
    "The correct answer is 1. The light switch is on, so the light must also be on.",
    "That's correct! The light switch is on, so the light must also be on.",
    1
  ],
  [
    "That's correct! The light switch is off and the person detected by the motion sensor does not need the light on to see in the day.",
    "The correct answer is 0. The light switch is off and the person detected by the motion sensor does not need the light on to see in the day.",
    0
  ],
  [
    "The correct answer is 1. The light switch is on, so the light must also be on.",
    "That's correct! The light switch is on, so the light must also be on.",
    1
  ]
];

var rain_answer = [
  [
    "That's correct! The owner is away, so the windows should be closed.",
    "The correct answer is 0. The owner is away, so the windows should be closed.",
    0
  ],
  [
    "The correct answer is 1. It is not raining and the owner is at home, so the windows should be open.",
    "That's correct! It is not raining and the owner is at home, so the windows should be open.",
    1
  ],
  [
    "That's correct! The owner is away and it is raining, so the windows should be closed.",
    "The correct answer is 0. The owner is away and it is raining, so the windows should be closed.",
    0
  ],
  [
    "That's correct! It is raining, so the windows should be closed.",
    "The correct answer is 0. It is raining, so the windows should be closed.",
    0
  ]
];

function updateScene(index, hypeDocument, prefix, nightPredicate) {
  var output = hypeDocument.getElementById(prefix + '-select' + index).getElementsByTagName('select').item(0).selectedIndex;

  var light = hypeDocument.getElementById(prefix + '-light');
  var label = hypeDocument.getElementById(prefix + '-label');
  var nightDark = hypeDocument.getElementById(prefix + '-night-dark');
  var nightLight = hypeDocument.getElementById(prefix + '-night-light');

  hypeDocument.setElementProperty(light, 'opacity', output);
  hypeDocument.setElementProperty(label, 'opacity', output);
  if (nightPredicate(index)) {
    hypeDocument.setElementProperty(nightDark, 'opacity', 1 - output);
    hypeDocument.setElementProperty(nightLight, 'opacity', output);
  }
}

function updateMotionNative(index) {
  var hypeDocument = HYPE.documents[DOCUMENT_NAME];
  var nightPredicate = function(index) { return index % 2 == 0; };
  updateScene(index, hypeDocument, 'motion', nightPredicate);
}

function updateSwitchNative(index) {
  var hypeDocument = HYPE.documents[DOCUMENT_NAME];
  var nightPredicate = function(index) { return Math.floor(index / 2) % 2 == 0; };
  updateScene(index, hypeDocument, 'switch', nightPredicate);
}

function updateRainNative(index) {
  var hypeDocument = HYPE.documents[DOCUMENT_NAME];
  var output = hypeDocument.getElementById('rain-select' + index).getElementsByTagName('select').item(0).selectedIndex;

  var openWindow = hypeDocument.getElementById('rain-open');
  var closeWindow = hypeDocument.getElementById('rain-close');
  var label = hypeDocument.getElementById('rain-label');

  hypeDocument.setElementProperty(openWindow, 'opacity', output);
  hypeDocument.setElementProperty(closeWindow, 'opacity', 1 - output);
  hypeDocument.setElementProperty(label, 'opacity', output);
}
